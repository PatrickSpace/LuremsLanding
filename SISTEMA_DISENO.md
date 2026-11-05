# Lurems: sistema de diseño para agentes

Fuente oficial: [Lurems Brand System](https://patrickspace.github.io/lurems-brand-system/).

Consulta realizada: 3 de noviembre de 2026, mediante la web renderizada y sus recursos públicos. La portada indica versión 1.1, estado «Aprobado», julio de 2026; la navegación todavía muestra v1.0. Este documento es una referencia local de implementación, no una nueva versión del sistema.

## 1. Uso obligatorio en este proyecto

Antes de comenzar cualquier tarea, leer este documento y [CONTEXTO_PROYECTO.md](./CONTEXTO_PROYECTO.md). Identificar qué reglas de diseño afecta el trabajo. Antes de implementar una interfaz, revisar también los tokens y componentes existentes en el repositorio.

Si se necesita apoyo visual para comprender una composición, variante, estado o recurso de marca, visitar el [Brand System](https://patrickspace.github.io/lurems-brand-system/) y abrir la sección correspondiente. Las secciones son pestañas: la portada por sí sola no muestra todas las especificaciones. Para pantallas completas, consultar también **14 — Applications** y **16 — Web Apps**.

Al terminar cada implementación, comprobar su conformidad con el Brand System usando la revisión de la sección 11 de este documento. Corregir las desviaciones introducidas antes de dar el trabajo por terminado. En cambios sin efecto visual, registrar que no se alteraron estilos, componentes, recursos ni comportamiento visible; no omitir la consideración del diseño.

### Autoridad y discrepancias

- Las instrucciones explícitas del usuario tienen prioridad. Una excepción autorizada debe quedar identificada en el resultado; no convertirla silenciosamente en una nueva regla general.
- La web es la referencia oficial; este Markdown permite trabajar con sus reglas dentro del repositorio. Si la web cambia, actualizar aquí los valores y anotar la revisión.
- Usar las secciones **03 — Variables** y **15 — Design Tokens** para los valores nominales; **04 — Color System** para las escalas y semántica; las secciones específicas para el uso de componentes, logos y patrones.
- No asumir que una clase CSS existente cumple el sistema solo por estar en el proyecto. Comparar su valor real con esta guía.
- Si la fuente es ambigua, aplicar el criterio documentado en la sección 10, conservar las decisiones existentes no relacionadas con la tarea y comunicar las discrepancias relevantes. No inventar aprobación ni afirmar conformidad completa sin comprobarla.
- Los ejemplos de producto son referencias de composición, no evidencia de funciones disponibles, precios, testimonios ni datos reales. El estado del producto lo define el contexto del proyecto.

## 2. Identidad, marca y recursos

La promesa visual y verbal es **«Claridad en tu camino terapéutico»**. El faro representa orientación y claridad; el camino fluido representa un proceso con altibajos que avanza. La identidad debe conservar esa continuidad entre materiales y pantallas.

Reglas de las secciones **02 — Brand Identity**, **06 — Logo System** y **13 — Patterns**:

- Usar el logo principal sobre fondos claros y la variante negativa sobre fondos oscuros. La variante monocromática corresponde a usos técnicos o de una sola tinta.
- Reutilizar los archivos oficiales del proyecto en `public/brand/`; no dibujar un nuevo faro, reconstruir el logo ni sustituirlo por un icono parecido.
- Mantener las proporciones y la zona de seguridad, definida por la altura del ojo del faro. Preservar el tagline en el logo principal; usar la variante oficial adecuada cuando se necesite un formato reducido.
- No escalar asimétricamente, recolorear el isotipo, rotar o modificar el faro, añadirle efectos/sombras/filtros ni colocarlo sobre fondos sin contraste suficiente.
- La web muestra variantes principal, monocromática, negativa, isotipo y mini. Elegir según tamaño y fondo; comprobar visualmente las variantes responsive de ≥1280 px, ≥768 px y <768 px.
- El isotipo tiene ejemplos de app icon de 96 y 64 px y tamaños de 48, 32 y 16 px. Conservar su legibilidad a tamaño real.
- El haz cálido horizontal bajo la URL es un patrón permitido: crece desde la izquierda y remite a la luz del faro. Es una opción de marca, no un efecto obligatorio en cada enlace.

## 3. Color: valores y significado

Valores nominales de **Variables / Design Tokens**:

| Token | Valor | Aplicación |
| --- | --- | --- |
| `color.brand.primary` | `#45A99A` | Marca general y acciones de marca |
| `color.brand.secondary` | `#5BBDAD` | Variante secundaria del teal en el JSON de tokens |
| `color.brand.dark` | `#1A3A38` | Variante oscura y texto principal |
| `color.brand.light` | `#A0E0D8` | Variante clara |
| `color.brand.subtle` | `#EFF9F7` | Fondo sutil de marca |
| `color.patient.primary` | `#4CAF88` | Acciones y experiencia del paciente |
| `color.patient.light` | `#CBF1E0` | Superficies de paciente |
| `color.patient.dark` | `#1F5442` | Variante oscura de paciente |
| `color.psychologist.primary` | `#7B6FD0` | Acciones y experiencia profesional |
| `color.psychologist.light` | `#DDD9FF` | Superficies profesionales |
| `color.psychologist.dark` | `#383188` | Variante oscura profesional |
| `color.hope.primary` | `#F2C94C` | Luz del faro, logros y celebración |
| `color.hope.light` | `#FEF3C7` | Superficies de esperanza |
| `color.hope.dark` | `#A37C08` | Variante oscura de esperanza |

**Color por rol:** teal para marca, verde para paciente, morado para psicólogo. Mantener la semántica de cada rol dentro de su flujo; una página con ambos públicos puede mostrar ambos colores en sus áreas correspondientes. El ámbar se usa con moderación para momentos positivos.

Valores semánticos de **04 — Color System**, contrastados con las escalas de su implementación pública:

| Token | Valor |
| --- | --- |
| `color.background` | `#F5FAFA` |
| `color.surface` | `#FFFFFF` |
| `color.text.primary` | `#1A3A38` |
| `color.text.muted` | `#5A8480` |
| `color.border` | `#C8EDE8` |
| `color.success` | `#4CAF88` |
| `color.warning` | `#F2C94C` |
| `color.error` | `#E05454` |
| `color.info` | `#8E80E0` |

Escalas oficiales de **Color System**; las columnas indican el nivel, no el rol:

| Familia | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Teal | `#EFF9F7` | `#C8EDE8` | `#A0E0D8` | `#72CBBF` | `#5BBDAD` | `#45A99A` | `#35897C` | `#2A6C63` | `#1F504A` | `#1A3A38` |
| Verde | `#EDFAF4` | `#CBF1E0` | `#A0E4C8` | `#70D4AB` | `#52C496` | `#4CAF88` | `#3A9070` | `#2D725A` | `#1F5442` | `#143A2E` |
| Morado | `#F0EEFF` | `#DDD9FF` | `#C0BAFF` | `#A098F0` | `#8E80E0` | `#7B6FD0` | `#6358B8` | `#4D44A0` | `#383188` | `#272170` |
| Ámbar | `#FFFBEB` | `#FEF3C7` | `#FDE68A` | `#F9D64E` | `#F2C94C` | `#E6B82A` | `#C99A10` | `#A37C08` | `#7D5E05` | `#574103` |
| Neutral | `#F5FAFA` | `#E8F4F2` | `#C8DFDC` | `#A0C5C0` | `#7BADA8` | `#5A8480` | `#426460` | `#2E4A47` | `#1F3432` | `#12211F` |

Usar tokens semánticos centralizados en lugar de repetir valores literales en componentes. Los colores de rol no garantizan por sí solos contraste suficiente: comprobar cada combinación de texto, superficie, borde y estado.

## 4. Tipografía

**05 — Typography:** Poppins es la familia de interfaz y marca. Pesos mostrados: 300, 400, 500, 600, 700 y 800. DM Mono se reserva para código y tokens, con pesos 300, 400 y 500; no usarla como sustituto decorativo de Poppins en la UI.

| Estilo | Tamaño | Peso | Interlineado | Uso |
| --- | --- | --- | --- | --- |
| Display XL | 56 px | 800 | 1.1 | Hero principal de landing |
| Display L | 44 px | 700 | 1.15 | Hero y portadas |
| Display M | 36 px | 700 | 1.2 | Módulos destacados |
| H1 | 28 px | 700 | 1.25 | Título principal de página |
| H2 | 22 px | 600 | 1.3 | Títulos de sección |
| H3 | 18 px | 600 | 1.35 | Subtítulos y tarjetas |
| H4 | 16 px | 600 | 1.4 | Encabezados de sección |
| Body XL | 18 px | 400 | 1.7 | Introducción y destacados |
| Body L | 16 px | 400 | 1.65 | Cuerpo principal |
| Body M | 14 px | 400 | 1.6 | UI y texto secundario |
| Body S | 12 px | 400 | 1.5 | Metadatos |
| Caption | 11 px | 500 | 1.4 | Microcopy y etiquetas |
| Button | 14 px | 600 | 1 | Acciones |
| Label | 12 px | 600 | 1.4 | Etiquetas de formulario y categorías |

Los nombres de estilo visual no obligan a usar una etiqueta HTML del mismo nombre: un hero Display XL puede ser el `h1`. Conservar la jerarquía semántica y adaptar el tamaño a pantallas pequeñas usando la escala documentada, sin recortes ni saltos de diseño.

## 5. Iconografía

**07 — Iconography:** Lucide, estilo outline, canvas base de 24 × 24 px, trazo de 1.5 px, esquinas de 2 px y margen interno de 2 px. La guía muestra escalas a 16 y 32 px; los iconos sólidos se reservan para énfasis.

En Vue, reutilizar `lucide-vue-next`. Verificar el trazo explícitamente: instalar Lucide no garantiza que su valor por defecto sea el oficial. Mantener tamaño, alineación y tratamiento consistentes entre iconos equivalentes. Los iconos funcionales necesitan un nombre accesible; los decorativos no deben duplicar el texto.

## 6. Grilla y espaciado

**08 — Grid:** gutter de 8 px en las cuatro grillas de ejemplo.

| Grilla ilustrada | Columnas | Margen lateral |
| --- | --- | --- |
| Desktop, 1440 px | 12 | 80 px |
| Laptop, 1280 px | 12 | 48 px |
| Tablet, 768 px | 8 | 32 px |
| Mobile, 375 px | 4 | 16 px |

La tabla de breakpoints de esa misma sección indica:

| Nombre | Inicio | Comportamiento descrito |
| --- | --- | --- |
| xs | <375 px | Versión simplificada para móviles pequeños |
| sm | 375 px | 4 columnas; margen de 16 px |
| md | 768 px | 8 columnas; margen de 32 px |
| lg | 1024 px | 12 columnas; margen de 48 px |
| xl | 1280 px | 12 columnas; margen de 64 px |
| 2xl | 1440 px | 12 columnas; margen de 80 px |

La diferencia de margen para 1280 px se documenta en la sección 10. Estos nombres no equivalen automáticamente a los breakpoints predeterminados de Tailwind: comprobar la configuración y el CSS generado antes de usarlos.

**09 — Spacing:** base de 4 px; escala: **4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80 y 96 px**. Usar esta escala para padding, gaps y separación entre secciones. No interpretar las unidades ilustrativas de la web como equivalencias CSS de `rem`.

## 7. Radios y elevación

**11 — Border Radius:**

| Token | Valor | Uso recomendado |
| --- | --- | --- |
| `radius.xs` | 2 px | Chips internos y divisores pequeños |
| `radius.s` | 4 px | Badges y etiquetas compactas |
| `radius.m` | 8 px | Inputs, botones secundarios e items de menú |
| `radius.l` | 12 px | Tarjetas, modales y popovers |
| `radius.xl` | 20 px | Botones primarios y paneles destacados |
| `radius.2xl` | 32 px | App icons, hero cards e ilustraciones |
| `radius.full` | 9999 px | Avatares, badges circulares y pills |

**10 — Elevation:** sombras con el tinte del texto oscuro de marca; los valores completos de la sección dedicada son:

```css
/* Nombres de referencia; mapear a los tokens reales del proyecto. */
--lurems-shadow-xs: 0 1px 3px rgba(26,58,56,0.06), 0 1px 2px rgba(26,58,56,0.04);
--lurems-shadow-s: 0 2px 8px rgba(26,58,56,0.08), 0 1px 3px rgba(26,58,56,0.05);
--lurems-shadow-m: 0 4px 16px rgba(26,58,56,0.10), 0 2px 6px rgba(26,58,56,0.06);
--lurems-shadow-l: 0 8px 32px rgba(26,58,56,0.12), 0 4px 12px rgba(26,58,56,0.07);
--lurems-shadow-xl: 0 16px 56px rgba(26,58,56,0.16), 0 8px 24px rgba(26,58,56,0.08);
```

Usar elevación para expresar jerarquía, sin aplicar la sombra máxima a todos los elementos.

## 8. Componentes, patrones y aplicaciones

Consultar **12 — Components** para las referencias visuales de:

- Navbar y footer.
- Botones primario, secundario, ghost, paciente, psicólogo, esperanza y destructivo; tamaños grande, medio, pequeño y XS; estado deshabilitado.
- Inputs normales, con error y con éxito, acompañados de texto de ayuda.
- Tarjetas de sesión, progreso y recursos.
- Alertas de éxito, advertencia, error e información.
- Badges, chips, tags y avatares con estados de presencia.

Antes de crear un componente, buscar uno equivalente en el código. Reutilizar sus variantes si cumplen el sistema. Si falta un patrón, construirlo con los fundamentos documentados y comprobarlo visualmente frente a la web.

**14 — Applications** muestra landing desktop, dashboard móvil, tarjetas de presentación y formatos sociales 1:1, 9:16 y 16:9. **16 — Web Apps** añade perfiles, agendas, matching operativo, modal de actualización, exploración de profesionales, reagenda, diario emocional, pagos, ficha clínica, videollamada, notas, biblioteca y facturación. Son referencias para composición y jerarquía; no copiar sus personas, cifras, diagnósticos, precios ni acciones como datos reales.

## 9. Aplicación en este repositorio

- `src/index.css` contiene las variables de color, tipografía, radios, sombras, utilidades y movimiento. Revisar allí el valor real de cada token antes de reutilizarlo.
- `index.html` carga la tipografía y define metadatos y recursos de marca.
- `public/brand/` contiene logos e isotipos existentes.
- `src/components/` y `src/pages/Home.vue` contienen los patrones de interfaz; comprobar también componentes nuevos que aparezcan en futuras tareas.
- Mantener los nombres locales cuando sea posible y mapearlos al significado del Brand System. Por ejemplo, el `secondary` local es morado profesional; el ejemplo Vuetify de la web llama `secondary` al teal claro. No intercambiarlos por coincidencia de nombre.
- Los estilos actuales son implementación, no especificación. Esta documentación no certifica que toda la landing ya cumpla el sistema ni cambia automáticamente sus tokens.
- Un trabajo de interfaz debe resolver las desviaciones que introduce o que afectan directamente a su alcance. Registrar las diferencias preexistentes relevantes sin hacer una migración global ajena al pedido.

## 10. Diferencias de la fuente que no deben propagarse

1. **Versión:** portada 1.1; navegación v1.0. Registrar ambas al citar la revisión, sin asumir una versión posterior.
2. **Muestras de color:** los grandes swatches muestran tonos 400 en varias familias. Los primarios nominales son los de Variables / Design Tokens; no sustituir `#45A99A` por `#5BBDAD`, ni el verde/morado nominal por su tono 400 por leer solo la muestra.
3. **Espaciado:** la visualización dice, por ejemplo, «4px» y «1rem / 1u». Usar los valores en px del export de tokens. Con raíz de 16 px, 4 px equivalen a 0.25 rem, no a 1 rem.
4. **Grilla de 1280 px:** el ejemplo dibujado dice margen de 48 px; la tabla de breakpoints dice 64 px. Para nuevos layouts, criterio local: seguir la tabla de breakpoints (64 px en xl) salvo indicación explícita; identificarlo como decisión local, no como valor unívoco de la fuente. No alterar layouts existentes fuera del alcance.
5. **Sombras:** el JSON exportado contiene una sola capa, mientras Elevation incluye dos. Para nuevas sombras, usar los valores completos de Elevation documentados arriba; el nombre local no implica equivalencia de valor.
6. **Aliases:** `radius.m`/`radius.md`, `shadow.s`/`shadow.sm` y `color.psych.primary`/`color.psychologist.primary` aparecen como variantes de nombres. Verificar significado y valor; conservar un único mapeo coherente en el proyecto.
7. **Dominios y contenido ilustrativo:** algunos ejemplos conservan `lurems.com`; el dominio configurado en esta landing es `lurems.lat`. No copiar de una maqueta enlaces, años, correos o promesas de disponibilidad sin contrastarlos con el proyecto.

Si una discrepancia impide una decisión importante, comunicarla con la sección y el valor en conflicto. Si no se puede abrir la web, usar esta referencia local y declarar la limitación de cualquier comparación visual pendiente.

## 11. Revisión obligatoria al terminar cada implementación

Esta lista operacionaliza el pedido del usuario para los agentes; incluye comprobaciones de accesibilidad y del repositorio que complementan la referencia visual.

- [ ] Revisar el diff e identificar las reglas y componentes del Brand System afectados.
- [ ] Comprobar colores por rol, valores de tokens, tipografía, tamaños, interlineados, espaciado, grilla, radios, elevación e iconografía.
- [ ] Verificar variantes oficiales del logo, proporción, zona de seguridad y contraste cuando se toque la marca.
- [ ] Revisar en navegador la implementación visible en escritorio y móvil; comparar con las pestañas pertinentes de la web cuando se necesite apoyo visual o haya dudas. Verificar al menos 375/390 px y 1280/1440 px; añadir tablet o límites de breakpoint si el cambio afecta el layout.
- [ ] Revisar los estados afectados: normal, hover, foco, activo/seleccionado, deshabilitado, carga, error y éxito según corresponda. Comprobar navegación por teclado y nombres accesibles.
- [ ] Comprobar contraste, legibilidad, ausencia de desbordamiento y comportamiento con movimiento reducido si hay animación o video.
- [ ] Ejecutar `npm run build` cuando cambie código o estilos y las verificaciones funcionales pertinentes. No enviar leads reales solo para revisar apariencia.
- [ ] Corregir las desviaciones introducidas. Documentar excepciones autorizadas, discrepancias de la fuente o limitaciones pendientes sin afirmar una conformidad que no se verificó.
- [ ] Indicar en la entrega qué se revisó respecto al Brand System, el resultado y cualquier excepción relevante. Para trabajo sin impacto visual, indicarlo expresamente y verificar que el diff no cambió la UI.

### 11.1. Cierre local — preparación de acceso temprano (4 de noviembre de 2026)

Antecedente de la etapa previa: normalización, conservación del perfil y errores accesibles del formulario compartido. En esa etapa la deduplicación estaba pendiente; quedó implementada y comprobada localmente tras autorizar Functions (cierre 11.2). Detalle histórico: [verificación de preparación](./docs/VERIFICACION_PREPARACION_ACCESO_TEMPRANO.md).

- [x] Diff y componentes revisados; comparación con la pestaña **12 — Components** del Brand System oficial y tokens locales.
- [x] Mensajes nuevos con Poppins, texto `foreground`, superficie clara y acento `destructive`; tipografía de ayuda 12 px/1,5 y alerta 14 px/1,6, espaciado 4/8/12/16 px y radio de 12 px. Se corrigió el contraste del error sobre el degradado mediante superficie sólida.
- [x] Inline y modal comprobados en Chromium a 375/390 × 812 y 1280/1440 × 900: normal, hover, seleccionado, foco, deshabilitado/carga, validación, errores técnicos y éxito sintético. Sin desbordamiento horizontal ni recorte del formulario en esos viewports.
- [x] Teclado, nombres accesibles, `aria-invalid`, errores asociados y foco revisados; movimiento reducido activado. No se cambiaron animaciones, logos ni recursos de marca.
- [x] Build y pruebas de validación aprobados; revisión visual de capturas y diff completada. Datos y servicios sintéticos, sin enviar leads reales.
- [x] Limitaciones documentadas: no hubo comprobación con lector de pantalla ni auditoría independiente. No se migraron diferencias preexistentes de botones, pills, sombras o colores por rol fuera del alcance. No hay excepciones nuevas aprobadas por el usuario ni certificación de conformidad global.

### 11.2. Cierre local — duplicados mediante Functions (4 de noviembre de 2026)

- [x] Diff y componente de formulario revisados. Los mensajes de duplicado reutilizan la alerta contrastada con **12 — Components**, con los tokens locales de Poppins, texto oscuro, superficies claras y error; radio 12 px, 14 px/1,6 y padding 12/16 px. No se añadieron estilos, logos, recursos ni layouts nuevos en esta fase.
- [x] Matriz completa aprobada en inline/modal a 375/390 × 812 y 1280/1440 × 900: 64 casos con Functions y Firestore locales, más dos clientes independientes concurrentes. Revisados los tres mensajes, foco, conservación de datos, cambio de tipo y correo; sin cierre, éxito ni conversión en duplicados.
- [x] Estados normal, hover, seleccionado, foco, validación, carga/deshabilitado, permisos, conexión y éxito cubiertos también con ocho recorridos de Functions simulada. Navegación por teclado y movimiento reducido revisados; sin recorte del formulario ni desbordamiento horizontal en los tamaños comprobados.
- [x] Revisión visual de capturas de escritorio/móvil, contraste de la alerta y tokens completada; sin desviaciones nuevas ni migraciones globales. Se mantienen las diferencias previas de acciones/pills fuera del alcance.
- [x] Build aprobado, cinco pruebas unitarias y nueve de integración aprobadas. Toda la evidencia utiliza datos sintéticos y proyecto demo, sin publicación ni migración.
- [x] Límites: autocomprobación de desarrollo, sin lector de pantalla ni dispositivo físico, sin certificación global del sitio. No hay nuevas excepciones explícitas de diseño. Evidencia y pendientes operativos: [verificación de Functions](./docs/VERIFICACION_ACCESO_TEMPRANO_FUNCTIONS.md).

### 11.4. Cierre local — correos de registro anticipado (4 de noviembre de 2026)

- [x] Plantillas nuevas de paciente/psicólogo, sin reutilizar mensajes de cuentas de la app. Comparación con **03 — Variables**, **12 — Components**, tokens locales y recursos oficiales; logo intacto y con zona de seguridad.
- [x] Verde paciente y morado profesional con variantes oscuras para texto/CTA, fondo claro y texto `#1A3A38`; Poppins con fallback de email Arial/Helvetica. Tipografía 28/18/16/14/12 px, interlineados de la guía, espaciado de la escala y radios 12/20 px.
- [x] Dieciséis casos de navegador aprobados: dos variantes a 375/390/1280/1440 px, con y sin imágenes/fuentes externas. Revisión visual de capturas, foco por teclado, hover del enlace, nombres accesibles, contraste y ausencia de desbordamiento. No hay animaciones; movimiento reducido activado.
- [x] Renderer y HTML/TXT generados coherentes; nombre escapado y mensajes de lista de acceso temprano, sin aprobación profesional, cuenta creada o cupo garantizado. Build y ocho pruebas unitarias aprobados; veinte pruebas de Functions aprobadas con captura local y datos sintéticos.
- [x] Esta tarea no alteró la UI de la landing ni los estilos concurrentes de storytelling. Sin nuevas imágenes ni cambios de marca. Gmail real, Outlook, modo oscuro de clientes, lector de pantalla y recepción siguen pendientes. No se publicó ni envió correo real.
- [x] Configuración Gmail y estados de envío documentados; la activación requiere secreto real y publicación autorizada. Sin excepciones nuevas de diseño; la vista previa usa Poppins externa y el correo mantiene fallback por compatibilidad. Detalle y archivos: [correos de acceso temprano](./docs/email/README.md).

### 11.5. Cierre local — actualización de textos conservando los gráficos (4 de noviembre de 2026)

- [x] Por instrucción expresa del fundador, solo se actualiza copy dentro de los bloques existentes. Comparación automática de los templates antes/después: mismos elementos, clases y atributos gráficos; únicamente textos y placeholders distintos. Hero, tokens CSS, logos, iconos, colores, tamaños, tarjetas, grillas y efectos conservados.
- [x] Referencia oficial consultada de nuevo en **12 — Components**, junto con los fundamentos ya revisados. Sin tokens ni componentes visuales nuevos. Se preservan las diferencias preexistentes de color por rol, contraste, escala y jerarquía por el alcance explícito de solo textos; no se afirma conformidad global ni se introduce una migración visual.
- [x] Chromium local a 375/390 × 812 y 1280/1440 × 900: revisión visual y funcional de textos largos, tarjetas, cinco FAQ, anchors, público/perfil, validación, carga, error y éxito con servicios sintéticos. Sin desbordamiento horizontal ni recorte del formulario/modal en los tamaños probados. Placeholders acortados a las etiquetas del prototipo para evitar truncamiento en móvil.
- [x] Ocho recorridos del script previo de preparación aprobados con Functions/Analytics simulados: teclado/foco, retención de perfil/datos, errores de permisos/conexión y bloqueo de doble envío conservados. Build y ocho pruebas unitarias aprobados. Sin leads reales, envío de correos ni publicación.
- [x] Se mantiene el comportamiento previo: orden móvil del bloque de acceso temprano y cierre automático del modal a 1,4 s. La nueva instrucción de solo textos limita expresamente la implementación; no se aplican los cambios de estructura/comportamiento del intento descartado. Sin comprobación de la landing publicada, otros navegadores, lector de pantalla ni QA independiente.

### 11.6. Cierre local — continuidad compacta y CTA (4 de noviembre de 2026)

- [x] Cambio autorizado únicamente en la sección señalada por el fundador: menos altura y espacios, cuatro tarjetas con los mismos textos/iconos y un CTA grande «Solicitar acceso temprano». Revisada la diferencia contra copia local previa; preservados los cambios ajenos de copy en el resto de Home y los demás archivos del producto.
- [x] Contrastadas en la web oficial Variables, Typography, Border Radius y Components, junto con las escalas locales de color, espaciado e iconografía. Poppins 28/36 px en el título; cuerpo 16/1,65 y 14/1,6; tarjetas 12 px, iconos Lucide de 24 px con trazo 1,5; CTA de 64 px y radio 20 px. Contenedores existentes reutilizados, sin migración global de grilla o tokens.
- [x] Teal 700 `#2A6C63` para acción de marca/iconos y neutral 600 `#426460` para cuerpo, definidos como variables locales de sección; hover con `foreground`. Texto blanco del CTA con contraste aproximado 6,13:1 y foco oscuro visible. No se tocaron logos ni sus recursos.
- [x] Chromium local en viewports 375/390 × 812 y 768/1024/1280/1440 × 900, con movimiento reducido: cuatro tarjetas, CTA de 64 px, navegación por teclado y foco, hover, enlace al formulario y ausencia de desbordamiento comprobados. Capturas de escritorio/móvil revisadas. Estados de carga/error/éxito no afectados: se conserva el formulario existente y no se envían leads.
- [x] Build y diff comprobados. Solo validación local, sin publicación ni comprobación de la landing desplegada. Sin lector de pantalla, dispositivo físico ni revisión independiente. El nuevo encargo permite cambiar la composición de esta sección; los demás bloques conservan su presentación anterior.

### 11.7. Cierre local — copy aprobado de las cuatro tarjetas (5 de noviembre de 2026)

- [x] Sustituidos únicamente los títulos y descripciones de continuidad por los cuatro textos aprobados, incluido el diario emocional. Comparación contra el bloque previo: iconos, estructura, clases, tokens, tipografía y CTA conservados; sin cambios visuales de diseño ni nuevas excepciones al Brand System revisado en 11.6.
- [x] Textos y ausencia de desbordamiento comprobados en Chromium local a 375/390/1280/1440 px; capturas de móvil y escritorio revisadas para legibilidad y ajuste. Build y diff aprobados. Sin envío de leads ni publicación; sin verificación de la web desplegada ni auditoría independiente.

### 11.8. Cierre — sección profesional aprobada y publicada (5 de noviembre de 2026)

- [x] Nuevo componente `PsychologistsSection.vue`, integrado únicamente en `#para-psicologos`, con copy literal del prototipo aprobado. Cuatro tarjetas, un solo párrafo de resumen, nota de acceso temprano y nota de desarrollo; sin encabezado editorial ni lista anterior. Jerarquía h2/h3/h4 bajo el h1 del hero.
- [x] Comparación con Variables, Color System, Typography, Border Radius y Components de la web oficial. Poppins, morado profesional, acción `#6358B8`/blanco (5,80:1), hover `#4D44A0` (7,92:1), activo/foco `#383188` (10,70:1), neutral 600 para cuerpo, radios 8/12/20 px y sombra S oficial. Lucide de 24 px y trazo 1,5; sin cambios de logo, hero ni recursos.
- [x] 22 recorridos locales (workspace y build aislado) y 11 sobre `https://lurems.lat/`: 374/375/390, 767/768, 1023/1024, 1279/1280 y 1439/1440 px. Copy, orden responsive, cuatro tarjetas, ausencia de desbordamiento, normal/hover/activo/foco del CTA, clic/Enter y modal con psicólogo preseleccionado aprobados. Capturas móviles y de escritorio revisadas, con movimiento reducido; sin leads reales.
- [x] Build del workspace y artefacto aislado aprobados; ocho pruebas unitarias existentes aprobadas. Despliegue solo Hosting, desde base publicada reproducida: 37 archivos de base idénticos y dos reservados de Hosting. Fuentes de producto cambiadas en el artefacto: Home y el nuevo componente, sin los cambios locales pendientes del resto de la landing.
- [x] Producción verificada: versión `614b097a459f9717`; los 37 archivos del artefacto coinciden con HTTPS. Fuera de la sección, textos, enlaces e imágenes coinciden con la base previa en 390/1440 px. Sin Functions/reglas, sin escrituras ni envío de correos. Sin otras excepciones de diseño; límites: Chromium, sin dispositivo físico, lector de pantalla ni QA independiente. Detalle: [verificación y despliegue](./docs/VERIFICACION_PARA_PSICOLOGOS.md).

### 11.9. Cierre local — «Dónde estamos hoy» compacto (5 de noviembre de 2026)

- [x] Sustituido únicamente el bloque anterior por `DevelopmentStatusSection.vue`, con copy literal aprobado, CTA funcional y contactos debajo del separador. Eliminados sus cuatro datos de tarjetas e import exclusivo; comparación contra copia previa de esta tarea para conservar los cambios locales ajenos y las demás secciones.
- [x] Contrastados Variables, Color System y Components del Brand System oficial con tokens locales y prototipo. Poppins heredada, teal de marca: superficie `#EFF9F7`, borde `#C8EDE8`, acción `#2A6C63`, hover `#1F504A`, texto oscuro y neutral `#426460`. CTA con texto blanco (6,13:1), radio 20 px y altura mínima 56 px; panel con radio local 12 px. Lucide con trazo 1,5 e iconos decorativos ocultos a tecnologías de asistencia. Sin cambios de logo ni migración global.
- [x] Diez recorridos en Chromium local a 375/390, 767/768, 1023/1024, 1279/1280 y 1439/1440 px: copy, columnas, contactos debajo, CTA móvil de ancho completo y ausencia de desbordamiento aprobados. Capturas de 390 y 1440 px revisadas visualmente; movimiento reducido activado.
- [x] CTA normal/hover/activo/foco, clic y Enter comprobados; enlaces con foco visible, destinos y atributos de WhatsApp verificados sin activarlos. Modal real con selección general predeterminada (`Paciente`), cambio a psicólogo y eventos de apertura comprobados mediante Analytics simulado. Formulario, validación y guardado conservados; sin leads ni mensajes enviados.
- [x] `npm run build`, ocho pruebas existentes y revisión del diff aprobados. Implementación exclusivamente local: no hubo despliegue ni comprobación de producción. Límites: Chromium, sin dispositivo físico, lector de pantalla ni auditoría independiente; sin nuevas excepciones de diseño.

Publicación posterior autorizada: versión Hosting `e90e8093f4316e48`, con diez recorridos sobre el dominio publicado y capturas de 390/1440 px revisadas; CTA, foco, contactos, selección de público y ausencia de desbordamiento aprobados. Se excluyó el resto del trabajo local pendiente y no se desplegaron Functions ni reglas. Sin leads ni mensajes enviados.

### 11.10. Cierre local — siete FAQ aprobadas (5 de noviembre de 2026)

- [x] Sustituidos únicamente los datos de preguntas/respuestas por siete textos literales aprobados. Comparación de hashes de todos los archivos de `src` contra el estado previo: solo cambia el arreglo `faqs` de `site.js`; el resto de ese archivo permanece idéntico. Conservados template, identificador, estilos, tokens, Poppins, iconos y funcionamiento del acordeón. Sin cambios del sistema visual ni nuevas excepciones; se mantienen las diferencias preexistentes fuera del alcance de solo contenido.
- [x] Chromium local a 375/390/1280/1440 px: siete preguntas y respuestas exactas en el orden aprobado; apertura/cierre individual, cierre de la anterior al abrir otra, Enter/Espacio y navegación con Tab comprobados. Respuestas completas sin recorte ni desbordamiento horizontal; capturas de móvil y escritorio revisadas con movimiento reducido.
- [x] Build, ocho pruebas existentes y revisión del delta aprobados. Formulario y otras secciones intactos, sin leads ni mensajes enviados. No se publicó ni desplegó; sin comprobación de producción, otros navegadores, dispositivo físico, lector de pantalla ni auditoría independiente.

## 12. Mantenimiento

Al adoptar un cambio oficial del sistema, actualizar este documento, su fecha de consulta y los mapeos afectados. Mantener el enlace desde `AGENTS.md` y la referencia desde `CONTEXTO_PROYECTO.md`. No transformar decisiones puntuales de la landing en reglas oficiales sin evidencia en el Brand System o instrucción explícita del usuario.


### Publicación completa — comprobación del 5 de noviembre de 2026

Por autorización posterior del fundador se publicó el estado local completo de la landing en Hosting `1ecad8cb45e8392d`, junto con reglas y callable de registro. Cuatro recorridos de Chromium sobre el dominio publicado (375/390/1280/1440 px): siete FAQ literales, apertura/cierre, teclado, ausencia de desbordamiento, modal real y selección profesional aprobados. Se conservan los componentes y estilos revisados en los cierres anteriores. Build y ocho pruebas unitarias aprobados; veinte pruebas de integración aprobadas al repetir la ejecución tras un primer intento con un fallo. No se enviaron leads ni correos de prueba. `sendEarlyAccessEmail` pendiente por secreto real ausente; la callable se publicó con un entry point temporal sin ese export, conservando su handler. No se verificó persistencia real ni recepción de correo; el fundador realizará la prueba del formulario.
