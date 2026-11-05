# Sección «Para psicólogos»: implementación y despliegue

5 de noviembre de 2026 · Rol: desarrollo · Autocomprobación, sin aprobación independiente de QA.

Estado: **publicada y comprobada en producción** en [lurems.lat/#para-psicologos](https://lurems.lat/#para-psicologos). El fundador autorizó expresamente implementar y desplegar únicamente esta sección.

## Implementación

- `src/components/PsychologistsSection.vue`: componente con el copy literal de `docs/prototipos/para-psicologos.html`. Izquierda: etiqueta, «Más pacientes. Menos pendientes.», un párrafo, CTA y nota de acceso temprano. Derecha: introducción, cuatro tarjetas completas y aclaración de desarrollo. Sin encabezado editorial ni botón de muestra.
- `src/pages/Home.vue`: sustituye exclusivamente la sección anterior por el componente; reenvía `open-waitlist` a la integración existente con el valor `Psicólogo`. Retira el arreglo de seis tarjetas y las importaciones usadas únicamente por la sección antigua. Los cambios locales previos del resto de Home se conservan en el workspace.
- `CONTEXTO_PROYECTO.md` y `SISTEMA_DISENO.md`: descripción actual y cierre de verificación. `scripts/check-psychologists-section.js`: comprobación reproducible del componente, sus breakpoints y el CTA. `docs/deployments/para-psicologos-2026-11-05.manifest.json`: procedencia y hashes del artefacto.
- No se modificaron para este encargo el hero, los formularios, servicios de leads, Analytics, Functions, reglas ni configuración de Hosting del workspace. Sus cambios locales ajenos siguen presentes y no se publicaron.

## Aislamiento del despliegue

El árbol local tenía trabajo pendiente de otros encargos, incluidos contenido, continuidad, formularios, Functions y correos. Por eso **no se desplegó el `dist` del workspace**.

1. Se verificó el remoto `PatrickSpace/LuremsLanding`, el proyecto/sitio `luremslanding` y el dominio `lurems.lat`. La API de Hosting confirmó dominio, propiedad y certificado activos. No se actuó sobre la app principal.
2. Base publicada inicial: versión `802b67a52ce89b76`, reproducida desde el commit `8b9f369c055cdd13b0c9fd40fa3cec4019b2dd0e` en un directorio temporal aislado. Se usaron las dependencias instaladas y el entorno local sin copiar sus valores a documentos o salidas.
3. Tailwind necesitó una pista de fuente de build con `outline text-wrap` para reproducir dos utilidades ya presentes en el CSS publicado. Esa pista no se renderiza ni entra en `dist`; no cambia el workspace. La reproducción resultante coincide **byte a byte con los 37 archivos descargables de producción**, incluidos HTML y todos los bundles. Otros dos archivos reservados son gestionados por Hosting.
4. Sobre esa base se aplicaron únicamente `src/pages/Home.vue` y el nuevo `src/components/PsychologistsSection.vue`. Todos los demás archivos versionados del staging se comprobaron contra HEAD y son idénticos. El componente coincide con el del workspace.
5. Se confirmó que la validación no cambió y que el bundle del guardado conserva exactamente su código al normalizar referencias a nombres de assets. Todos los archivos públicos estáticos son idénticos a la base. La ruta `leads-*.js` cambia por su referencia al nuevo hash del bundle principal, sin cambio del servicio.
6. Antes de publicar se comprobaron los hashes del artefacto, el proyecto/sitio y que la versión live seguía siendo la base auditada. Se ejecutó desde el staging, siguiendo el build y el despliegue Hosting de la landing:

```sh
firebase deploy --only hosting --project luremslanding --config firebase.json --message "Approved Para psicologos section only; baseline 802b67a52ce89b76" --non-interactive
```

No se incluyeron Functions, reglas ni otros servicios. El CLI informó 37 archivos y cuatro archivos nuevos subidos. Los documentos, pruebas y prototipos están fuera de la carpeta pública.

## Comprobaciones locales

- `npm run build`: aprobado en el workspace y en el staging aislado.
- `npm test`: ocho pruebas existentes aprobadas. No se repitió `test:integration`: el cambio no modifica servicios ni backend; el artefacto mantiene el servicio publicado. No se afirma una nueva validación de persistencia real.
- `git diff --check`: aprobado; revisado el delta propio y conservado el trabajo local ajeno.
- Chromium **156.0.8078.80**, con movimiento reducido: **22 recorridos**, once en el workspace y once sobre el artefacto aislado servido por preview.
- Viewports: 374/375/390, 767/768, 1023/1024, 1279/1280 y 1439/1440 px. Confirmados resumen primero en móvil, dos columnas desde 1280 px y tarjetas en dos columnas desde 768 px; cuatro tarjetas, un único párrafo de resumen y ausencia de desbordamiento horizontal.
- Comparación literal de títulos, párrafos, CTA y notas con el HTML aprobado. Se conservó el h1 del hero y se usó jerarquía h2/h3/h4 para la nueva sección.
- Estados normal, hover, activo y foco del CTA comprobados; apertura por clic y Enter, cierre por el botón existente y campo profesional visible con las cuatro opciones, sin cambiar manualmente de público ni enviar el formulario.
- Sin leads enviados. Las pruebas bloquearon llamadas de escritura y telemetría remota. Se mantiene el código y contrato de los eventos existentes; no se verificó recepción en la consola de Analytics.

### Brand System

Se consultaron en la web oficial Variables, Color System, Typography, Border Radius y Components, además de la guía local. Se revisaron capturas de escritorio y móvil frente a la composición aprobada.

Poppins, tonos profesionales oficiales y Lucide con trazo de 1,5 px; radios de iconos 8 px, tarjetas 12 px y panel/acción 20 px; sombra S completa. CTA blanco sobre `#6358B8` con contraste **5,80:1**, hover `#4D44A0` con **7,92:1** y activo/foco `#383188` con **10,70:1**. Texto secundario neutral 600. Sin cambios en logos, recursos de marca ni estilos globales. Se mantienen los márgenes y breakpoints del prototipo aprobado. Sin nuevas excepciones ni afirmación de conformidad global del resto de la web.

## Resultado en producción

- Proyecto y sitio: `luremslanding`.
- URL publicada: [https://lurems.lat/#para-psicologos](https://lurems.lat/#para-psicologos).
- Versión: `614b097a459f9717`.
- Release: `1793857974056000`.
- Hora: **5 de noviembre de 2026, 00:52:54 America/Lima** (`2026-11-05T05:52:54.056Z`).
- **11 recorridos sobre el dominio publicado**, en los mismos once anchos: copy literal, disposición, desbordamiento, estados del CTA, teclado y apertura/preselección profesional aprobados. Capturas de móvil a 390 px y de escritorio a 1440 px revisadas; se tomó además una captura de viewport de escritorio con la navegación y la sección completas.
- Los **37 archivos del artefacto servido por HTTPS** coinciden byte a byte con el staging validado. En el inventario de Hosting, 35 hashes se mantienen; cambia `index.html` y se sustituyen tres assets con hash: bundle principal, CSS y bundle de leads por su referencia al principal. La validación, los archivos públicos y los dos archivos reservados de Hosting se conservan.
- Comparación adicional de DOM en 390/1440 px contra la base previa: **fuera de `#para-psicologos`, textos, enlaces e imágenes idénticos**. El resto del trabajo local sigue sin desplegarse.

Evidencia visual local: `output/playwright/psychologists-workspace-*`, `psychologists-release-*`, `psychologists-production-390.png` y `psychologists-production-1440-viewport.png` (carpeta ignorada por Git). El script de navegador usa por defecto puertos 4173/4180; para producción se ejecutó la misma función con el objetivo `https://lurems.lat/`.

## Límites

No se enviaron leads, correos ni datos clínicos, ni se probó el guardado real del backend. Sin Safari/Firefox, dispositivo físico, lector de pantalla ni revisión independiente de QA. Las otras modificaciones locales no están publicadas y conservan sus propios pendientes. La autorización de esta sección no se extendió a esos cambios.
