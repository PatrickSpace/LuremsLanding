# Registro de acceso temprano mediante Functions

Implementación local del 4 de noviembre de 2026, autorizada por el fundador en este chat: usar una función que valide y decida si insertar o devolver error. No se desplegó ni se consultó o migró producción. Solo corresponde a `LuremsLanding`, proyecto configurado `luremslanding`; no crea cuentas. Posteriormente se autorizó conectar la confirmación por correo del registro anticipado: la transacción crea un trabajo privado y `sendEarlyAccessEmail` lo procesa mediante Gmail. Falta configurar el secreto real y publicar; detalle en [correos de acceso temprano](./email/README.md).

## Flujo y contrato

`WaitlistForm.vue` → `src/services/leads.js` → callable `submitLead`, región `us-central1`, Node 22 → validación y transacción del servidor. El navegador ya no importa Firestore. Inline y modal usan el mismo recorrido.

Solicitud: `nombre`, `email`, `tipoUsuario`, `perfilPsicologo`, `origenFormulario` y `pagePath`. Se rechazan claves adicionales, nombres inválidos, correos inválidos, tipos/perfiles desconocidos, origen distinto de `modal`/`home-inline` y rutas con query/hash o fuera de límites. Correo con `trim` + minúsculas antes de validar, buscar o insertar. No se eliminan etiquetas `+` ni puntos. El timestamp solo lo fija el servidor. Paciente guarda perfil vacío; psicólogo exige una de las cuatro opciones vigentes.

| Resultado | Respuesta callable / efecto |
| --- | --- |
| Creado | `{ status: "created" }`; permite éxito, `submitted` y `generate_lead` |
| Duplicado | `HttpsError("already-exists", mensaje, {kind:"duplicate", types:[...]})`; sin escritura de lead, éxito, cierre, `submitted` ni conversión |
| Datos inválidos | `invalid-argument`, lista de campos; sin valores personales |
| Fallo técnico | Código técnico (`permission-denied`, `unavailable`, `deadline-exceeded`, etc.) o `internal`; sin deducir disponibilidad |

Los textos de duplicado son los tres aprobados por el fundador: paciente, psicólogo o ambos. El cliente los deriva de un contrato validado, sin mostrar mensajes arbitrarios del servidor. Los errores usan la alerta accesible existente con foco, conservan los datos y se limpian al corregir correo o cambiar tipo. Analytics recibe únicamente segmentación y metadatos de validación; no nombre ni correo.

## Unicidad e histórico

La transacción lee `leadRegistrations/{sha256(emailNormalizado)}`. Si falta, proyecta únicamente `email` y `tipoUsuario` de `leads`, normaliza los valores históricos y reúne los tipos existentes. Así reconoce IDs aleatorios, mayúsculas, espacios y duplicados anteriores sin reescribirlos ni migrarlos.

Si el tipo solicitado ya existe, devuelve duplicado con los tipos encontrados y no escribe. Si falta, crea un nuevo documento `leads` y escribe la unión de tipos en el índice **en la misma transacción**. Dos solicitudes para el mismo correo compiten por el mismo documento; el reintento transaccional vuelve a comprobar el estado. Cada tipo conserva nombre, perfil profesional, origen, ruta y fecha propios. Índice inconsistente o fallo del histórico abortan; no se interpretan como ausencia de registro.

El commit también crea un único documento `leadEmails` con el mismo ID del lead nuevo. Un fallo posterior de correo no borra el registro ni hace que un reintento del formulario lo duplique. La salida `created` confirma registro y encolado, sin afirmar entrega del correo. El envío es una Function separada con su propio secreto y control de estados.

El índice solo guarda versión, tipos y fecha, sin nombre/correo. El hash es una clave interna, no anonimización; permanece inaccesible al cliente. Las reglas deniegan cualquier lectura/escritura de cliente. Admin SDK usa los permisos IAM del servidor. Todo futuro escritor administrativo debe respetar esta operación o coordinar su índice.

**Costo y límite:** sin migración ni campo normalizado en todos los documentos antiguos, reconocer variantes históricas exige recorrer la proyección de la colección cuando falta índice. El costo crece con el histórico; los intentos duplicados de un histórico sin índice repiten esa lectura, porque no escriben. Tras un registro válido, el índice evita el recorrido para ese correo. Para un volumen grande se puede encargar una preparación de índices autorizada por separado; no se ejecutó. Un timeout produce error técnico y ninguna confirmación falsa.

## Emuladores y pruebas

```bash
npm ci
npm --prefix functions ci
npm test
npm run test:integration
```

Firebase CLI y Java 21 son requisitos del emulador. En este equipo se usó el Java ya instalado en `/opt/homebrew/opt/openjdk@21/bin`, anteponiéndolo al `PATH` del comando. El script fuerza `demo-luremslanding`, y las pruebas rechazan ejecutarse sin ese proyecto y `FIRESTORE_EMULATOR_HOST=127.0.0.1:8080`. Los fixtures y su limpieza solo afectan a esa base efímera.

Para pruebas de navegador, arrancar los emuladores con ese mismo proyecto y Vite en 4173 con configuración sintética y `VITE_USE_FIREBASE_EMULATORS=true`. `scripts/check-waitlist-functions.js` es una función para `playwright-cli run-code`: usa la callable y Firestore locales y captura Analytics mediante un sustituto. `scripts/check-waitlist-preparation.js` cubre errores técnicos/carga con Functions simulada. Ninguno debe apuntar a producción.

## Publicación futura (no ejecutada)

Requiere autorización de publicación y verificar proyecto efectivo del SDK, región, IAM y plan compatible con Functions. No se inspeccionaron facturación ni permisos remotos. Fuente oficial: [callables y errores](https://firebase.google.com/docs/functions/callable), [transacciones](https://firebase.google.com/docs/firestore/manage-data/transactions) y [emuladores](https://firebase.google.com/docs/functions/local-emulator).

Orden necesario para cerrar la ruta antigua sin una ventana de duplicados:

1. Publicar las reglas que deniegan escritura directa; esperar a cerrar escrituras anteriores antes de admitir registros por la función. Los clientes antiguos recibirán error de permisos, sin éxito falso.
2. Con el remitente y secreto Gmail configurados, publicar `functions:landing` con `submitLead` y `sendEarlyAccessEmail` en `luremslanding`; comprobar el registro, la confirmación por correo y el cierre de la ruta directa antes de exponer la nueva UI.
3. Publicar Hosting con el cliente callable y verificar ambos formularios. No combinar un backend nuevo activo con las reglas antiguas permisivas.

No se incluyen comandos de despliegue en scripts de prueba o build. Ante reversión, mantener denegadas las escrituras directas; una versión antigua con `addDoc` dejaría de registrar. Las instancias están limitadas a tres y CORS a dominios de la landing y localhost; esto no constituye límite por visitante ni protección completa contra bots. No se configuraron CAPTCHA ni App Check nuevos.

La pérdida de una respuesta puede ocurrir después de un commit. Se muestra fallo técnico y se conservan los datos; repetir una operación ya confirmada devuelve duplicado sin otro lead ni conversión adicional. No se anuncia éxito basándose en un timeout ni en un error de permisos.
