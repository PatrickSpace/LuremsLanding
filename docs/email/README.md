# Confirmaciones de registro anticipado · Lurems

4 de noviembre de 2026. Correos nuevos de la **lista de acceso temprano de la landing**. No se reutilizaron las plantillas de cuentas de la app ni se modificó aquel repositorio. El fundador autorizó crear las plantillas y conectar el envío automático, y eligió una cuenta Gmail como remitente. Todo sigue local, sin publicación ni envío real.

## Plantillas y vistas previas

| Variante | Vista previa | HTML | Texto |
| --- | --- | --- | --- |
| Paciente | [Abrir](./registro-anticipado-paciente.preview.html) | [HTML](./registro-anticipado-paciente.html) | [TXT](./registro-anticipado-paciente.txt) |
| Psicólogo | [Abrir](./registro-anticipado-psicologo.preview.html) | [HTML](./registro-anticipado-psicologo.html) | [TXT](./registro-anticipado-psicologo.txt) |

Asuntos y preencabezados en [metadata.json](./metadata.json). Los mensajes confirman el registro en la lista, explican que se avisará cuando la app esté lista y no piden verificar o entrar a una cuenta, no garantizan cupo ni afirman aprobación profesional. La variante profesional también corresponde a quien seleccionó interés en el proyecto desde ese segmento.

Fuente única de HTML, texto y metadatos: `functions/src/emails/early-access.js`. El worker usa el renderer directamente, escapando el nombre en HTML. Los archivos de esta carpeta se generan con:

```bash
node scripts/render-early-access-emails.mjs
```

Los HTML entregables usan `{{NOMBRE}}` solo para inspección/reutilización; el renderer real recibe el nombre validado del lead. Los TXT contienen solo el cuerpo: el asunto se envía por separado. Las vistas previas usan datos sintéticos y el logo local; el correo real usa la URL HTTPS del logo oficial existente en `lurems.lat`. Los enlaces van a la web pública, sin datos personales, tracking individual ni Analytics.

## Flujo automático implementado

1. `submitLead` confirma un registro válido mediante transacción. En el mismo commit crea `leadEmails/{leadId}` con estado `pending`. Un duplicado no crea lead ni trabajo de correo.
2. La nueva Function `sendEarlyAccessEmail` se activa al crear ese trabajo privado. Lee el lead, elige la variante paciente/psicólogo y verifica la conexión SMTP antes de enviar.
3. Gmail recibe HTML + texto, remitente visible «Lurems», la dirección Gmail configurada y `Reply-To` a esa cuenta. Se usa TLS a `smtp.gmail.com:465`, sin logs SMTP ni acceso a archivos/URLs desde Nodemailer.
4. El trabajo pasa a `sent` solo cuando SMTP confirma aceptación. Eso **no prueba entrega en la bandeja de entrada**. El registro del interesado no depende de la disponibilidad de Gmail; el frontend no anuncia «correo enviado».

Cada tipo obtiene su propia confirmación. No se crean trabajos para el histórico ni se hacen envíos retroactivos. La futura comunicación de apertura requiere que el fundador confirme disponibilidad; este flujo envía la confirmación inicial y no detecta automáticamente cuándo está lista la app.

## Configuración pendiente para activar Gmail

El remitente indicado quedó en `functions/.env.luremslanding`, ignorado por Git, como `EARLY_ACCESS_SMTP_USER`. No se puso la dirección personal en las plantillas ni se leyó `.env.local`. El ejemplo versionable es `functions/.env.example`.

Falta configurar el secreto **real** `EARLY_ACCESS_SMTP_PASSWORD` con una contraseña de aplicación de Google; no usar la contraseña habitual ni compartirla por chat. Google requiere verificación en dos pasos y puede restringir la disponibilidad de estas contraseñas según la cuenta. [Instrucciones oficiales de Google](https://support.google.com/accounts/answer/185833?hl=es).

El usuario puede introducirla mediante el prompt seguro del CLI, sin escribir su valor en el comando:

```bash
firebase functions:secrets:set EARLY_ACCESS_SMTP_PASSWORD --project luremslanding
```

**Ese comando no se ejecutó.** Crear el secreto y publicar son operaciones externas pendientes; se conserva la instrucción de no publicar. La Function del correo declara el secreto, y la callable de registro no lo necesita. Antes de activar, comprobar la cuenta autorizada, secreto, URL pública del logo y recepción con datos de prueba expresamente autorizados. El despliegue futuro debe incluir ambas Functions de la landing y respetar el cierre previo de escrituras directas descrito en [el flujo de registro](../ACCESO_TEMPRANO_FUNCTIONS.md). Los límites, filtros y cuotas de Gmail siguen aplicando; no se han probado recepción real ni reputación.

## Fallos, reintentos y duplicados

El worker usa una reserva transaccional de 120 segundos y un identificador de intento. Invocaciones concurrentes no comparten el permiso de enviar. Una preparación vencida se puede recuperar, y el worker anterior debe volver a comprobar su permiso antes de SMTP.

- Fallo de conexión durante la verificación previa: reintento seguro, porque todavía no se inició el envío.
- Configuración ausente o autenticación rechazada: `failed`, sin enviar.
- Respuesta SMTP negativa 4xx: reintento, hasta cinco intentos. Un rechazo 5xx queda `failed`.
- Timeout/desconexión después de iniciar el envío, o proceso interrumpido en `sending`: `needs_review`, sin reenviar automáticamente.
- SMTP acepta pero falla el guardado final: un replay tampoco vuelve a enviar a ciegas.

SMTP no ofrece una garantía general de «exactamente una vez» ante una confirmación perdida. El `Message-ID` estable ayuda a identificar el mensaje, pero no sustituye esa garantía. Se prioriza evitar un reenvío automático cuando el resultado es incierto. Los trabajos `failed`/`needs_review` quedan para revisión administrativa, sin borrar al interesado. No se debe recrear el trabajo ni resetear un estado incierto sin comprobar el resultado. `pending` por sí solo no dispara de nuevo un trigger de creación: una recuperación manual debe invocar el worker explícitamente y respetar sus controles.

No se guardan mensajes de error SMTP, payloads ni secretos en logs. Se conserva solo un código de diagnóstico; las reglas existentes bloquean todo acceso de cliente a `leadEmails`.

## Verificación realizada

- `npm test`: ocho pruebas aprobadas, incluyendo contenido por tipo, escape de HTML y coincidencia entre renderer y entregables.
- `npm run test:integration`: veinte pruebas aprobadas contra el proyecto efímero `demo-luremslanding`: las nueve de registro, el disparo de confirmación por tipo y ausencia de correos retroactivos, concurrencia/replay, preflight, credenciales, rechazos SMTP, resultado incierto, interrupciones, exclusión del worker antiguo y pérdida del commit final. Dos pruebas del adaptador verifican TLS, remitente, envelope y configuración sin conectar a Gmail.
- En el emulador, `sendEarlyAccessEmail` **siempre captura en `emailTestDeliveries`** y nunca abre SMTP. Rechaza usar esa captura fuera del proyecto demo. `functions/.secret.local` contiene exclusivamente un valor sintético para que el emulador no consulte secretos remotos; el archivo está ignorado por Git.
- El runner de `test:integration` crea configuración y secreto sintéticos si faltan, con creación exclusiva: no lee ni sobrescribe archivos locales existentes. Siempre fuerza el proyecto demo.
- `scripts/check-early-access-emails.js`: dieciséis casos aprobados en Chromium 156, variantes paciente/psicólogo a 375/390/1280/1440 px, con y sin imágenes/fuentes externas. Navegación por teclado, enlace, mensaje esencial y ausencia de desbordamiento comprobados. Capturas inspeccionadas en `output/playwright/email-*.png`; salida en `early-access-email-browser.txt`.
- `npm run build` aprobado. No se modificó la interfaz de la landing en esta tarea; se conservaron los cambios concurrentes de storytelling y componentes.

Se contrastaron las pestañas **03 — Variables** y **12 — Components** del Brand System oficial y la guía local. Logo oficial intacto, verde paciente/morado profesional, texto oscuro, superficies claras, radios 12/20 px y escala de espaciado. Poppins con fallback Arial/Helvetica; solo las vistas previas cargan Poppins externa. Se revisó también el fallback sin imágenes/fuentes y se ajustó el color del texto alternativo del logo. Tablas de presentación, estilos esenciales inline y botón VML para Outlook; sin imágenes nuevas ni JavaScript en el correo.

Pendientes: contraseña de aplicación, publicación autorizada, prueba de recepción real en Gmail/Outlook, modo oscuro en clientes de correo y revisión con lector de pantalla. La revisión en navegador no prueba compatibilidad completa de clientes de email. Persisten los seis avisos moderados transitivos ya documentados en el backend; no se afirman resueltos por añadir Nodemailer. Fuentes técnicas: [SMTP de Nodemailer](https://nodemailer.com/smtp), [triggers de Firestore](https://firebase.google.com/docs/functions/firestore-events) y [secretos de Functions](https://firebase.google.com/docs/functions/config-env).


Actualización operativa (5 de noviembre de 2026): el fundador autorizó publicar todo. Hosting, reglas y `submitLead` están publicados en `luremslanding`; el trigger `sendEarlyAccessEmail` sigue pendiente porque falta el secreto real de Gmail. Los registros pueden generar trabajos `pending`, pero no se envían confirmaciones. La publicación futura del trigger no dispara por sí sola los trabajos ya existentes; su recuperación requiere seguir los controles de estado anteriores. No se realizaron envíos de prueba ni se afirma recepción real.
