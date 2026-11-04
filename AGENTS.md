# Contexto compartido de Lurems

Antes de trabajar en este proyecto, lee [CONTEXTO_PROYECTO.md](./CONTEXTO_PROYECTO.md). Contiene el contexto técnico, el estado real del producto, sus públicos y los criterios de storytelling y marketing.

Contrasta ese documento con el código actual. Al cambiar arquitectura, funcionalidades disponibles, posicionamiento o conversión, actualiza las secciones correspondientes para mantener el contexto útil para futuros chats.

La landing capta interesados para acceso temprano. Distingue las funciones implementadas aquí de las funcionalidades previstas de la app. Conserva los cambios locales del usuario y no incluyas valores de `.env.local` en documentación.

## Sistema de diseño obligatorio

Antes de comenzar cualquier tarea, lee [SISTEMA_DISENO.md](./SISTEMA_DISENO.md) y ten en cuenta sus reglas. Antes de implementar cambios de interfaz, revisa los tokens y componentes existentes y contrástalos con esa guía.

La fuente oficial es el [Lurems Brand System](https://patrickspace.github.io/lurems-brand-system/). Si necesitas apoyo visual, visita la web y abre las secciones de fundamentos, componentes o aplicaciones correspondientes. No te limites a la portada ni supongas que los estilos existentes ya cumplen el sistema.

Al terminar **cada implementación**, revisa que el resultado forme parte del Brand System y completa la revisión de cierre de `SISTEMA_DISENO.md`: compara tokens y componentes, comprueba los estados afectados y verifica en navegador escritorio y móvil cuando exista impacto visual. Corrige las desviaciones introducidas antes de dar el trabajo por terminado. En cambios sin impacto visual, comprueba y declara que la UI no se alteró.

En la entrega, resume la comprobación del sistema de diseño e identifica cualquier excepción explícita del usuario o limitación pendiente. No afirmes conformidad sin verificarla. Conserva las instrucciones del usuario y no hagas migraciones globales fuera del alcance para resolver diferencias preexistentes.
