# Lurems Landing

Landing web principal de Lurems, migrada como proyecto independiente con Vue, Vite, npm, Firebase Hosting y Firestore.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
firebase deploy --only hosting
```

## Firebase

El proyecto configurado es `psicosaas-3c819`.

El formulario registra leads en Firestore, colección `leads`.

La configuración del SDK web se lee desde variables de entorno de Vite. Copia
`.env.example` a `.env.local` y completa:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Firebase Analytics solo se inicializa en builds de producción cuando el hostname
es `lurems.lat` o `www.lurems.lat`.

Si este proyecto comparte Firestore con la app principal, no despliegues reglas
desde esta landing. La regla de `leads` debe fusionarse en el archivo canónico de
reglas de Firestore de la app principal.
