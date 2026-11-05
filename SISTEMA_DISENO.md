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

## 12. Mantenimiento

Al adoptar un cambio oficial del sistema, actualizar este documento, su fecha de consulta y los mapeos afectados. Mantener el enlace desde `AGENTS.md` y la referencia desde `CONTEXTO_PROYECTO.md`. No transformar decisiones puntuales de la landing en reglas oficiales sin evidencia en el Brand System o instrucción explícita del usuario.


### 11.9. Cierre local — «Dónde estamos hoy» compacto (5 de noviembre de 2026)

- [x] Sustituido únicamente el bloque anterior por `DevelopmentStatusSection.vue`, con copy literal aprobado, CTA funcional y contactos debajo del separador. Eliminados sus cuatro datos de tarjetas e import exclusivo; comparación contra copia previa de esta tarea para conservar los cambios locales ajenos y las demás secciones.
- [x] Contrastados Variables, Color System y Components del Brand System oficial con tokens locales y prototipo. Poppins heredada, teal de marca: superficie `#EFF9F7`, borde `#C8EDE8`, acción `#2A6C63`, hover `#1F504A`, texto oscuro y neutral `#426460`. CTA con texto blanco (6,13:1), radio 20 px y altura mínima 56 px; panel con radio local 12 px. Lucide con trazo 1,5 e iconos decorativos ocultos a tecnologías de asistencia. Sin cambios de logo ni migración global.
- [x] Diez recorridos en Chromium local a 375/390, 767/768, 1023/1024, 1279/1280 y 1439/1440 px: copy, columnas, contactos debajo, CTA móvil de ancho completo y ausencia de desbordamiento aprobados. Capturas de 390 y 1440 px revisadas visualmente; movimiento reducido activado.
- [x] CTA normal/hover/activo/foco, clic y Enter comprobados; enlaces con foco visible, destinos y atributos de WhatsApp verificados sin activarlos. Modal real con selección general predeterminada (`Paciente`), cambio a psicólogo y eventos de apertura comprobados mediante Analytics simulado. Formulario, validación y guardado conservados; sin leads ni mensajes enviados.
- [x] `npm run build`, ocho pruebas existentes y revisión del diff aprobados. Implementación exclusivamente local: no hubo despliegue ni comprobación de producción. Límites: Chromium, sin dispositivo físico, lector de pantalla ni auditoría independiente; sin nuevas excepciones de diseño.


La publicación posterior fue autorizada por el fundador: Hosting `e90e8093f4316e48`. Se conserva el diseño contrastado localmente; los cambios pendientes ajenos se excluyen del artefacto.

Comprobación de producción: diez recorridos Chromium sobre `https://lurems.lat/` a 375/390, 767/768, 1023/1024, 1279/1280 y 1439/1440 px. Copy, distribución, enlaces, foco, estados del CTA, clic/Enter y modal con público editable aprobados. Capturas de 390/1440 px revisadas. Sin leads ni mensajes enviados; recepción de Analytics y persistencia real fuera de esta comprobación.
