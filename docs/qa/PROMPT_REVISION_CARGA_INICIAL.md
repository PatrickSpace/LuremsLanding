Elijo para este chat el rol de QA y auditoría.

Quiero una revisión independiente de la optimización de carga inicial de la web pública de Lurems, ya publicada por autorización del fundador. Revisa y documenta; no implementes correcciones ni vuelvas a desplegar. No crees ni contactes otros chats o subagentes.

Proyecto local:
/Users/patricklostaunau/Developer/Proyectos/PsicoSaaS/LuremsLanding

Repositorio: https://github.com/PatrickSpace/LuremsLanding
Web: https://lurems.lat/
Hosting alternativo: https://luremslanding.web.app/
Firebase de esta web: proyecto y sitio luremslanding. No actuar sobre la app ni el proyecto psicosaas-3c819.

Lee AGENTS.md y toda la documentación obligatoria del rol, CONTEXTO_PROYECTO.md y SISTEMA_DISENO.md. Conserva los cambios locales ajenos. Si el checkout remoto no contiene las instrucciones locales de .ai/, no las inventes: utiliza la copia local indicada o informa el faltante antes del trabajo dependiente. Este prompt constituye selección expresa del rol QA; no cambies de especialidad.

## Versión y fuentes

1. Registra commit local/remoto, estado de Git, fecha, URLs, entorno y navegador antes de auditar. La implementación se publicó después del commit base 5a699cff27c32e17df5f5048f4eff2b99746006a; identifica el commit de optimización y revisa ese diff. No presupongas que HEAD o la web siguen en esa versión: compara los assets publicados con el build auditado.
2. Lee:
   - docs/performance/INITIAL_LOADING_OPTIMIZATION.md
   - docs/performance/loading-measurements.json
   - docs/media/HERO_VIDEO_OPTIMIZATION.md
   - docs/media/hero-video-v2-manifest.json
   - scripts/measure-initial-loading.js
   - src/components/HeroVideo.vue
   - src/components/WaitlistForm.vue
   - src/components/WaitlistModal.vue
   - src/services/firebase.js
   - src/services/analytics.js
   - src/services/leads.js
   - src/services/lead-validation.js
   - src/App.vue, src/router.js, src/pages/Home.vue
   - package.json, firestore.rules y firebase.json en lectura.
3. Evidencia local adicional, ignorada por Git: output/playwright/loading-2026-11-04/ y output/playwright/video-optimization-2026-11-04/. Allí están scripts, fixtures/mocks, reconstrucción de la base y resultados. output/playwright/lurems-audit-2026-11-04/REPORTE_OPTIMIZACION.md es el diagnóstico anterior, no prueba de la versión actual. Si no están disponibles, declara la ausencia y genera evidencia propia.

## Resultado esperado y alcance

La entrada mantiene la UI completa del formulario y Analytics. Zod se importa al enviar; Firestore completo y el servicio de escritura, solo después de validar. La app base de Firebase no inicializa la base de datos. El bloqueo de duplicados empieza antes de las importaciones y aplica a los dos formularios. Analytics conserva sus cuatro hosts permitidos; el router emite page_view y el SDK recibe send_page_view:false para evitar su evento automático adicional.

El hero conserva dos elementos de video y siete MP4 v2, H.264 1280 × 720, sin audio, con metadatos al inicio. Suman 8.695.987 bytes. Secuencia: solo → triste → agotado → abrumado → estresado → perdido → incomprendido → solo. El primer clip se solicita al reproducir; el siguiente recibe su URL 3.000 ms después del primer fotograma del activo, con 2 s nominales de preparación. Luego se prepara la próxima escena al terminar el fundido. Se conservan ~5 s por escena, fundido de 600 ms, encuadres y filtros, espera de reproducción/primer fotograma, bucle de espera, timeout de 10 s y reintentos de 2 s.

No están incluidos rediseño, cambios de copy, LCP del título animado, nueva compresión, nuevos posters, fuentes, logos, Hosting, caché, dominios, reglas o eventos comerciales. Distingue las diferencias visuales preexistentes de cualquier regresión introducida.

## Verificaciones

### 1. Build, red y mediciones equivalentes

- Ejecuta npm run build y registra minificado, gzip estimado y chunks reales. Comprueba en Network qué se descarga y ejecuta al abrir la portada sin interacción: separar archivos no basta si se precargan igualmente.
- Repite tiempos de 3, 10 y 20 s desde navegación; incluye transferencias en curso cuando sea posible. Separa payload, transferencia real comprimida y estimaciones del build.
- Protocolo anterior: Chromium 156.0.8078.73, 1440 × 900, DPR 1, CPU 1×, caché deshabilitada, contexto nuevo, 20 s sin interacción. Tres repeticiones por build/perfil. Perfil lento: bajada 128 KiB/s, subida 64 KiB/s, latencia 300 ms. Recursos externos bloqueados simétricamente solo para medir; capturas visuales separadas con las fuentes normales. Cambios de protocolo deben quedar explícitos.
- Script: sirve la base en localhost:4176 y el candidato en localhost:4173. No sobrescribas servidores ajenos. La base comparable usa los mismos siete videos v2, la precarga anterior y los servicios/formulario de 5a699cf. Puede reconstruirse fuera del árbol de trabajo desde ese commit, aplicando únicamente las referencias v2 del hero. No compares directamente con los videos originales de 29,84 MB ni sustituyas el checkout compartido para hacer la comparación.
- Referencias a contrastar, no resultados de QA asumidos: JS inicial 665,57 → 198,24 kB minificado y 208,78 → 71,66 kB gzip estimado. Transferencia real JS 209.307 → 72.078 bytes. Video sin limitar a 3 s: 1.345.475 → 494.123 bytes; a 10/20 s: 2.462.070/4.533.355 bytes en ambas versiones.
- En red lenta el candidato recibió más video a 10/20 s porque arrancó antes: no lo presentes como ahorro ni como regresión por sí solo. Comprueba tiempos y continuidad. La medición del inicio anterior usa currentTime >0.05 como aproximación; no es LCP ni timestamp exacto del compositor.
- Comprueba hashes MP4 contra el manifiesto, respuestas por rangos y ausencia de medios originales/respaldo dentro del artefacto publicado.

### 2. Hero y accesibilidad

En 1440 × 900, 390 × 844 y 375 × 812:
- Ciclo completo con las siete transiciones, palabra/fondo sincronizados, encuadres, nitidez, primer fotograma y ausencia de pantallas negras o destellos.
- Dos videos reutilizados, fundido de 600 ms y ausencia de desbordamiento.
- Pausa manual, salida de pantalla, retorno y respeto de la pausa manual; reanudación y limpieza de temporizadores.
- Pestaña realmente oculta/restaurada. Desarrollo solo certificó el manejador mediante document.hidden/visibilitychange controlados: intenta cerrar esa brecha con un navegador que exponga el estado nativo. Si no puedes, distingue simulación de prueba real.
- Cero solicitudes MP4 con movimiento reducido antes de la reproducción voluntaria; comprobar también el cambio de preferencia en caliente.
- Teclado, foco visible y nombres accesibles de pausar/reproducir y CTA afectados.
- Red lenta y siguiente video retenido 21 s adicionales: la escena actual debe continuar en bucle hasta recuperar el siguiente, sin adelantar palabra/fondo ni mostrar una capa sin primer fotograma. Revisa visualmente el reinicio del bucle.
- Pausar antes de la precarga y durante una preparación pendiente: no deben producirse cambios tardíos de palabra/fondo. No afirmes cancelación de descargas ya iniciadas sin demostrarla en Network.

### 3. Formularios, errores y Analytics

Usa datos sintéticos con mocks o un entorno local de prueba. No crees leads ni envíes eventos de prueba a producción. No cambies los hosts permitidos para facilitar pruebas.

- Inline y modal: validación original de nombre/email/público/perfil, selección y limpieza del perfil al volver a paciente, preselección del CTA profesional, carga, éxito y cierre del modal, error de escritura y reintento.
- Envíos dobles durante la descarga fría de Zod/Firestore y durante escritura: una sola llamada por envío en curso y un generate_lead solo por éxito. Confirmar que un formulario no rompe el otro.
- Verificar que validaciones inválidas no inicializan Firestore y que el servicio mantiene campos, normalización, origen, pagePath y serverTimestamp coherentes con las reglas. No leer leads reales.
- Probar fallos de importación de chunks y pérdida/recuperación de conexión. La primera descarga de un módulo diferido necesita red; antes de tener el servicio disponible todavía no puede existir una escritura en la cola del SDK. Distingue ese caso de perder conexión después de cargar Firestore. Evalúa si el mensaje y la recuperación son adecuados, sin cambiar el producto para que pase la prueba.
- Eventos page_view, open_lead_form, select_user_type, lead_form_error y generate_lead: nombres, parámetros, orden y conteo; llamadas tempranas mientras la inicialización está pendiente; sin duplicados ni eventos de éxito en errores. Verifica que no se filtran nombre/email a Analytics.
- Desarrollo probó lógica y parámetros con SDK simulado, incluyendo isSupported demorado. No certificó entrega real a GA, configuración de conversiones o errores reales del backend. Intenta ampliar cobertura mediante SDK real con transporte interceptado o emulador, sin tráfico de prueba a producción; declara límites si no es viable.

### 4. Brand System y entrega

Completa la revisión de SISTEMA_DISENO.md: tokens, componentes, estados, teclado, movimiento reducido y escritorio/móvil. Consulta las pestañas pertinentes de la referencia oficial si necesitas apoyo visual. No hagas migraciones de diseño. Conserva diferencias preexistentes del H1 (peso 650, tamaño hasta 4,7 rem) y colores literales como antecedentes fuera de alcance; no certifican conformidad global.

Entrega un informe en docs/qa/ con:
- Versión y entornos auditados, evidencia local/publicada diferenciada y matriz de criterios: pasa/falla/no comprobado.
- Tabla de mediciones propias antes/después con condiciones y variabilidad; no reutilizar cifras de desarrollo como si fueran resultados independientes.
- Hallazgos priorizados con reproducción, esperado/observado, impacto, evidencia, archivo/línea cuando aplique y criterio de cierre para Desarrollo.
- Regresiones introducidas separadas de problemas preexistentes; límites de cobertura, especialmente ocultación nativa, SDK real, offline y navegadores/dispositivos no disponibles.
- Resultado del Brand System y recomendación de cierre o correcciones pendientes. No declares aprobación independiente de escenarios que no ejecutaste ni presentes un build como prueba de todos los recorridos.

No realices correcciones del producto, commits, push, despliegues, cambios de reglas o comunicaciones con otros chats como efecto secundario de esta revisión. El usuario decidirá esos pasos después del informe.
