# Optimización de los videos del hero — v2

4 de noviembre de 2026. Implementación y autocomprobación de desarrollo sobre `5a699cf`, con cambios locales ajenos en `AGENTS.md` y `.ai/` conservados. No se desplegó.

## Resultado

Los siete MP4 activos pasan de **29.843.395 a 8.695.987 bytes**: **21.147.408 bytes menos (70,86 %)**. MB decimales. El resultado, **8,70 MB**, supera ligeramente la orientación de 5–8 MB; se priorizaron nitidez y continuidad. Se conserva **todo el metraje**, sin escalar, recortar ni convertir la cadencia.

| Escena | Antes (MB) | Después (MB) | Duración antes → después (s) | Resolución antes → después | FPS conservados | Fotogramas antes/después |
| --- | ---: | ---: | ---: | --- | ---: | ---: |
| solo | 4,841 | 0,494 | 12,81 → 12,81 | 1280 × 720 → 1280 × 720 | 29,970 | 384 |
| triste | 3,426 | 0,851 | 11,33 → 11,33 | 1280 × 720 → 1280 × 720 | 30 | 340 |
| agotado | 3,610 | 1,117 | 12,01 → 12,01 | 1280 × 720 → 1280 × 720 | 23,976 | 288 |
| abrumado | 4,884 | 0,869 | 15,04 → 15,04 | 1280 × 720 → 1280 × 720 | 24 | 361 |
| estresado | 3,895 | 1,202 | 12,46 → 12,46 | 1280 × 720 → 1280 × 720 | 24 | 299 |
| perdido | 5,723 | 3,368 | 15,39 → 15,39 | 1280 × 720 → 1280 × 720 | 23,976 | 369 |
| incomprendido | 3,464 | 0,795 | 11,32 → 11,32 | 1280 × 720 → 1280 × 720 | 25 | 283 |
| **Total** | **29,843** | **8,696** | | | | |

El contenedor nuevo redondea algunas duraciones hacia arriba en menos de 2 ms. El número de fotogramas y la duración de la pista multimedia, calculada con su escala temporal, son idénticos. El [manifiesto](./hero-video-v2-manifest.json) conserva bytes exactos, SHA-256, duraciones, escalas temporales y fotogramas de ambas versiones.

Los derivados son `public/media/lurems-<escena>-v2.mp4`. `HeroVideo.vue` solo cambia la construcción de esa URL. Se mantienen orden, `object-position` por escena, posters, filtros CSS de escritorio y móvil, silencio, `playsinline`, bucle, dos slots, `preload="auto"`, temporizadores de 5 s, fundido de 600 ms y espera del primer fotograma. `v2` identifica estos bytes: usar otra versión para futuras codificaciones.

## Comparación y elección

| Perfil generado | Total de siete escenas | Decisión |
| --- | ---: | --- |
| H.264, metraje completo, CRF 24, `slow` | 11.334.216 bytes | Más peso; referencia de compresión menos agresiva |
| H.264, metraje completo, CRF 26, `slow` | 8.695.987 bytes | Seleccionado, tras comparación con los filtros reales |
| H.264, primeros 7 s, CRF 24, `slow` | 6.140.882 bytes | No integrado; se conserva el metraje completo y el punto de bucle original |

Se generaron también WebM/VP9, CRF 32, bitrate libre, `deadline=good`, `cpu-used=2`, `row-mt=1`, en tres escenas representativas:

| Escena | H.264 seleccionado (bytes) | VP9 probado (bytes) |
| --- | ---: | ---: |
| solo | 494.123 | 219.259 |
| estresado | 1.202.177 | 843.852 |
| perdido | 3.367.666 | 4.023.032 |
| **Muestra total** | **5.063.966** | **5.086.143** |

Este perfil VP9 no reduce el conjunto de la muestra frente al H.264 seleccionado, aunque sí reduce dos clips. No se incorpora un formato adicional. Esto no demuestra que VP9 nunca mejore el resultado: no se hizo una búsqueda exhaustiva de parámetros ni se codificaron las otras cuatro escenas en VP9.

Como apoyo se calculó VMAF sobre una muestra de uno de cada 12 fotogramas, usando los originales como referencia: medias por clip de **90,65–95,07** para H.264 CRF 24 y **88,49–93,77** para CRF 26. Son métricas sin filtros, no una garantía perceptual ni una aprobación de QA. La selección se apoya también en comparación visual en navegador: siete escenas, originales/CRF 24/CRF 26/recorte, a los 4 s, en 1440 y 390 px, con el `object-fit`, posición, saturación, brillo y gradientes reales. No se aprecian nuevos recortes, bloques molestos o pérdida de legibilidad; existe la suavización esperable de una recompresión con pérdida.

## Respaldo y repetición

Antes de retirar los originales de `public`, se copiaron y se compararon byte a byte y mediante SHA-256 en:

```text
output/video-optimization/2026-11-04/originals/lurems-<escena>.mp4
```

El respaldo y los candidatos están fuera de `public` y `dist`. Firebase Hosting sigue sirviendo `dist`; Vite copia solamente los derivados activos y el recurso antiguo de cafetería que ya existía. El respaldo está ignorado por Git mediante `output/`: es una copia local, no un respaldo remoto. Los originales también pueden recuperarse del commit `5a699cf` con los hashes del manifiesto. No se deben poner los respaldos en `public`.

Herramienta utilizada: FFmpeg **7.1**, libx264 **core 164 r3190 7ed753b**, binario arm64 del wheel `imageio-ffmpeg==0.6.0`, extraído en `/tmp/lurems-compression-tools/`, sin añadir dependencias npm ni instalar paquetes en el proyecto. FFprobe no estaba disponible; el script lee los átomos MP4 y FFmpeg decodifica todos los fotogramas para comprobar los archivos.

`/tmp` es temporal y no forma parte del entregable. Si ese binario ya no existe, en este Mac arm64 se puede preparar de nuevo de forma aislada con `python3 -m pip install --no-deps --target /tmp/lurems-compression-tools imageio-ffmpeg==0.6.0`. También sirve un FFmpeg instalado por otra vía, pasando su ruta mediante `--ffmpeg`; comprobar su versión y volver a revisar los resultados.

Desde la raíz del repositorio, con el respaldo anterior presente y FFmpeg con `libx264`:

```bash
LUREMS_FFMPEG=/tmp/lurems-compression-tools/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1
python3 scripts/optimize-hero-videos.py --ffmpeg "$LUREMS_FFMPEG" --profile full-crf26 --crf 26
```

El [script](../../scripts/optimize-hero-videos.py) verifica los hashes del respaldo antes de codificar, conserva los originales, rechaza carpetas de trabajo dentro de `public`/`dist`, registra cada comando y versión de FFmpeg en `output/video-optimization/2026-11-04/full-crf26/manifest.json` y decodifica cada salida con `-xerror`. No modifica los assets activos automáticamente: permite revisar los resultados antes de integrarlos con un nombre de versión nuevo. En una copia nueva del repositorio hay que restaurar primero los originales en la carpeta del respaldo; el script no descarga stock de Internet ni puede reconstruir un original a partir de un derivado.

Comando equivalente por archivo:

```bash
"$LUREMS_FFMPEG" -hide_banner -nostdin -y \
  -i output/video-optimization/2026-11-04/originals/lurems-solo.mp4 \
  -map 0:v:0 -an -sn -dn -map_metadata -1 \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p \
  -profile:v high -level:v 3.1 \
  -force_key_frames 'expr:gte(t,n_forced*2)' -movflags +faststart \
  output/video-optimization/2026-11-04/full-crf26/lurems-solo.mp4
```

No se usó `-r`, `-vf scale`, `-ss` ni `-t` en los archivos integrados. Se preserva la información de color de los originales. Los siete tienen `moov` antes de `mdat`, H.264, `yuv420p`, sin pista de audio y se decodifican completos sin errores. Las keyframes forzadas cada 2 s facilitan el acceso; el codificador conserva además su detección de cambios de escena. Otros builds de FFmpeg/x264 pueden producir hashes distintos y deben volver a verificarse.

Para reproducir los candidatos: añadir `--duration 7 --profile trim7-crf24 --crf 24`; para el completo menos comprimido, `--profile full-crf24 --crf 24`; para la muestra VP9, `--codec vp9 --crf 32 --profile vp9-crf32 --scenes solo estresado perdido`.

## Verificación local

- `npm run build`: correcto, Vite 7.3.6. Persiste la advertencia previa de chunk JS >500 kB; su división queda fuera del encargo.
- Comparación de todos los originales y derivados con los filtros y encuadres reales del hero a 1440 y 390 px. Capturas por escena y perfil, y hojas de comparación de tres columnas: original, CRF 24 y CRF 26.
- Chrome/Chromium **156.0.8078.73**, build servido por `vite preview` en `http://localhost:4173/`, sin despliegue. Ciclos completos a **1440 × 900, 390 × 844 y 375 × 812**. En las tres medidas se observa solo → triste → agotado → abrumado → estresado → perdido → incomprendido → solo, con título sincronizado. Ningún error de página, video visible sin fotograma decodificado ni falta de cobertura durante los fundidos en el muestreo de 40 ms. Los primeros fotogramas entrantes tienen contenido; no hay pantallas negras observadas. Documento sin desbordamiento horizontal y CTA visible.
- Pausa manual: ambos videos y la palabra quedan detenidos durante 6,2 s; los tiempos no avanzan. Salir y volver al hero respeta esa pausa. Tras reproducir, salir de pantalla pausa ambos videos y volver reanuda el activo. Se conservan las URL y `preload="auto"`; no se afirma cancelación de descargas.
- Control: nombre accesible cambia entre pausar/reproducir, hover conservado y activación por Espacio comprobada. En 375 px, Tab/Shift+Tab sitúan el foco visible en el control, con contorno teal `rgb(69, 169, 154) solid 2px`.
- Movimiento reducido en escritorio y 375 px: ambos `src` ausentes, videos pausados y **cero solicitudes MP4** antes de la interacción. Reproducción explícita funciona manteniendo la preferencia reducida. Cambiar la preferencia en caliente vuelve a pausar y retirar las fuentes automáticas.
- Red lenta en 390 px: caché deshabilitada, **128 KiB/s de bajada**, 64 KiB/s de subida y 300 ms de latencia mediante CDP. Además se retuvo la respuesta de `triste` durante 21 s para forzar una espera mayor que el clip actual. «solo» permanece activo y repite su bucle completo de 12,81 s; el cambio a «triste» ocurre hacia los 24,84 s desde la navegación, con palabra y fondo sincronizados. No se introduce un reinicio a los 7 s porque esos recortes no se integran. El muestreo registra un estado transitorio de búsqueda (`readyState=1`) al reiniciar el bucle; esto se separa de las comprobaciones de fundido normales.
- Se repitió la espera lenta con grabación de pantalla del navegador a 25 fps. La revisión de 35 fotogramas alrededor del reinicio, en `slow-loop-contact.png`, conserva el fondo visible, sin pantalla negra ni destello observado. Se conserva el empalme del metraje original; no se editó para crear un bucle circular nuevo. En esa repetición la siguiente escena entra hacia los 24,32 s. Ambas ejecuciones terminan sin errores de página.
- Siete solicitudes de rango locales: `206`, `Content-Type: video/mp4`, `Content-Range` y 32 bytes correctos. SHA-256 de cada archivo en `dist` idéntico al de `public`; los siete originales y `output/` están ausentes de `dist`.

Evidencias locales: `output/playwright/video-optimization-2026-11-04/` (`cycle.json`, `states.json`, `reduced-mobile.json`, `slow.json`, scripts y capturas) y `output/video-optimization/2026-11-04/` (originales, candidatos, logs de codificación, manifiestos, VMAF y build). Los scripts Playwright se ejecutan con `playwright_cli.sh --session luremsvideo run-code --filename <script>`, con una sesión abierta y la raíz del repositorio como directorio de trabajo. Las hojas `comparison-1440.png` y `comparison-390.png` muestran, por fila, las siete escenas en orden; columnas original / CRF 24 / CRF 26.

## Revisión del Brand System

Se leyeron `SISTEMA_DISENO.md` y los tokens de `src/index.css`; se abrieron **03 — Variables**, **12 — Components** y **14 — Applications** de la [fuente oficial](https://patrickspace.github.io/lurems-brand-system/). Teal `#45A99A`, morado `#7B6FD0` y Poppins coinciden con la referencia consultada. No se cambian estilos, tipografía, espacios, grilla, radios, sombras, iconos, logos, textos ni controles. La comparación se centra en los videos detrás de la UI: posiciones por escena, gradientes, brillo/saturación y legibilidad de título, copy y CTA conservados en escritorio y móvil.

Las diferencias preexistentes de tipografía del H1 (peso 650 y tamaño superior al Display XL documentado) y los colores literales del hero que ya señalaba QA se conservan fuera de alcance. No se afirma conformidad global del sitio. No hay excepciones nuevas solicitadas ni migración de diseño.

## Límites y archivos

Esta es autocomprobación de desarrollo, no una aprobación independiente de QA. No se probó Safari/iPhone ni Android físicos, ni se midieron usuarios reales, LCP, cabeceras publicadas o ahorro de transferencia de una visita concreta. El ahorro informado corresponde a la suma de bytes de los siete archivos. Pausar no acredita cancelar las descargas: la precarga existente se conserva. No se despliega ni se modifica Firebase, el título/LCP, los formularios o el resto de recursos.

Archivos del encargo: siete `public/media/lurems-*-v2.mp4` sustituyen los siete MP4 sin versión; `src/components/HeroVideo.vue` referencia `v2`; `scripts/optimize-hero-videos.py` permite repetir el procesamiento; este informe y `hero-video-v2-manifest.json` documentan resultados y hashes; `public/media/README.md` conserva fuentes/licencias con los nombres activos; `CONTEXTO_PROYECTO.md` registra el estado local. `AGENTS.md` y `.ai/` son cambios ajenos.
