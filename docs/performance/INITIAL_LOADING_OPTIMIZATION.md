# Carga inicial: JavaScript y precarga del hero

4 de noviembre de 2026 · implementación y autocomprobación de Desarrollo. Sin despliegue ni aprobación independiente de QA.

## Cambio implementado

- La entrada conserva Vue, la UI completa del formulario, la app base de Firebase y Analytics. `firebase.js` no importa ni inicializa Firestore. Analytics mantiene sus cuatro hosts permitidos y la condición de producción. Una promesa compartida permite esperar la inicialización sin perder llamadas tempranas; `send_page_view: false` elimina el page view automático adicional del SDK, porque el router ya emite ese evento explícitamente. No se difiere la medición de visita hasta interactuar con el formulario.
- Al enviar, se bloquean nuevos envíos antes de descargar el esquema Zod original. Solo un resultado válido solicita `leads.js` y Firestore. Las importaciones ES se comparten entre el formulario inline y el modal. Se conservan campos, mensajes, perfiles, reglas, normalización, timestamp y eventos comerciales. Un error de descarga se muestra mediante el mismo estado de error de registro.
- Se evaluó [Firestore Lite](https://firebase.google.com/docs/firestore/solutions/firestore-lite). Omite la gestión offline y no conserva la cola/reintento del SDK completo. Se mantiene **Firestore completo, diferido hasta el envío válido** para preservar ese comportamiento. No se añade persistencia en disco. La primera descarga de los chunks diferidos requiere conexión: si se pierde antes de cargarlos, aparece el estado de error y todavía no existe una escritura en la cola del SDK. La conservación de la cola aplica una vez disponible el servicio. Las pruebas de interfaz usan mocks; no se afirma haber certificado el SDK offline contra un servidor o emulador.
- El primer clip recibe su URL al reproducir. El segundo conserva el poster, pero no recibe URL MP4 hasta **3.000 ms después de confirmar el primer fotograma** del actual. Esto deja unos 2 s nominales antes del cambio. Después de cada fundido de 600 ms se reutiliza la capa saliente para preparar la próxima escena. `preload="auto"` sigue siendo una indicación del navegador, limitada a las fuentes ya habilitadas.
- Se conservan los dos elementos de video, escenas y orden, archivos v2, posters, encuadres, filtros, reproducción en bucle, espera de reproducción y primer fotograma, timeout de 10 s y reintentos de 2 s. Pausar aborta la preparación lógica y limpia el nuevo temporizador. **No se afirma que cancele descargas ya iniciadas**. No se modifica el título ni su LCP.

## Build y mediciones

La línea base se obtuvo antes de editar: `npm run build` produjo una entrada de **665.570 bytes**, **208,78 kB gzip estimados por Vite**. El build final pasa y produce:

| Recurso | Minificado | Gzip estimado por Vite | Cuándo se solicita |
| --- | ---: | ---: | --- |
| Entrada anterior | 665,57 kB | 208,78 kB | Inicio |
| Entrada final | 198,24 kB | 71,66 kB | Inicio |
| Validación final | 60,61 kB | 16,55 kB | Envío |
| Servicio de escritura final | 406,83 kB | 120,64 kB | Envío válido |

Los kB son decimales. La entrada pierde **467.331 bytes minificados (70,22 %)**. La suma de todos los chunks no representa la descarga inicial. No se usa `manualChunks` para aparentar ahorro: Network confirma que validación y escritura están ausentes durante la observación sin interacción.

Medianas de tres visitas por combinación; bytes enteros. JS es transferencia real (gzip y cabeceras); video es contenido recibido, incluidas transferencias en curso.

| Red | Tiempo | JS antes | JS después | Video antes | Video después |
| --- | ---: | ---: | ---: | ---: | ---: |
| Sin limitar | 3 s | 209.307 | 72.078 | 1.345.475 | 494.123 |
| Sin limitar | 10 s | 209.307 | 72.078 | 2.462.070 | 2.462.070 |
| Sin limitar | 20 s | 209.307 | 72.078 | 4.533.355 | 4.533.355 |
| 128 KiB/s, 300 ms | 3 s | 209.307 | 72.078 | 0 | 35.254 |
| 128 KiB/s, 300 ms | 10 s | 209.307 | 72.078 | 531.008 | 730.376 |
| 128 KiB/s, 300 ms | 20 s | 209.307 | 72.078 | 1.699.376 | 1.927.376 |

Ahorro observado de JS: **137.229 bytes transferidos (65,56 %)** en todos los puntos y perfiles. Video sin limitar: **851.352 bytes menos a 3 s (63,28 %)**; a 10/20 s no hay ahorro porque se sigue preparando la misma secuencia. Estos bytes se difieren, no se eliminan del ciclo completo.

En red lenta no se afirma ahorro de video: el arranque más temprano permite recibir más contenido y avanzar antes. Primer fotograma mediano: **5.575,2 → 3.801,8 ms** (1.773,4 ms antes, 31,81 %). Rangos: antes 5.345,7–5.784,7 ms; después 3.793,0–3.876,2 ms. Sin limitación: 261,2 → 197,6 ms, con rangos amplios de 237,7–954,4 y 149,5–398,6 ms; no se presenta como una garantía de latencia.

Las tres muestras sin limitar coinciden en los bytes de cada punto. En red lenta, rangos de video a 3/10/20 s: antes **0–10.508 / 525.008–625.377 / 1.663.381–1.727.876**; después **8.254–35.254 / 725.876–733.376 / 1.920.626–1.930.376**. La tolerancia observada de los puntos fue de 0–83 ms. Todos los JS iniciales estaban completos a los 3 s. Ninguna visita solicitó los chunks de validación/escritura.

Datos, rangos, snapshots de solicitudes y metadatos: [loading-measurements.json](./loading-measurements.json). Las solicitudes de `agotado` y escenas posteriores también comienzan antes en las tres muestras lentas candidatas; no se atribuye el ahorro a haber detenido o retrasado toda la secuencia.

### Condiciones y reproducción

Chrome/Chromium **156.0.8078.73**, macOS, Playwright CLI, builds de producción servidos con Vite Preview: base en `http://localhost:4176/`, candidato en `http://localhost:4173/`. No se compara con la producción antigua. Viewport de medición **1440 × 900**, DPR 1, escritorio, caché deshabilitada por CDP, contexto nuevo por visita, CPU CDP **1×**, observación de 20 s desde el inicio de navegación, sin interacción ni scroll. No se pretende controlar la carga del sistema operativo.

Dos perfiles: sin limitación de red y **128 KiB/s de bajada, 64 KiB/s de subida, latencia de 300 ms**, `cellular3g`. Las mediciones finales alternan base/candidato dentro de cada perfil, tres repeticiones por combinación. Se dejaron vacías las otras páginas de prueba y no se ejecutaron builds ni pruebas visuales concurrentes. Se bloquean en ambos lados los recursos externos, incluida Google Fonts, para evitar su variabilidad en la comparación; las comprobaciones visuales del hero se hicieron por separado con las fuentes normales. Analytics no se inicializa en localhost en ninguna de las dos versiones; esta medición no incluye gtag ni representa una visita en un host permitido.

El tiempo denominado primer fotograma se aproxima mediante el primer muestreo con `video.currentTime > 0.05`, cada 10 ms; mide el comienzo de reproducción observable, no LCP ni una marca exacta del compositor. La espera real de fotograma del componente usa `requestVideoFrameCallback` cuando está disponible.

Se registran `Network.dataReceived` y `Network.loadingFinished`; se incluyen solicitudes en curso. `videoBody` es el contenido recibido notificado por CDP; para MP4 sin compresión equivale al payload de red. `jsTransfer` incluye gzip real servido por Preview y cabeceras para peticiones terminadas. Los campos `videoTransfer` de solicitudes abiertas son los bytes codificados notificados hasta ese instante; CDP puede reportarlos con retraso respecto al contenido decodificado. No equivalen a un contador de interfaz de red. Los snapshots de cada punto son copias independientes, no referencias a contadores que sigan creciendo.

Las primeras muestras exploratorias (`baseline-measure`, `after-measure`, `*-isolated`) se conservan como antecedentes; no son la tabla final. Hubo variación en la carga externa y actividad concurrente, por lo que se repitió la comparación por pares con el protocolo anterior. No se atribuye a la precarga un ahorro causado por un arranque fallido o tardío.

Script versionable: [measure-initial-loading.js](../../scripts/measure-initial-loading.js). Con ambos builds servidos, ejecutar en una sesión CLI abierta:

```sh
/Users/patricklostaunau/.codex/skills/playwright/scripts/playwright_cli.sh --session luremsload run-code --filename scripts/measure-initial-loading.js
```

La copia exacta previa de `HeroVideo.vue`, configuración de reconstrucción de base, scripts de escenarios, mocks y resultados completos están en `output/playwright/loading-2026-11-04/` (ignorado por Git). La reconstrucción local de base usa el formulario/servicios de HEAD, que estaban limpios al iniciar, y la copia del hero v2 previa a este encargo. Sus 665.570 bytes JS coinciden con la línea base. La salida inicial del build y el snapshot de Git distinguieron los cambios locales ajenos.

## Comprobaciones ejecutadas

- `npm run build`: correcto, sin advertencia de chunk >500 kB. No hay scripts de test o lint declarados en `package.json`.
- Ciclos completos a **1440 × 900, 390 × 844 y 375 × 812**, con fuentes normales: solo → triste → agotado → abrumado → estresado → perdido → incomprendido → solo. Muestreo de 40 ms: sin errores de página, sin entradas sin primer fotograma ni pantallas negras detectadas, cobertura mínima de fundidos ≈1. Cada cambio coincide con el nombre accesible del título; intervalos de aproximadamente 5 s. Capturas `final-*.png`, `cycle.json`.
- Pausa manual durante 6,2 s: palabra y tiempos detenidos; salir y volver respeta la pausa. Salir de pantalla pausa y volver reanuda. Antes de la precarga pendiente el segundo `src` permanece ausente durante la pausa. Hover, activación por Espacio, nombre accesible pausar/reproducir y foco de teclado comprobados. A 375 px, Tab/Shift+Tab muestra contorno teal de 2 px. `states.json`, `mobile-reduced.log` y capturas.
- Movimiento reducido en escritorio y 375 px: cero solicitudes MP4 y ambos `src` ausentes antes de la interacción; reproducción voluntaria y cambio de preferencia en caliente comprobados.
- Siguiente clip retenido 21 s, red 128 KiB/s / 300 ms, móvil 390 px: «solo» completa su bucle de 12,81 s mientras espera; «triste» se recupera hacia los 40,97 s en esa muestra (incluye un arranque externo lento de la página y la retención). Sin errores de página. El muestreo registra búsqueda transitoria al reiniciar el bucle; no se presenta como fallo de fundido. `slow.json`, `slow-before.png`, `slow-after.png`. No se cambió ni recortó el empalme original.
- Preparación ya iniciada con respuesta retenida: pausar conserva palabra y ambos tiempos incluso después de liberar la respuesta; al reanudar vuelve a avanzar. `visibility-cancel.json`. Esto prueba cancelación lógica, no cancelación de la transferencia.
- Pestaña oculta: se comprobó el manejador con `document.hidden` y `visibilitychange` controlados. Ambos tiempos se mantienen durante 5,5 s y la reproducción vuelve al restaurar visibilidad. La automatización mantuvo `document.hidden=false` al cambiar entre pestañas, incluso en el intento headed; **la ocultación nativa real queda sin certificar**. Evidencias `visibility-controlled.log`, `hidden.log` y `visibility-cancel.json`.
- Formularios inline y modal en 1440, 390 y 375 px, build separado de producción con aliases de prueba para SDK Firebase y configuración sintética: nombre/email/perfil inválidos, selección de público y perfil, normalización, carga pendiente, error de escritura, reintento exitoso y confirmación. Dos eventos submit seguidos producen una sola llamada durante el envío. Firestore no se inicializa al cargar ni con validación inválida; ambos formularios comparten una inicialización tras el primer envío válido. `forms.json`, `form-error-*.png`, `form-success-*.png`, `inline-success-*.png`.
- Analytics en ese build controlado: origen permitido `https://lurems.lat/` resuelto íntegramente al servidor local por interceptación; se bloquean los demás hosts, sin contacto con producción. El mock retrasa `isSupported` 1,2 s. Por viewport: 1 inicialización con `send_page_view:false`, 1 `page_view`, 1 `open_lead_form`, 3 `select_user_type`, 1 `lead_form_error`, 2 `generate_lead` (solo éxitos). No hay `generate_lead` por escritura fallida ni por doble envío. Parámetros y orden conservados, sin datos personales en Analytics. Se comprueba la lógica y los parámetros del SDK; **no la ingestión real por GA ni configuración de conversiones**. La opción del SDK se contrastó con [AnalyticsSettings.config](https://firebase.google.com/docs/reference/js/analytics.analyticssettings) y la implementación instalada de Firebase 12.15.0.
- SHA-256 de los siete MP4 contra el manifiesto previo: idénticos. El template del formulario es idéntico a HEAD y el CSS del hero es idéntico a la copia previa. No se alteran medios, Hosting, dominios, caché, fuentes, logos, reglas de Firestore ni validaciones.

## Cierre del Brand System

Se revisaron `SISTEMA_DISENO.md`, tokens de `src/index.css` y las pestañas **03 — Variables**, **12 — Components** y **14 — Applications** de la [fuente oficial](https://patrickspace.github.io/lurems-brand-system/). Teal `#45A99A`, violeta profesional `#7B6FD0` y Poppins contrastados. Se revisaron capturas de hero en los tres tamaños y de formulario en error/éxito; sin desbordamiento horizontal. La carga pendiente usa el estado existente deshabilitado y su spinner.

No se cambian estilos, variantes, colores, tipografía, espaciados, grilla, radios, sombras, iconos, proporciones de marca o textos. La UI y los encuadres se conservan; cambia la programación de carga. Se mantienen fuera de alcance las diferencias preexistentes del hero (H1 de peso 650, tamaño hasta 4,7 rem y colores literales) y el tratamiento preexistente de componentes. No hay nuevas excepciones de diseño autorizadas ni se afirma conformidad global o una auditoría completa de contraste/accesibilidad. En los mocks se bloquearon fuentes externas; las capturas del hero con fuentes normales y la identidad de templates/CSS sustentan la conservación visual.

## Archivos y límites

Código: `src/components/HeroVideo.vue`, `src/components/WaitlistForm.vue`, `src/services/firebase.js`, `src/services/analytics.js`, `src/services/leads.js` y nuevo `src/services/lead-validation.js`. Reproducción: `scripts/measure-initial-loading.js`. Documentación: este informe, `loading-measurements.json` y las secciones técnicas de `CONTEXTO_PROYECTO.md`.

Se conservaron los cambios locales ajenos de instrucciones, contexto, documentación y medios v2. No se crearon ni contactaron otros chats/subagentes. Las pruebas no escriben leads reales ni envían eventos reales. No se verificaron Safari/iOS, Android físicos, datos de campo, estado publicado, seguridad de reglas en un emulador ni permisos/errores reales del backend. El build y estas comprobaciones son evidencia local de desarrollo; publicación y revisión independiente de QA siguen siendo decisiones separadas.
