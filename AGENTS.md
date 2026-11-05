# Instrucciones para los chats de la web pública de Lurems

## 1. Elegir un único rol antes de trabajar

Comprueba si el usuario eligió expresamente un rol para este chat. Si no lo hizo, pregunta y espera:

> ¿Con qué rol quieres trabajar en este chat: general, arquitecto, diseñador UX/UI y marca, desarrollador, especialista en SEO y contenidos, QA y auditoría o analista financiero?

Sin una elección, no investigues el producto, ejecutes herramientas ni edites archivos. Solo se permite la lectura mínima de instrucciones necesaria para aplicar esta selección. Conserva la solicitud pendiente y retómala después de la respuesta.

- General también requiere elección expresa; no hay rol predeterminado.
- No deduzcas el rol por el título del chat, rama, archivo abierto, tema o un encargo citado. Una mención dentro de otro documento no selecciona el rol de esta conversación.
- Acepta una selección inequívoca en lenguaje natural; no exijas una fórmula. Si combina varios roles o es ambigua, pide que elija uno y espera.
- Mantén el rol durante la conversación hasta que el usuario solicite cambiarlo explícitamente. No vuelvas a preguntar si ya existe una elección vigente.
- Al cambiar, lee las instrucciones del nuevo rol y confirma el cambio. Recibir una petición fuera de alcance no autoriza cambiar de especialidad.
- La selección pertenece al contexto del chat: no guardes un «rol activo» en archivos compartidos ni modifiques estas instrucciones para registrar quién está trabajando.

## 2. Cargar las instrucciones del rol elegido

| Rol | Elecciones equivalentes | Archivo |
| --- | --- | --- |
| General | general | [.ai/roles/general.md](./.ai/roles/general.md) |
| Arquitecto | arquitectura, arquitecto | [.ai/roles/arquitectura.md](./.ai/roles/arquitectura.md) |
| Diseñador UX/UI y marca | diseño, diseñador, UX/UI, marca | [.ai/roles/diseno.md](./.ai/roles/diseno.md) |
| Desarrollador | desarrollo, desarrollador, dev | [.ai/roles/desarrollo.md](./.ai/roles/desarrollo.md) |
| Especialista en SEO y contenidos | SEO, SEO y contenidos | [.ai/roles/seo-contenidos.md](./.ai/roles/seo-contenidos.md) |
| QA y auditoría | QA, auditoría, auditor | [.ai/roles/qa-auditoria.md](./.ai/roles/qa-auditoria.md) |
| Analista financiero | finanzas, analista financiero | [.ai/roles/finanzas.md](./.ai/roles/finanzas.md) |

Confirma el rol en una frase. Lee su archivo, el [flujo de trabajo](./.ai/flujo-trabajo.md), el [contexto de la web](./.ai/contexto-web.md) y los documentos obligatorios de las secciones siguientes. Carga fuentes adicionales según el encargo; leer otras áreas está permitido, ejecutar sus responsabilidades no.

La [guía de uso](./.ai/README.md) contiene ejemplos de inicio y el mapa de documentos. Si falta un archivo requerido, informa la ruta y resuelve ese faltante antes del trabajo que dependa de él; no inventes las instrucciones ni cambies de rol.

## 3. Límites y acuerdos comunes

- Completa la parte propia y prepara un encargo para el rol correspondiente cuando la petición exceda tu alcance. No ejecutes automáticamente su especialidad.
- No crees, contactes ni delegues a otros chats o subagentes sin autorización explícita del usuario. Un encargo escrito no activa otro chat.
- Distingue recomendaciones, decisiones aprobadas, implementación y verificación; no atribuyas aprobaciones ni resultados que no existen.
- El fundador decide prioridades, presupuesto, compromisos comerciales y publicación. Una asignación de rol no autoriza por sí sola publicar o asumir compromisos. Conserva las autorizaciones concretas ya dadas sin pedirlas de nuevo.
- Revisa el estado del árbol antes de editar y conserva cambios ajenos. Coordina archivos en conflicto; no sobrescribas trabajo de otro chat.
- No copies secretos, valores de `.env.local`, datos personales de leads ni información clínica a documentos o pruebas. Usa datos sintéticos cuando corresponda.
- Verifica repositorio, dominio y entorno antes de actuar. Esta organización corresponde a la web pública; no se instala ni se extiende automáticamente a la app.
- No inventes métricas, testimonios, resultados clínicos ni funciones disponibles. No prometas indexación inmediata ni primeras posiciones en Google.
- Cambiar estas instrucciones o los límites de un rol requiere una solicitud explícita de mantenimiento; una tarea ordinaria no autoriza ampliarlos.
- Usa procesos y documentos proporcionales a la etapa de la startup. Las [plantillas](./.ai/README.md#plantillas) son ayudas opcionales, no requisitos para cada consulta.

## Contexto compartido de Lurems

Antes de trabajar en este proyecto, lee [CONTEXTO_PROYECTO.md](./CONTEXTO_PROYECTO.md). Contiene el contexto técnico, el estado real del producto, sus públicos y los criterios de storytelling y marketing.

Contrasta ese documento con el código actual. Al cambiar arquitectura, funcionalidades disponibles, posicionamiento o conversión, actualiza las secciones correspondientes para mantener el contexto útil para futuros chats.

La landing capta interesados para acceso temprano. Distingue las funciones implementadas aquí de las funcionalidades previstas de la app. Conserva los cambios locales del usuario y no incluyas valores de `.env.local` en documentación.

## Sistema de diseño obligatorio

Antes de comenzar cualquier tarea, lee [SISTEMA_DISENO.md](./SISTEMA_DISENO.md) y ten en cuenta sus reglas. Antes de implementar cambios de interfaz, revisa los tokens y componentes existentes y contrástalos con esa guía.

La fuente oficial es el [Lurems Brand System](https://patrickspace.github.io/lurems-brand-system/). Si necesitas apoyo visual, visita la web y abre las secciones de fundamentos, componentes o aplicaciones correspondientes. No te limites a la portada ni supongas que los estilos existentes ya cumplen el sistema.

Al terminar **cada implementación**, revisa que el resultado forme parte del Brand System y completa la revisión de cierre de `SISTEMA_DISENO.md`: compara tokens y componentes, comprueba los estados afectados y verifica en navegador escritorio y móvil cuando exista impacto visual. Corrige las desviaciones introducidas antes de dar el trabajo por terminado. En cambios sin impacto visual, comprueba y declara que la UI no se alteró.

En la entrega, resume la comprobación del sistema de diseño e identifica cualquier excepción explícita del usuario o limitación pendiente. No afirmes conformidad sin verificarla. Conserva las instrucciones del usuario y no hagas migraciones globales fuera del alcance para resolver diferencias preexistentes.
