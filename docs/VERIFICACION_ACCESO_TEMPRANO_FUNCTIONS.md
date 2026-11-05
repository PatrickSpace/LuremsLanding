# Verificación de registro y duplicados mediante Functions

4 de noviembre de 2026. Autocomprobación de desarrollo. Implementación local autorizada por el fundador; no equivale a auditoría independiente ni prueba de producción. Contrato y límites operativos: [Functions de acceso temprano](./ACCESO_TEMPRANO_FUNCTIONS.md).

Este informe recoge la etapa de deduplicación. La confirmación por correo se agregó después y tiene su propia evidencia y límites en [correos de registro anticipado](./email/README.md), con ocho pruebas unitarias, veinte de Functions y dieciséis casos visuales.

## Archivos modificados o añadidos

| Archivos | Cambio |
| --- | --- |
| `functions/src/index.js` | Callable `submitLead`, validación y errores sanitizados |
| `functions/src/lead-validation.js` | Validación autoritativa, tipos, perfiles y mensajes |
| `functions/src/register-lead.js` | Histórico normalizado y transacción con índice privado |
| `functions/package.json`, `functions/package-lock.json` | Node 22, Admin 14.5, Functions 7.4 y dependencias fijadas |
| `functions/tests/registration.test.js` | Integración callable, Firestore, concurrencia e histórico |
| `src/services/leads.js` | Cliente callable; elimina `addDoc` y Firestore del navegador |
| `src/services/lead-errors.js` | Contrato de duplicado y mensajes técnicos diferenciados |
| `src/services/lead-validation.js`, `src/components/WaitlistForm.vue` | Preparación del primer tramo: normalización, perfil conservado, mensajes accesibles y foco |
| `firestore.rules`, `firebase.json` | Denegación de acceso directo, Functions y emuladores |
| `package.json`, `.gitignore` | Comandos de prueba y exclusión de logs del emulador |
| `tests/lead-validation.test.js` | Validación y tratamiento seguro de mensajes |
| `scripts/check-waitlist-functions.js` | Matriz UI con backend local y dos clientes independientes |
| `scripts/check-waitlist-preparation.js` | Estados de validación, carga y fallos técnicos con Functions simulada |
| `README.md`, `CONTEXTO_PROYECTO.md`, `SISTEMA_DISENO.md` | Flujo actual, pruebas, límites y cierre de diseño |
| `docs/ACCESO_TEMPRANO_FUNCTIONS.md` y este informe | Contrato, transición, evidencia y límites |
| Encargo y verificación de preparación previos | Marcados como antecedentes resueltos/sustituidos |

Se conservaron los cambios ajenos preexistentes en `AGENTS.md`, `.ai/` y `docs/prototipos/`. No se modificó la app vecina ni se inspeccionaron valores de `.env.local` o leads reales.

## Pruebas ejecutadas

- `npm test`: **5 pruebas aprobadas**. Normalización con espacios/tabulaciones/mayúsculas, correo inválido, aliases, límites, perfil obligatorio y reconocimiento exclusivo del contrato de duplicado. Errores técnicos o respuestas malformadas nunca producen mensaje de duplicado.
- Functions y Firestore locales: **9 pruebas aprobadas**, ejecutadas con `GCLOUD_PROJECT=demo-luremslanding FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 npm --prefix functions test` sobre emuladores ya activos. Es la suite invocada por `npm run test:integration`, que también configura un proyecto demo. Firebase CLI 15.15.0, Java 21.0.12.1 y Node 22.20.0.
- `npm run build`: aprobado tras los cambios de producto finales; Vite 7.3.6, 1780 módulos. El bundle de leads usa Functions, sin SDK Firestore del navegador.
- `git diff --check` y comprobación de sintaxis de ambos scripts de navegador: aprobados.

La suite de servidor verifica las ocho combinaciones de ninguno/paciente/psicólogo/ambos con cada tipo solicitado, contra la callable real del emulador. El histórico incluye IDs aleatorios, correos con mayúsculas/espacios y duplicados previos. Se compara el contenido anterior completo para demostrar que nombre, perfil, fecha y demás datos no se sobrescriben. Agregar psicólogo sin perfil tras registrar paciente se rechaza sin agregar un lead.

Concurrencia real en Firestore emulado: ocho peticiones del mismo tipo producen un éxito y siete duplicados, tanto para paciente como para psicólogo. Ocho de tipos mezclados producen dos éxitos y seis duplicados. Ocho para agregar psicólogo a un paciente histórico producen un solo registro adicional y conservan el anterior. Se verifican fallos del índice y fallos simulados durante la lectura del histórico sin escrituras. Las reglas del emulador rechazan listado, lectura individual, creación y eliminación de leads e índice desde un cliente público.

## Navegador

Chromium 156.0.8078.73, viewports 375/390 × 812 y 1280/1440 × 900, movimiento reducido. Vite local en `127.0.0.1:4173` con un `envDir` alternativo que contiene solo configuración sintética de `demo-luremslanding` y opt-in a emuladores; Functions en 5001 y Firestore en 8080.

`scripts/check-waitlist-functions.js`: **64 casos aprobados** (8 combinaciones × 2 formularios × 4 anchos), usando Functions y Firestore reales locales. Solo se sustituye Analytics para capturar sus parámetros. Cubre cada texto de duplicado, éxito exclusivamente tras creación, conservación de nombre/correo/perfil, edición y cambio de tipo, foco en la alerta, ausencia de éxito y conversión en duplicados y ausencia de cierre del modal tras el plazo de 1,4 segundos. Dos contextos de navegador independientes enviando el mismo correo/tipo simultáneamente producen una conversión y un duplicado. No hay nombres ni correos sintéticos en los eventos capturados.

`scripts/check-waitlist-preparation.js`: **8 recorridos aprobados** con Functions simulada (inline/modal en los cuatro anchos), para errores de permisos/conexión, validación del perfil, foco, teclado hacia reintento, hover/selección, carga/deshabilitado y éxito. Un triple evento de submit de la misma instancia invoca una sola vez el servicio. Estas simulaciones no se usan para acreditar unicidad de base de datos.

Capturas y salida, ignoradas por Git: `output/playwright/functions-{home-inline|modal}-{ancho}-{patient|psychologist|both}.png`, `functions-browser-run.txt` y `functions-preparation-run.txt`. Suite del servidor: `output/functions-integration-run.txt`. Se inspeccionaron visualmente capturas de escritorio/móvil con los tres textos; sin desbordamiento horizontal ni recorte del formulario del modal en los viewports revisados.

## Cierre del Brand System y límites

Los duplicados reutilizan el componente/alerta de la preparación contrastada con **12 — Components** del Brand System. Se revisaron los tokens en `src/index.css`: Poppins, texto `#1A3A38`, superficie blanca o tintada con error `#E05454`, 14 px/1,6, radio 12 px y padding 12/16 px. En inline la superficie sólida mantiene el contraste sobre el degradado (texto sobre blanco: 12,31:1). No se cambiaron logos, layouts ni estilos de las acciones por rol. Las diferencias preexistentes fuera del alcance no se migraron. Cierre en `SISTEMA_DISENO.md`, sección 11.2; sin excepciones nuevas ni certificación global.

Pendientes operativos: publicar requiere autorización y comprobar IAM, plan y proyecto efectivo; deben cerrarse primero las escrituras directas antiguas. No se realizó publicación, prueba en nube ni migración de producción. El recorrido inicial del histórico tiene costo proporcional a la colección cuando falta índice; está documentado sin ocultarlo como consulta constante. Un resultado perdido por conexión puede corresponder a un commit exitoso: repetir devuelve duplicado sin crear otro lead.

No se probó con lector de pantalla ni dispositivo físico. No se configuraron App Check/CAPTCHA ni límite por visitante. `npm --prefix functions audit` informa **6 avisos moderados transitivos** (`glob`/`minimatch` y dependientes) incluso con Admin 14.5.0/Functions 7.4.0 y tras `npm audit fix`; se conserva ese pendiente sin forzar overrides incompatibles. El informe se guarda localmente en `output/functions-audit.json`. No se afirma preparación operativa completa de producción.
