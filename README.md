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

Si este proyecto comparte Firestore con la app principal, no despliegues reglas
desde esta landing. La regla de `leads` debe fusionarse en el archivo canónico de
reglas de Firestore de la app principal.
