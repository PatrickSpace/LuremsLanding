# Lurems Landing

Landing web principal de Lurems, migrada como proyecto independiente con Vue, Vite, npm, Firebase Hosting y Firestore.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
firebase deploy --only hosting
firebase deploy --only hosting,firestore:rules
```

## Firebase

El proyecto configurado es `luremslanding` y el sitio de Firebase Hosting es
`luremslanding`.

El formulario registra leads en Firestore, colección `leads`.

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

Las reglas de `firestore.rules` permiten únicamente crear documentos válidos en
la colección `leads`. Las lecturas, modificaciones, eliminaciones y el acceso a
otras colecciones están bloqueados para clientes web.
