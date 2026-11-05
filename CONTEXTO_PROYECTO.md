# Lurems: contexto de producto, tecnología y comunicación

Última revisión: 5 de noviembre de 2026.

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
| Validación y registro de leads mediante Cloud Function y Firestore (implementación local; sin desplegar) | Agenda, recordatorios y gestión de sesiones |
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
- Propuesta en desarrollo: conseguir nuevos pacientes, automatizar citas y recordatorios, gestionar cobros y compartir recursos personalizados. Estas funcionalidades todavía no están disponibles; no se presentan como capacidades operativas de la landing.
- Beneficio profesional: dedicar más atención a sus pacientes y preparar mejor los encuentros.
- Acción disponible: sumarse a la lista como psicólogo y seleccionar su perfil.

**Interpretación de posicionamiento:** Lurems combina una propuesta de conexión entre dos públicos con herramientas de gestión para profesionales. El enfoque comercial exacto, el modelo de ingresos y la prioridad entre ambos públicos todavía requieren definición; no asumir suscripciones, comisiones o un mercado geográfico específico.

## 3. Storytelling y voz de marca

### Relato que ya aparece en la landing

**Sección profesional aprobada (5 de noviembre de 2026):** `PsychologistsSection.vue` sustituye únicamente `#para-psicologos`, conforme a [la propuesta aprobada](./docs/prototipos/para-psicologos.html). Presenta «Más pacientes. Menos pendientes.», un párrafo de resumen y «Quiero sumarme como psicólogo», que abre el modal existente con «Psicólogo» preseleccionado. El panel derecho muestra «Tu consulta, organizada de principio a fin.», cuatro tarjetas literales y la aclaración de desarrollo. Se elimina la lista de beneficios y las seis tarjetas anteriores. En escritorio hay dos columnas y en móvil el resumen precede al panel; acción morada `#6358B8` con texto blanco, Poppins y Lucide de trazo 1,5. Publicada de forma aislada el 5 de noviembre de 2026 en `lurems.lat`, versión Hosting `614b097a459f9717`, conservando el resto de la versión publicada anterior. Los otros cambios locales descritos en este documento no entraron en ese despliegue. Evidencia: [entrega de la sección profesional](./docs/VERIFICACION_PARA_PSICOLOGOS.md).

**Copy aprobado de continuidad (5 de noviembre de 2026):** las cuatro tarjetas comunican «Registra lo importante», «Consulta tus recursos», «Avanza a tu ritmo» y «Lleva tu diario emocional», con descripciones breves aprobadas por el fundador. Se conserva la composición compacta, los iconos y el CTA existentes. Son parte de la propuesta en desarrollo, no herramientas disponibles en esta landing.

**Ajuste visual posterior autorizado:** la sección de continuidad (`#continuidad`) se compactó manteniendo sus textos y cuatro iconos: título de 28/36 px, tarjetas con icono lateral en cuadrícula 2 × 2 desde tablet, y texto/CTA junto a las tarjetas desde escritorio. Incluye «Solicitar acceso temprano», enlace a `#waitlist-section`, de 64 px de alto y ancho completo en móvil. No modifica el formulario ni sus eventos. Este ajuste sustituye la restricción de solo texto únicamente para esa sección, conforme al nuevo encargo del fundador.

**Actualización de copy (4 de noviembre de 2026):** se aplicaron los mensajes de [la propuesta de acceso temprano](./docs/prototipos/storytelling-acceso-temprano.html) dentro de los bloques gráficos existentes, por indicación del fundador de cambiar solo textos. Se conservan hero, iconos, colores, tipografía, clases, tarjetas, orden y comportamiento. El bloque de beneficios comunica continuidad con pausas y cambios; las tarjetas de validación comunicaban el estado del desarrollo y las condiciones de apuntarse; se sustituyeron localmente por el bloque compacto aprobado de «Dónde estamos hoy» el 5 de noviembre. En esa actualización se conservaron seis tarjetas profesionales; la sección fue sustituida después por la propuesta específica aprobada del 5 de noviembre, descrita a continuación. En esa etapa se mantuvieron cinco filas de FAQ; el 5 de noviembre se sustituyeron localmente por las siete preguntas aprobadas por el fundador.

1. **Reconocimiento emocional:** «¿Te sientes solo?».
2. **Permiso para actuar:** «Pedir ayuda no tiene nada de malo».
3. **Problema concreto:** buscar atención puede resultar confuso por la información dispersa.
4. **Guía:** Lurems organiza necesidades y preferencias para facilitar el siguiente paso.
5. **Camino previsto:** dar espacio a lo que buscas → conocer tus opciones → organizar tus encuentros → conservar lo trabajado.
6. **Horizonte:** más claridad para la persona y más contexto para el profesional.
7. **Invitación actual:** apuntarse para recibir un aviso cuando abra el acceso, sin crear cuenta, reservar sesión ni garantizar un cupo.

**Lectura narrativa:** la persona y el profesional protagonizan el cambio; Lurems desempeña el papel de guía. La metáfora del camino y el faro de los recursos de marca refuerzan orientación, esperanza y continuidad. La portada actual prueba una secuencia de videos ilustrativos de introspección, cansancio y tensión cotidiana. Esta lectura deriva del texto y de la descripción del recurso visual; no implica una historia fundacional confirmada.

### Criterios editoriales derivados de la propuesta

- Escribir en español cercano, claro, empático y sin juicio; los textos actuales usan «tú».
- Reconocer dificultades sin diagnosticar al visitante ni explotar su vulnerabilidad.
- Hablar de orientación, organización y acompañamiento; evitar promesas de curación o resultados garantizados.
- Explicar la IA como apoyo al profesional, sin atribuirle autonomía clínica.
- Mantener visible el estado «en desarrollo» y presentar las herramientas futuras como previstas.
- No inventar testimonios, cantidades de usuarios, resultados, certificaciones o profesionales ya verificados.
- La web declara que Lurems no reemplaza atención profesional, diagnóstico clínico ni servicios de emergencia.

**FAQ aprobadas — cambio local (5 de noviembre de 2026):** siete preguntas literales en `src/data/site.js`, en este orden: orientación para encontrar un psicólogo, elección del profesional, IA como apoyo, tarifa de sesiones, gratuidad del registro, datos solicitados y pasos posteriores. Se conservan `#preguntas`, el diseño y el funcionamiento del acordeón. Herramientas futuras, sin presentarlas como disponibles hoy. No se publicó ni desplegó esta actualización.

**Decisión del fundador sobre tarifas:** cada terapeuta tendrá una tarifa diferenciada y el precio de las sesiones variará según el profesional elegido. Es independiente de la gratuidad de apuntarse a la lista; los precios de la plataforma se comunicarán antes de habilitarla. No se deducen importes, comisiones, suscripciones ni quién determina las tarifas. La referencia previa a precios sin definir no establecía tarifas uniformes ni importes y sigue siendo válida para los valores concretos pendientes.

### Mensajes centrales para mantener consistencia

| Contexto | Mensaje de referencia |
| --- | --- |
| Marca | Claridad en tu camino terapéutico |
| Pacientes | Encontrar orientación para elegir y continuar tu terapia |
| Psicólogos | Captar pacientes y organizar la práctica para concentrarse en la atención |
| Etapa actual | Estamos desarrollando la plataforma; puedes solicitar acceso temprano |
| Conversión | Quiero recibir el aviso / Quiero recibir novedades como psicólogo |

Las formulaciones de esta tabla sintetizan el contenido; no son todas citas literales.

## 4. Marketing digital y conversión

### Embudo implementado

**«Dónde estamos hoy» — implementado y publicado (5 de noviembre de 2026):** `DevelopmentStatusSection.vue` sustituye las cuatro tarjetas por el bloque compacto aprobado en `docs/prototipos/donde-estamos-hoy.html`: «Estamos desarrollando Lurems.», explicación de la lista gratuita, aviso de apertura y nota sin fecha de lanzamiento. El CTA «Quiero recibir el aviso» abre el modal general mediante el evento existente sin imponer un tipo; `App.vue` conserva su selección predeterminada de paciente y permite cambiar de público. La fila inferior incorpora correo y WhatsApp visibles con enlaces `mailto:` y `wa.me`, sin envío automático de mensajes. Texto/CTA en dos columnas desde 1280 px y contactos debajo; en móvil se apilan con CTA de ancho completo. Se retiraron `validationGoals` y su import porque solo alimentaban las tarjetas eliminadas. El fundador autorizó después su publicación en GitHub y Firebase. Publicada únicamente esta sección sobre la base profesional existente: Hosting `e90e8093f4316e48` (06:04:40 UTC), sin Functions, reglas ni trabajo local ajeno. Diez recorridos aprobados sobre el dominio publicado; sin leads ni mensajes enviados.

Visita → identificación con el problema → comprensión de la propuesta → elección de público → registro → confirmación de que se notificará la disponibilidad.

La adquisición de tráfico y la campaña futura de apertura no están implementadas. Se añadió la confirmación automática del registro anticipado mediante una cola privada y Gmail SMTP en Functions: está implementada y probada localmente, pero falta el secreto real y no se desplegó. Registrar un interesado no crea una cuenta ni reserva una sesión. Plantillas nuevas y operación: [correos de acceso temprano](./docs/email/README.md).

La página desarrolla el embudo mediante hero, accesos por público, problema/solución, explicación del recorrido, beneficios, sección profesional, estado actual del desarrollo, FAQ, lista de espera y cierre en el footer.

- CTA principal del hero: desplaza al formulario `#waitlist-section`.
- CTA secundario: lleva a `#como-funciona`.
- CTA profesional: abre el modal con «Psicólogo» preseleccionado.
- Navbar y footer: ofrecen entradas adicionales al modal.
- Formulario inline: origen `home-inline`; modal: origen `modal`.
- Confirmación: muestra «Ya estás en la lista», aviso por correo y aclaración de que no crea cuenta ni reserva sesión. Por el alcance de solo texto, se conserva el cierre automático existente del modal a los 1,4 segundos y la disposición existente del formulario en móvil; no se aplicó la reorganización del intento descartado.

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
- No se encontraron rutas de privacidad o términos ni automatización de bajas. La confirmación de registro por correo está implementada localmente y pendiente de activación; no hay campaña de apertura activa. Se retiró «Cancela cuando quieras» del formulario; ahora se explica el uso de los datos para el acceso temprano y conocer los perfiles interesados. No hay un mecanismo de baja implementado.
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
- Firebase SDK 12: inicialización, Functions callable y Analytics en navegador.
- Cloud Functions de la landing: Node 22, Firebase Admin 14 y Functions 7; Firestore solo desde servidor.
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
| `src/data/site.js` | Navegación, continuidad, datos profesionales previos y FAQ; retirado el arreglo exclusivo de las tarjetas de validación |
| `src/components/Navbar.vue` | Navegación fija, estado de scroll y menú móvil |
| `src/components/Footer.vue` | Cierre comercial, enlaces y avisos |
| `src/components/DevelopmentStatusSection.vue` | Estado de desarrollo, CTA general y contactos de correo/WhatsApp; publicado el 5 de noviembre de 2026 |
| `src/components/PsychologistsSection.vue` | Sección profesional aprobada, cuatro funcionalidades previstas y CTA al modal segmentado |
| `src/components/WaitlistForm.vue` | Público, perfil, validación, envío y confirmación |
| `src/components/WaitlistModal.vue` | Modal mediante Teleport y transición |
| `src/services/firebase.js` | Configuración e inicialización de la app base, sin Firestore |
| `src/services/leads.js` | Carga diferida del cliente de Functions; invoca `submitLead` sin acceso directo a Firestore |
| `src/services/lead-validation.js` | Esquema Zod cargado al enviar; normaliza el correo antes de validarlo |
| `src/services/lead-errors.js` | Mensajes de duplicado por contrato explícito; errores técnicos diferenciados |
| `functions/src/` | Callable `submitLead`, validación del servidor y registro atómico con índice privado |
| `functions/src/emails/` | Plantillas nuevas por tipo, transporte Gmail y worker con control de intentos |
| `docs/email/` | HTML, TXT, metadatos y vistas previas del registro anticipado; configuración y evidencia |
| `src/services/analytics.js` | Analytics condicionado al host, con inicialización compartida y eventos que no bloquean la web |
| `src/index.css` | Tokens, fuentes, utilidades, animaciones y reducción de movimiento |
| `public/brand/` | Logos, isotipos e imágenes del hero |
| `index.html` | Punto de entrada, metadatos, fuentes externas y datos estructurados |
| `firebase.json`, `firestore.rules` | Hosting, caché, rewrite SPA y permisos de datos |

El copy no está completamente centralizado: parte vive en `site.js` y parte en `Home.vue` y los componentes. `site.js` también exporta `steps`, pero la página usa su propio arreglo `flowSteps`.

### Flujo de datos del lead

`WaitlistForm.vue` → validación Zod normalizada → cliente Functions diferido → callable `submitLead` → validación del servidor → transacción Firestore → respuesta `created` → `generate_lead`, éxito y `submitted`. Un duplicado devuelve `already-exists` con tipos registrados; conserva el formulario abierto y editable, sin conversión ni `submitted`. La implementación local todavía no está desplegada.

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

Las reglas locales deniegan **todas** las lecturas y escrituras del cliente, incluidos `leads` y `leadRegistrations`. La callable valida las claves, nombre de 2–100 caracteres, correo normalizado de 5–254, origen `modal`/`home-inline`, ruta de 1–200 sin query/hash, tipo y perfil profesional. `createdAt` se genera en servidor; el cliente no puede asignarlo. Los usos actuales pasan origen explícito; el default `waitlist` del componente es rechazado por el servidor.

Inline y modal normalizan con `trim` y minúsculas antes de validar; el servidor lo repite antes de buscar y escribir. Los errores tienen nombre accesible, descripción y foco; permiten corregir correo o cambiar tipo conservando nombre y perfil. Enviar paciente fuerza perfil vacío, y agregar psicólogo exige una opción permitida.

La transacción usa un documento privado `leadRegistrations/{sha256(emailNormalizado)}` como punto de exclusión compartido por instancias y dispositivos. Guarda versión, tipos y fecha, sin correo ni nombre. Cada tipo conserva su propio documento `leads`, incluidos perfil profesional, nombre, origen y fecha; no se sobrescribe el tipo anterior.

Esa misma transacción crea un trabajo `leadEmails/{leadId}` para cada lead nuevo. `sendEarlyAccessEmail` se activa al crearlo, valida el destinatario desde el lead y envía una confirmación nueva para paciente o psicólogo: registro anticipado confirmado y aviso cuando la app esté lista. Los duplicados no crean trabajos y los registros históricos no reciben correos retroactivos. No se usaron plantillas de cuentas de la app.

El remitente Gmail autorizado se configura fuera de Git; la contraseña de aplicación usa el secreto `EARLY_ACCESS_SMTP_PASSWORD`, todavía sin configurar en nube. `sent` significa aceptación SMTP, no recepción en bandeja. Los fallos seguros admiten hasta cinco intentos; resultados inciertos tras iniciar SMTP quedan `needs_review` y no se reenvían automáticamente. En emuladores solo se capturan mensajes con datos sintéticos, sin SMTP real. No se desplegó ni envió correo real. El aviso futuro de apertura requiere decisión del fundador y su propio envío; este flujo no determina cuándo está lista la app.

Cuando aún no existe índice, la función lee solo `email`/`tipoUsuario` del histórico desde el servidor, normaliza para comparar y reconoce IDs aleatorios y variantes de mayúsculas/espacios. No modifica documentos antiguos ni requiere migración masiva. La lectura del histórico cuesta proporcionalmente a su tamaño hasta crear el índice mediante un registro válido; un fallo de lectura aborta sin registrar. Un índice inconsistente también se rechaza. No se añadieron CAPTCHA, App Check ni límite por visitante; CORS y un máximo de tres instancias no equivalen a protección completa contra automatización.

**Unicidad implementada localmente (4 de noviembre de 2026):** un registro por correo/tipo, con paciente y psicólogo permitidos por separado y los tres textos de duplicado aprobados. El fundador autorizó usar Functions en este chat después del [encargo inicial](./docs/ENCARGO_DEDUPLICACION_ACCESO_TEMPRANO.md). Las pruebas de integración usan emuladores del proyecto aislado `demo-luremslanding`. No se consultaron leads reales, migró producción ni desplegó la función/reglas/hosting. Contrato, operación y transición: [Functions de acceso temprano](./docs/ACCESO_TEMPRANO_FUNCTIONS.md).

### Entorno y Analytics

El SDK recibe variables `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` y `VITE_FIREBASE_MEASUREMENT_ID`. Los nombres y la preparación se documentan en `README.md`; no copiar valores de `.env.local`.

Analytics solo se inicializa en producción para los hosts permitidos (`lurems.lat`, `www.lurems.lat` y los predeterminados del sitio). En desarrollo retorna `null`; sus fallos no bloquean la web. Cada evento espera una promesa compartida; Vue Router emite `page_view` y el SDK usa `send_page_view: false`. Los eventos del formulario no incluyen nombres ni correos.

Zod y el cliente Functions se descargan al enviar. El bloqueo de carga evita dobles envíos de la misma instancia; la transacción del servidor garantiza unicidad entre clientes. Ya no hay cola offline de Firestore en navegador. El servidor tiene timeout de 60 s y el cliente de 70 s; ante interrupción puede existir un resultado desconocido, por lo que no se muestra éxito. Reintentar no crea otro lead del mismo tipo: si el primero se confirmó, devuelve duplicado. No hay fallback a escritura directa. Con `VITE_USE_FIREBASE_EMULATORS=true` **solo en desarrollo**, la callable apunta a `127.0.0.1:5001`; las pruebas usan configuración sintética. Las [mediciones anteriores de carga](./docs/performance/INITIAL_LOADING_OPTIMIZATION.md) describen la versión previa con Firestore en cliente, no el flujo nuevo.

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

`vite.config.js` define alias `@` a `src`, salida `dist` y host `0.0.0.0` para desarrollo y preview. Ahora hay scripts `test` (validación/mensajes) y `test:integration` (Functions/Firestore con proyecto demo); no hay script de lint. `functions/package-lock.json` fija las dependencias del servidor.

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


## Publicación completa autorizada — 5 de noviembre de 2026

El fundador amplió expresamente el alcance a todos los cambios locales de esta landing, incluidas Functions y reglas. Build y ocho pruebas unitarias aprobados; veinte pruebas de integración en emuladores aprobadas al repetir la ejecución (el primer intento tuvo un fallo). SDK de producción, CLI, Hosting y reglas verificados en `luremslanding`; no se actúa sobre la app principal. Las reglas de cierre de acceso directo ya se publicaron. El envío Gmail sigue pendiente del secreto real `EARLY_ACCESS_SMTP_PASSWORD`, solicitado al fundador mediante el prompt seguro del CLI. No usar valores sintéticos en producción. La función de registro se publica de forma aislada con el mismo handler y dependencias, excluyendo únicamente el trigger de correo que exige ese secreto; se conserva la cola privada. El frontend se publica después de comprobar la callable. El historial anterior de verificaciones locales documenta su momento y no acredita recepción real de correos.


**Resultado de publicación completa:** Hosting `1ecad8cb45e8392d`, publicado `2026-11-05T16:11:05.681Z` en `https://lurems.lat/`; reglas Firestore publicadas y `submitLead` (Node 22, us-central1) activa. Solicitud vacía en producción rechazada con `INVALID_ARGUMENT`, sin escritura ni lead de prueba. Código completo publicado en GitHub (`7d72336`). `sendEarlyAccessEmail` todavía no se desplegó: falta `EARLY_ACCESS_SMTP_PASSWORD`; la CLI exige el secreto incluso al seleccionar solo registro desde el entry point completo, por lo que se usó un entry point de despliegue temporal que exporta únicamente el mismo handler `submitLead`. No se alteró el handler ni sus dependencias; se conserva la cola de correos sin procesador activo. El registro está disponible y el envío de confirmaciones no está activo. Imágenes de Functions con limpieza automática a los siete días. Se habilitaron las APIs necesarias del proyecto, sin actuar sobre la app principal.

Comprobación posterior: siete FAQ y modal real con selección profesional aprobados en Chromium sobre el dominio publicado a 375/390/1280/1440 px, sin enviar leads. Se eliminó del snapshot Git la pista de build de la antigua base aislada; ya no se necesita para la publicación completa.
