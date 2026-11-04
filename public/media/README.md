# Video de la portada

- Clip: **Date between two girl friends in a coffee shop**, Mixkit, ID 41813.
- Fuente: https://mixkit.co/free-stock-video/date-between-two-girl-friends-in-a-coffee-shop-41813/
- Archivo original 720p: https://assets.mixkit.co/videos/41813/41813-720.mp4
- Licencia indicada por la ficha al descargarlo: **Mixkit Stock Video Free License**, https://mixkit.co/license/#videoFree
- Poster: miniatura 720p del mismo clip.

Descargado el 3 de noviembre de 2026 para esta alternativa visual. Es material de stock ilustrativo: las personas no representan pacientes, profesionales ni usuarios de Lurems. No se usa como testimonio ni se les atribuye ninguna condición clínica.

Se sirve localmente, sin audio, con `object-fit: cover` y un filtro CSS con degradado verde a morado y sombreado para legibilidad. El componente `HeroVideo.vue` permite pausar y utiliza el poster sin cargar el video automáticamente cuando se solicita movimiento reducido. También pausa fuera de pantalla.

## Secuencia de emociones actual

Siete clips locales 720p de personas reales, sin audio. Las fichas indican **Mixkit Stock Video Free License** (https://mixkit.co/license/#videoFree):

| Archivo | Clip / fuente | Palabra |
| --- | --- | --- |
| `lurems-solo-v2.mp4` | [An upset young woman by the window, 32056](https://mixkit.co/free-stock-video/an-upset-young-woman-by-the-window-32056/) | solo |
| `lurems-triste-v2.mp4` | [Worried and sad woman hugging a cushion, 4513](https://mixkit.co/free-stock-video/worried-and-sad-woman-hugging-a-cushion-4513/) | triste |
| `lurems-agotado-v2.mp4` | [Stressed businessman rubs eyes while working on laptop, 5601](https://mixkit.co/free-stock-video/stressed-businessman-rubs-eyes-while-working-on-laptop-5601/) | agotado |
| `lurems-abrumado-v2.mp4` | [Young very frustrated woman in front of her computer, 25575](https://mixkit.co/free-stock-video/young-very-frustrated-woman-in-front-of-her-computer-25575/) | abrumado |
| `lurems-estresado-v2.mp4` | [Young stressed woman with headache, 25592](https://mixkit.co/free-stock-video/young-stressed-woman-with-headache-25592/) | estresado |
| `lurems-perdido-v2.mp4` | [Lonely and brooding man on the shore of a beach, 35889](https://mixkit.co/free-stock-video/lonely-and-brooding-man-on-the-shore-of-a-beach-35889/) | perdido |
| `lurems-incomprendido-v2.mp4` | [Annoyed man and woman back to back, 4737](https://mixkit.co/free-stock-video/annoyed-man-and-woman-back-to-back-4737/) | incomprendido |

Los posters son las miniaturas 720p de los mismos clips. Las descargas originales siguen el patrón `https://assets.mixkit.co/videos/ID/ID-720.mp4`. El clip de cafetería se conserva como recurso de la primera alternativa y ya no aparece en la portada.

El 4 de noviembre de 2026 se sustituyeron los siete MP4 por derivados H.264 a CRF 26, preset `slow`, sin recortar, escalar ni cambiar la cadencia. Suman **8.695.987 bytes**, frente a **29.843.395 bytes** de los originales: **70,86 % de ahorro**. Los posters no cambiaron. Antes de sustituirlos se copiaron y verificaron los originales en `output/video-optimization/2026-11-04/originals/`, fuera de `public` y `dist`. El [informe técnico](../../docs/media/HERO_VIDEO_OPTIMIZATION.md) incluye reproducción del procesamiento, comparación de perfiles, verificación y limitaciones; el [manifiesto](../../docs/media/hero-video-v2-manifest.json) conserva los hashes SHA-256 de ambas versiones. Reservar `v2` para estos bytes y cambiar la versión para futuras codificaciones.

Cada palabra permanece al menos 5 segundos (ciclo nominal: 35 segundos). Cada una tiene una escena distinta. Solo se montan dos elementos de video: escena actual y siguiente, con `preload="auto"`, para no mantener siete decodificadores abiertos. El cambio de palabra y de fondo espera a que la reproducción del siguiente clip comience y entregue un primer fotograma. Si la red tarda o falla, se conserva la escena actual y se reintenta; una espera se cancela tras 10 segundos y también al pausar la secuencia. Las escenas se superponen con un fundido de 600 ms al cambiar de clip. La pausa detiene palabras y videos, también fuera de pantalla y al ocultar la pestaña. Con movimiento reducido se presenta un poster estático, sin cargar videos hasta que la persona solicite reproducir la secuencia. La asociación de escenas a emociones es ilustrativa, sin atribuir estados clínicos a las personas filmadas.
