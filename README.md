# Lurems Landing

Landing web principal de Lurems, migrada como proyecto independiente con Vue, Vite, npm, Firebase Hosting y Firestore.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
npm --prefix functions ci
npm test
npm run test:integration
node scripts/render-early-access-emails.mjs
```

## Firebase

El proyecto configurado es `luremslanding` y el sitio de Firebase Hosting es
`luremslanding`.

El formulario llama a la Cloud Function `submitLead` (`us-central1`, Node 22),
que valida y registra leads en Firestore mediante una transacción. Un correo
normalizado admite un paciente y un psicólogo; repetir el mismo tipo devuelve
el mensaje de duplicado. El cliente no consulta ni escribe Firestore.

Cada registro nuevo crea también un trabajo privado de correo en la misma
transacción. `sendEarlyAccessEmail` envía la confirmación de acceso temprano
por Gmail SMTP usando la plantilla del tipo correspondiente; un duplicado no
genera otra confirmación. Implementación local, todavía sin activar en nube.
Vistas previas, configuración del secreto y pruebas: [correos de acceso
temprano](./docs/email/README.md).

La configuración del SDK web se lee desde variables de entorno de Vite. Crea
un archivo local `.env.local` con:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Firebase Analytics solo se inicializa en builds de producción para `lurems.lat`,
`www.lurems.lat` y los dominios predeterminados del sitio de Firebase Hosting.

Las reglas de `firestore.rules` deniegan todo acceso directo del cliente. La
función usa Admin SDK y un índice privado por correo, conservando cada tipo y
reconociendo documentos antiguos sin reescribirlos. Implementación local, sin
despliegue ni migración de producción en este encargo.

Las pruebas usan Firebase CLI, Java 21 y el proyecto aislado `demo-luremslanding`.
Para probar la UI con emuladores, usar configuración Firebase sintética de ese
proyecto y `VITE_USE_FIREBASE_EMULATORS=true` en desarrollo. Esa variable no
habilita emuladores en builds de producción.

Contrato, costo de lectura del histórico y orden de publicación futura:
[Functions de acceso temprano](./docs/ACCESO_TEMPRANO_FUNCTIONS.md). Publicar
requiere autorización; las reglas deben cerrar la escritura antigua antes de
habilitar la función y la nueva UI.
