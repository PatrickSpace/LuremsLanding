# Lurems Landing

Landing web principal de Lurems, migrada como proyecto independiente con Vue, Vite, npm, Firebase Hosting y Firestore.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
npm run functions:lint
npm run functions:test
firebase deploy --only hosting,firestore:rules
npm run deploy:functions
```

## Firebase

El proyecto configurado es `psicosaas-3c819`.

El formulario registra leads en Firestore, colección `leads`.

Las Cloud Functions migradas viven en `functions/` y se despliegan al mismo proyecto Firebase.
