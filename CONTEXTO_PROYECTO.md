# Lurems: contexto de producto, tecnología y comunicación

Última revisión: 4 de noviembre de 2026.

Este documento se basa en el código y los textos de este repositorio. Describe la landing de presentación; no es una auditoría de la app principal ni del entorno publicado. Las interpretaciones de marketing y las propuestas futuras se identifican expresamente. Si el código cambia, revisar este contexto.

## 1. Qué es Lurems

Lurems es una plataforma en desarrollo para conectar pacientes y psicólogos y organizar el proceso terapéutico. La presentación combina orientación para quienes buscan atención con herramientas para la práctica profesional, especialmente de psicólogos independientes.

La idea que articula la marca es **«Claridad en tu camino terapéutico»**. El producto propuesto abarca el antes, el durante y el después de las sesiones: elegir un profesional, organizar encuentros y conservar contexto para dar continuidad al proceso.

El propósito inmediato de esta web es explicar la propuesta, validar necesidades y captar registros segmentados para acceso temprano. No hay fecha de lanzamiento ni precios de servicio definidos en el código. Unirse a la lista es gratuito.

### Estado real frente a visión del producto

| Disponible en este repositorio | Propuesta en desarrollo, sin implementación funcional aquí |
| --- | --- |
| Landing responsive, navegación por secciones y FAQ | Búsqueda y compatibilidad con profesionales |
| Formulario inline y modal de acceso temprano | Directorio de psicólogos verificados |
| Validación y almacenamiento de leads en Firestore | Agenda, recordatorios y gestión de sesiones |
| Segmentación paciente/psicólogo y perfil profesional | Cobranza automática y reportes financieros |
| Instrumentación de Analytics condicionada al entorno | Registros emocionales y recursos terapéuticos |
| Metadatos y recursos de marca | Historia clínica inteligente, resúmenes e IA de apoyo |

No existe aquí autenticación, panel de pacientes, panel profesional, procesamiento de pagos ni backend clínico. El repositorio no permite concluir cuánto se ha construido en otros proyectos.

## 2. Públicos y propuesta de valor

### Pacientes

La landing se dirige a personas que necesitan ayuda pero encuentran dispersión entre especialidades, enfoques, precios y horarios. También plantea la necesidad de mantener continuidad entre sesiones.

- Necesidad: entender qué buscan, elegir con más contexto y sostener el proceso.
- Propuesta: una ruta guiada para ordenar necesidades, encontrar opciones compatibles y conservar información relevante.
- Beneficio emocional: claridad, orientación y confianza para dar el primer paso.
- Acción disponible: solicitar acceso temprano como paciente.

### Psicólogos

El mensaje profesional destaca a los psicólogos independientes, aunque el formulario también acepta otros perfiles.

- Necesidad: captar pacientes alineados con su práctica y reducir la carga operativa de agenda, cobranza y seguimiento.
- Propuesta: reunir captación, organización y contexto del paciente en una experiencia apoyada por IA.
- Beneficio profesional: dedicar más atención a sus pacientes y preparar mejor los encuentros.
- Acción disponible: sumarse a la lista como psicólogo y seleccionar su perfil.

**Interpretación de posicionamiento:** Lurems combina una propuesta de conexión entre dos públicos con herramientas de gestión para profesionales. El enfoque comercial exacto, el modelo de ingresos y la prioridad entre ambos públicos todavía requieren definición; no asumir suscripciones, comisiones o un mercado geográfico específico.

## 3. Storytelling y voz de marca

### Relato que ya aparece en la landing

1. **Reconocimiento emocional:** «¿Te sientes solo?».
2. **Permiso para actuar:** «Pedir ayuda no tiene nada de malo».
3. **Problema concreto:** buscar atención puede resultar confuso por la información dispersa.
4. **Guía:** Lurems organiza necesidades y preferencias para facilitar el siguiente paso.
5. **Camino:** compartir la situación → entender una ruta → conectar con opciones compatibles → sostener el proceso.
6. **Horizonte:** más claridad para la persona y más contexto para el profesional.
7. **Invitación actual:** registrarse para recibir aviso cuando se abran cupos.

**Lectura narrativa:** la persona y el profesional protagonizan el cambio; Lurems desempeña el papel de guía. La metáfora del camino y el faro de los recursos de marca refuerzan orientación, esperanza y continuidad. La portada actual prueba una secuencia de videos ilustrativos de introspección, cansancio y tensión cotidiana. Esta lectura deriva del texto y de la descripción del recurso visual; no implica una historia fundacional confirmada.

### Criterios editoriales derivados de la propuesta

- Escribir en español cercano, claro, empático y sin juicio; los textos actuales usan «tú».
- Reconocer dificultades sin diagnosticar al visitante ni explotar su vulnerabilidad.
- Hablar de orientación, organización y acompañamiento; evitar promesas de curación o resultados garantizados.
- Explicar la IA como apoyo al profesional, sin atribuirle autonomía clínica.
- Mantener visible el estado «en desarrollo» y presentar las herramientas futuras como previstas.
- No inventar testimonios, cantidades de usuarios, resultados, certificaciones o profesionales ya verificados.
- La web declara que Lurems no reemplaza atención profesional, diagnóstico clínico ni servicios de emergencia.

### Mensajes centrales para mantener consistencia

| Contexto | Mensaje de referencia |
| --- | --- |
| Marca | Claridad en tu camino terapéutico |
| Pacientes | Encontrar orientación para elegir y continuar tu terapia |
| Psicólogos | Captar pacientes y organizar la práctica para concentrarse en la atención |
| Etapa actual | Estamos desarrollando la plataforma; puedes solicitar acceso temprano |
| Conversión | Solicitar acceso temprano / Quiero sumarme como psicólogo |

Las formulaciones de esta tabla sintetizan el contenido; no son todas citas literales.

## 4. Marketing digital y conversión

### Embudo implementado

Visita → identificación con el problema → comprensión de la propuesta → elección de público → registro → confirmación de que se notificará la disponibilidad.

La adquisición de tráfico y el envío posterior de comunicaciones no están implementados en este repositorio. Guardar un lead no envía por sí mismo un correo, no crea una cuenta y no reserva una sesión.

La página desarrolla el embudo mediante hero, accesos por público, problema/solución, explicación del recorrido, beneficios, sección profesional, objetivos de validación, FAQ, lista de espera y cierre en el footer.

- CTA principal del hero: desplaza al formulario `#waitlist-section`.
- CTA secundario: lleva a `#como-funciona`.
- CTA profesional: abre el modal con «Psicólogo» preseleccionado.
- Navbar y footer: ofrecen entradas adicionales al modal.
- Formulario inline: origen `home-inline`; modal: origen `modal`.
- Confirmación: muestra «¡Registrado!»; en el modal, se solicita el cierre tras 1,4 segundos.

### Medición existente

| Evento | Dónde se dispara / finalidad |
| --- | --- |
| `page_view` | Tras navegación de Vue Router; incluye ruta, URL y título |
| `open_lead_form` | Al abrir el modal desde `App.vue`; incluye tipo y ruta |
| `select_user_type` | Al seleccionar paciente o psicólogo en el formulario |
| `lead_form_error` | Errores de validación del formulario; incluye campos y origen |
| `generate_lead` | Después de guardar correctamente el lead en Firestore |

Límites: `open_lead_form` no mide la exposición al formulario inline; los errores de escritura en Firestore muestran un mensaje pero no tienen un evento específico. No hay captura explícita de UTM, atribución publicitaria, experimento A/B ni evento propio para cada CTA. La configuración de conversiones en la consola de Analytics no puede comprobarse desde estos archivos.

**Métricas propuestas, no reportes existentes:** conversión de visita a lead, distribución por público, proporción de perfiles profesionales, conversión por origen de formulario y abandono por errores. Para calcular tasas confiables se necesita definir la unidad de medición y comprobar la instrumentación; no hay cifras de resultados en el proyecto.

### SEO y distribución existentes

`index.html` define idioma español, título, descripción, canonical `https://lurems.lat/`, Open Graph, Twitter Card y JSON-LD de tipo `Organization`. `public/robots.txt` permite rastreo y apunta a `public/sitemap.xml`, que contiene la URL principal. Los perfiles sociales están enlazados en el código; su existencia o actividad no fue verificada.

La web es una SPA renderizada en cliente; no se observa SSR ni prerender. Microsoft Clarity figura como ejemplo comentado, sin ejecución activa.

### Tensiones a considerar en próximos cambios

- El hero aborda primero a pacientes; la sección profesional plantea una propuesta operativa distinta. Los cambios deben indicar a qué público sirven.
- La portada con video muestra «En desarrollo · Acceso temprano» y no presenta señales de funciones ya disponibles. Mantener la misma precisión temporal al hablar del directorio y de herramientas previstas en el resto de la landing.
- No se encontraron rutas de privacidad o términos, automatización de bajas ni envío de correos. El texto «Cancela cuando quieras» no demuestra que exista un mecanismo de baja.
- No asumir una política de privacidad o garantías de protección clínica solo por la presencia del texto «Mantenemos la privacidad de tus datos».

Estas observaciones provienen de la revisión del repositorio, no de una auditoría legal ni de investigación de mercado.

## 5. Arquitectura técnica

### Stack

- Vue 3 con Composition API y componentes `.vue` mediante `<script setup>`.
- JavaScript con módulos ES; no se observa TypeScript.
- Vite 7 como servidor y herramienta de build.
- Vue Router 4 con historial HTML5.
- Tailwind CSS 4 con plugin de Vite, Typography y `tw-animate-css`.
- `lucide-vue-next` para iconos.
- Zod 4 para validación del formulario.
- Firebase SDK 12: inicialización, Firestore y Analytics.
- Firebase Hosting para servir `dist`.

Los números indican las versiones mayores declaradas en `package.json`; `package-lock.json` fija la resolución instalada.

### Mapa del código

| Archivo / carpeta | Responsabilidad |
| --- | --- |
| `src/main.js` | Monta Vue, router y estilos globales |
| `src/App.vue` | Compone navbar, página, footer y estado del modal; mide apertura |
| `src/router.js` | Ruta `/`, redirección de desconocidas a `/`, scroll y page views |
| `src/pages/Home.vue` | Compone portada, contenido local, secciones y formulario inline |
| `src/components/HeroVideo.vue` | Portada con videos sincronizados con palabras, filtro y control de pausa |
| `src/data/site.js` | Navegación, beneficios, beneficios profesionales, objetivos y FAQ |
| `src/components/Navbar.vue` | Navegación fija, estado de scroll y menú móvil |
| `src/components/Footer.vue` | Cierre comercial, enlaces y avisos |
| `src/components/WaitlistForm.vue` | Público, perfil, validación, envío y confirmación |
| `src/components/WaitlistModal.vue` | Modal mediante Teleport y transición |
| `src/services/firebase.js` | Configuración e inicialización de la app base, sin Firestore |
| `src/services/leads.js` | Carga diferida tras validación, inicialización de Firestore completo, normalización y creación del lead |
| `src/services/lead-validation.js` | Esquema Zod original, cargado al enviar |
| `src/services/analytics.js` | Analytics condicionado al host, con inicialización compartida y eventos que no bloquean la web |
| `src/index.css` | Tokens, fuentes, utilidades, animaciones y reducción de movimiento |
| `public/brand/` | Logos, isotipos e imágenes del hero |
| `index.html` | Punto de entrada, metadatos, fuentes externas y datos estructurados |
| `firebase.json`, `firestore.rules` | Hosting, caché, rewrite SPA y permisos de datos |

El copy no está completamente centralizado: parte vive en `site.js` y parte en `Home.vue` y los componentes. `site.js` también exporta `steps`, pero la página usa su propio arreglo `flowSteps`.

### Flujo de datos del lead

`WaitlistForm.vue` (UI disponible desde el arranque) → importación de validación Zod al enviar → importación del servicio de escritura solo si es válido → `submitLead()` → documento nuevo en colección `leads` → evento `generate_lead` → estado visual de éxito.

| Campo persistido | Valor / tratamiento |
| --- | --- |
| `nombre` | Nombre con espacios extremos eliminados |
| `email` | Correo con espacios extremos eliminados y convertido a minúsculas |
| `tipoUsuario` | `Paciente` o `Psicólogo` |
| `perfilPsicologo` | Perfil seleccionado o cadena vacía para pacientes |
| `origenFormulario` | `modal` o `home-inline` en los puntos actuales de uso |
| `pagePath` | `window.location.pathname`, sin hash ni query |
| `createdAt` | `serverTimestamp()` de Firestore |

Perfiles profesionales permitidos: «Psicólogo clínico independiente», «Psicólogo clínico dependiente», «Psicólogo con otra especialidad» y «No soy psicólogo pero me interesa el proyecto».

Las reglas permiten únicamente crear leads con las claves y valores esperados; bloquean lectura, actualización, eliminación y acceso del cliente a otras colecciones. Exigen nombre de 2–100 caracteres, correo de 5–254, ruta de 1–200, perfil coherente con el tipo de usuario y timestamp del servidor.

Zod y Firestore no son idénticos: el formulario no impone todos los máximos de las reglas y valida antes de la normalización del servicio. Al cambiar campos o valores, revisar formulario, servicio y reglas juntos. El origen por defecto `waitlist` del componente/servicio no está permitido por las reglas; los usos actuales pasan explícitamente `modal` o `home-inline`.

La escritura usa `addDoc`; no se observa deduplicación de correos, CAPTCHA ni limitación de frecuencia en este repositorio. Las reglas de estructura no equivalen a protección completa contra registros automatizados.

### Entorno y Analytics

El SDK recibe variables `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` y `VITE_FIREBASE_MEASUREMENT_ID`. Los nombres y la preparación se documentan en `README.md`; no copiar valores de `.env.local`.

Analytics solo se inicializa en producción, cuando el navegador lo soporta y el host es `lurems.lat`, `www.lurems.lat`, `luremslanding.web.app` o `luremslanding.firebaseapp.com`. En desarrollo retorna `null`. Sus errores se absorben para no bloquear la experiencia. Analytics ya no inicializa Firestore. Cada llamada espera una única promesa compartida de inicialización; Vue Router emite `page_view` y el SDK se configura con `send_page_view: false` para evitar su evento automático adicional. La validación y Firestore completo se descargan al enviar; el bloqueo de duplicados comienza antes de esas importaciones. Se conserva Firestore completo por su cola/reintento de escrituras en memoria al perder conexión; no se habilita persistencia en disco. La primera descarga de los módulos diferidos requiere conexión; si falla, se muestra el estado de error antes de poder encolar una escritura. Detalles y mediciones locales: [optimización de carga inicial](./docs/performance/INITIAL_LOADING_OPTIMIZATION.md).

## 6. Diseño y experiencia

La referencia obligatoria para implementar y revisar diseño es [SISTEMA_DISENO.md](./SISTEMA_DISENO.md), basada en el [Lurems Brand System oficial](https://patrickspace.github.io/lurems-brand-system/). Consultar la web para apoyo visual y verificar la conformidad al terminar cada implementación. Los puntos siguientes describen la implementación observada; no sustituyen la especificación ni certifican su conformidad.

- Tipografía principal: Poppins, cargada desde Google Fonts.
- Primario: teal `#45A99A`; secundario profesional: violeta `#7B6FD0`.
- Fondo principal: `#F5FAFA`; texto principal: `#1A3A38`; acento esperanza: `#F2C94C`.
- Estilo: fondos claros, gradientes suaves, tarjetas, sombras y CTA redondeados.
- Existen variables `.dark`, pero no se observa un selector de tema en la UI.
- La portada utiliza `src/components/HeroVideo.vue`: siete videos locales 720p de personas en escenas cotidianas de introspección, cansancio, tensión y distancia interpersonal a pantalla completa (`min-height: 100svh`, `object-fit: cover`), filtro con degradado de verde a morado a 110°, afín al de «solo», y sombreado adicional detrás del texto blanco estático. La ilustración del faro se conserva como recurso, pero ya no se muestra en el hero.
- Los videos se reproducen sin audio, en bucle y con `playsinline`; solo se montan dos capas de video: la actual y la siguiente, con un fundido de 600 ms al cambiar de escena. La primera recibe su URL al reproducir; la siguiente se solicita 3 s después de confirmar el primer fotograma, con 2 s nominales de margen. Después de cada fundido se reutiliza la capa saliente para preparar la próxima escena. `preload="auto"` solo actúa en las capas a las que ya se asignó URL. El control de pausa detiene videos y palabras. Con movimiento reducido se muestra un poster sin cargar videos automáticamente. La secuencia también se pausa al salir de pantalla o al ocultar la pestaña. Fuente y licencia documentadas en `public/media/README.md`; es stock ilustrativo, sin testimonios ni atribuciones clínicas.
- Los siete MP4 activos usan nombres `lurems-<escena>-v2.mp4`, H.264 High 3.1, 1280 × 720 y metadatos al inicio. La optimización local del 4 de noviembre de 2026 redujo su suma de 29.843.395 a 8.695.987 bytes (70,86 %), conservando todos los fotogramas, la cadencia y las duraciones completas para no añadir cortes al esperar en bucle. En aquella optimización de archivos no cambiaron la precarga ni Firebase; la optimización posterior de carga inicial se documenta por separado. Parámetros, respaldo, hashes y comprobaciones: [optimización de videos](./docs/media/HERO_VIDEO_OPTIMIZATION.md). Estas cifras describen los archivos locales, no una medición del despliegue.
- La palabra dinámica (inicialmente «solo») conserva el gradiente de verde a morado, con tonos claros para mantener legibilidad sobre el video.
- La navegación se muestra en blanco sobre el video y recupera su fondo claro al hacer scroll. Los accesos por público aparecen después de la primera pantalla. Se conservan los CTA a la lista de espera y a cómo funciona.
- Hay estilos `:focus-visible` y `prefers-reduced-motion`. Esto no constituye una verificación completa de accesibilidad.

## 7. Desarrollo, validación y despliegue

```bash
npm install
npm run dev
npm run build
npm run preview
```

`vite.config.js` define alias `@` a `src`, salida `dist` y host `0.0.0.0` para desarrollo y preview. No hay scripts de tests o lint declarados en `package.json`.

Para cambios de interfaz, verificar build y comportamiento responsive, navegación por anchors, modal y estados del formulario según el alcance. Evitar enviar registros reales solo para comprobar apariencia. Para cambios en captura, revisar también las restricciones de Firestore.

Comandos de despliegue existentes en el README:

```bash
firebase deploy --only hosting
firebase deploy --only hosting,firestore:rules
```

El proyecto y sitio de Hosting documentados son `luremslanding`. Hosting sirve `dist`, reescribe rutas a `index.html`, evita caché en HTML y permite caché prolongada en assets versionados. Estos comandos publican cambios; no son necesarios para generar esta documentación.

## 8. Palabra dinámica de la portada

`src/components/HeroVideo.vue` comienza en «solo» y cambia cada 5 segundos, en bucle, en este orden confirmado: solo → triste → agotado → abrumado → estresado → perdido → incomprendido → solo. Se usa minúscula para mantener la frase «¿Te sientes …?».

La palabra conserva el gradiente verde a morado. El título usa dos líneas y reserva el ancho de «incomprendido?» para evitar saltos entre palabras. Las palabras usan un fundido breve y los clips se superponen con un fundido de 600 ms. Con movimiento reducido la secuencia queda estática hasta una reproducción solicitada por el visitante. El nombre accesible del título refleja la palabra actual sin anuncios `aria-live`. Los temporizadores se limpian al pausar y al desmontar el componente. Cada palabra tiene un video distinto: ventana (solo), persona abrazando un cojín (triste), hombre ante laptop (agotado), mujer ante laptop (abrumado), tensión en el rostro (estresado), persona junto al mar (perdido) y dos personas distanciadas (incomprendido). El ciclo nominal dura 35 segundos. Cada transición espera reproducción y un primer fotograma del siguiente clip antes de cambiar palabra y fondo juntos; con carga lenta se conserva la escena actual y se reintenta. Un timeout de 10 segundos evita esperas pendientes indefinidas, y pausar cancela la preparación. Las asociaciones de stock son ilustrativas; fuentes y licencias están en `public/media/README.md`. El resto del contenido y la promesa de acceso temprano se mantienen estáticos.

## 9. Información aún no confirmada

- Países de lanzamiento y criterios operativos de verificación profesional.
- Modelo de negocio, precios, fecha de lanzamiento y alcance del primer lanzamiento.
- Implementación real de la app fuera de este repositorio.
- Proveedores, límites y manejo de datos de futuras herramientas de IA.
- Políticas definitivas de privacidad, retención y consentimiento.
- Canales de adquisición activos, presupuesto, resultados y procesos de contacto de leads.

No convertir estas incógnitas en afirmaciones comerciales. Actualizar este documento cuando haya decisiones o evidencia en el proyecto.
