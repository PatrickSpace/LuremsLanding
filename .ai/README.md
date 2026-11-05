# Guía de trabajo para la web pública de Lurems

Esta carpeta organiza las responsabilidades de los chats de **LuremsLanding**. Los límites comunes se definen en [AGENTS.md](../AGENTS.md); el rol elegido se mantiene en cada conversación, nunca en un archivo compartido. Estas instrucciones son acuerdos de trabajo, no una configuración de permisos técnicos.

## Cómo empezar

1. Elige expresamente un único rol en el mensaje inicial. Sin elección, el chat debe preguntar y esperar antes de investigar o ejecutar trabajo.
2. Indica el objetivo y cualquier decisión o autorización ya dada. Adjunta la especificación o el diseño aprobado si existen; no hay que repetir su aprobación.
3. El chat confirma el rol y lee su archivo, el [flujo](./flujo-trabajo.md), el [contexto de la web](./contexto-web.md), [CONTEXTO_PROYECTO.md](../CONTEXTO_PROYECTO.md) y [SISTEMA_DISENO.md](../SISTEMA_DISENO.md).
4. Trabaja dentro de ese alcance. Una petición de otra especialidad produce un encargo escrito; tú decides si abrir otro chat o solicitar un cambio explícito de rol en el actual.

No es necesario pasar por todos los roles. Una corrección pequeña puede resolverse en desarrollo; una consulta de prioridades puede terminar en general. No se crean ni contactan otros chats automáticamente.

## Mapa de documentos

| Documento | Para qué sirve |
| --- | --- |
| [AGENTS.md](../AGENTS.md) | Selección de rol, límites comunes y reglas obligatorias de contexto y diseño |
| [Contexto web](./contexto-web.md) | Objetivos, separación web/app, evidencia y fuentes |
| [Contexto del producto](../CONTEXTO_PROYECTO.md) | Estado real, públicos, comunicación, conversión y arquitectura observada |
| [Sistema de diseño](../SISTEMA_DISENO.md) | Reglas locales del Brand System y revisión de cierre |
| [Flujo de trabajo](./flujo-trabajo.md) | Responsables, recorridos, decisiones y resolución de desacuerdos |
| [General](./roles/general.md) | Pensar, priorizar y preparar encargos; mantener instrucciones cuando se solicite |
| [Arquitectura](./roles/arquitectura.md) | Especificar nuevas funcionalidades y sus contratos antes de implementarlas |
| [Diseño UX/UI y marca](./roles/diseno.md) | Definir experiencia, interfaz, estados y recursos de marca |
| [Desarrollo](./roles/desarrollo.md) | Implementar requisitos aprobados y comprobar los cambios |
| [SEO y contenidos](./roles/seo-contenidos.md) | Definir estrategia de búsqueda, contenidos y requisitos de SEO |
| [QA y auditoría](./roles/qa-auditoria.md) | Verificar y reportar hallazgos con evidencia |
| [Finanzas](./roles/finanzas.md) | Comparar costos y escenarios con fuentes y supuestos |

## Ejemplos de mensajes de inicio

| Rol | Mensaje |
| --- | --- |
| General | «Rol: general. Ayúdame a priorizar las próximas mejoras de la web pública y prepara el encargo de la primera.» |
| Arquitecto | «Rol: arquitecto. Especifica un MVP para una futura sección de recursos; define alcance, contratos y aceptación antes de implementarla.» |
| Diseño | «Rol: diseñador UX/UI y marca. Propón una mejora del formulario en móvil con estados y criterios del Brand System; no modifiques el código del producto.» |
| Desarrollo | «Rol: desarrollador. Implementa la tarea y el diseño aprobados que adjunto; comprueba los cambios y entrega evidencia.» |
| SEO y contenidos | «Rol: especialista en SEO y contenidos. Revisa la estrategia de búsqueda de marca de la web pública y prepara requisitos para desarrollo.» |
| QA y auditoría | «Rol: QA y auditoría. Verifica el formulario en escritorio y móvil; reporta reproducción, evidencia e impacto sin corregir el producto.» |
| Finanzas | «Rol: analista financiero. Compara escenarios de costo de hosting y servicios de la web, con fuentes y supuestos, sin contratar nada.» |

Para cambiar de rol en la misma conversación: «Cambia este chat a desarrollador. Implementa la especificación aprobada que adjunto». La aprobación debe ser real; un ejemplo o plantilla no la concede.

## Plantillas

- [Tarea o encargo](./plantillas/tarea.md): objetivo, responsable, alcance y aceptación.
- [Entrega](./plantillas/entrega.md): resultado, evidencia, limitaciones y siguiente encargo si hace falta.

Úsalas cuando aporten claridad. Pueden completarse en el propio mensaje; no hace falta crear un archivo para cada consulta. Conserva documentos duraderos solo cuando aporten continuidad, sin duplicar el contexto del producto ni las reglas de diseño.

## Mantenimiento

El rol general mantiene esta organización cuando el usuario lo solicita. Cada rol documenta sus decisiones y hallazgos dentro de su especialidad. Si cambian arquitectura, funciones disponibles, posicionamiento o conversión, actualiza las secciones pertinentes de [CONTEXTO_PROYECTO.md](../CONTEXTO_PROYECTO.md) distinguiendo propuesta de implementación. [contexto-web.md](./contexto-web.md) mantiene únicamente el mapa de sistemas y objetivos de la web.

Ante una discrepancia, contrasta documentación con código y evidencia del entorno pertinente. Las instrucciones explícitas del usuario prevalecen; registra cualquier excepción y evita ampliar el alcance por iniciativa propia.
