# Flujo de trabajo

Aplica los límites de [AGENTS.md](../AGENTS.md). Cada chat mantiene un único rol; una derivación consiste en dejar un encargo escrito para el usuario. No crea, contacta ni activa chats o subagentes sin autorización.

## Quién define, implementa y verifica

| Responsabilidad | Responsable |
| --- | --- |
| Prioridad, presupuesto, compromisos comerciales y publicación | Fundador |
| Ordenar alternativas y preparar encargos | General |
| Alcance funcional, reglas, contratos y alternativas técnicas de una funcionalidad nueva | Arquitecto |
| Recorridos, jerarquía, interfaz, estados, adaptación y criterios de marca | Diseño UX/UI y marca |
| Estrategia de búsqueda, intención de páginas, contenidos y requisitos SEO | SEO y contenidos |
| Implementación del producto y comprobaciones de sus cambios | Desarrollo |
| Verificación independiente dentro del alcance encargado y reporte de hallazgos | QA y auditoría |
| Estimaciones económicas, costos y escenarios | Finanzas, solo cuando haga falta |

Desarrollo es responsable de verificar lo que implementa aunque no participe QA. Esa comprobación no equivale a una aprobación independiente. QA informa sobre los criterios revisados; el fundador conserva la decisión de publicación. Diseños y especificaciones no prueban que algo esté implementado.

## Trabajar con el mínimo proceso útil

1. Confirmar el rol elegido y leer las fuentes obligatorias. Identificar sistema, objetivo, alcance y autorizaciones vigentes.
2. Distinguir qué está confirmado y qué necesita una decisión. Avanzar en la parte propia que no dependa de una respuesta pendiente; preguntar solo lo indispensable.
3. Producir el entregable propio y contrastarlo con las fuentes. Una tarea fuera de alcance no amplía el rol.
4. Entregar evidencia y límites. Si hace falta otra especialidad, dejar objetivo, fuentes, decisiones, pendientes y criterios de aceptación en el encargo.

Usa la [plantilla de tarea](./plantillas/tarea.md) y la [de entrega](./plantillas/entrega.md) cuando ayuden. No se exige un documento, una nueva aprobación ni todos los especialistas para cada cambio. Una instrucción concreta del fundador puede ser ya la aprobación del alcance; conserva las autorizaciones anteriores. Si falta una decisión necesaria, prepara primero el resultado revisable de la parte autorizada.

## Recorridos habituales

### Funcionalidad nueva

- El fundador define el problema o aprueba investigarlo; general puede ayudar a priorizar si se le encarga.
- Arquitectura especifica usuarios, resultado, MVP, exclusiones, casos, reglas, estados, dependencias, contratos, datos, permisos, privacidad, errores, alternativas y mantenimiento, aceptación y plan.
- Si hay interfaz o implicaciones de búsqueda, deja preguntas y criterios para diseño o SEO. La coordinación es conceptual y por documentos; no produce sus entregables ni activa sus chats.
- Con el alcance aprobado y los entregables necesarios disponibles, desarrollo implementa y comprueba. Si cambian requisitos relevantes, documenta la diferencia y solicita la decisión que falte antes del trabajo dependiente.
- QA verifica cuando el riesgo o el encargo lo requieran. Finanzas participa solo si una decisión económica lo necesita. El fundador decide publicación.

### Mejora visual

- Diseño define el problema de experiencia, composición, recorrido, dispositivos, accesibilidad y estados con el [Brand System](../SISTEMA_DISENO.md). SEO interviene solo si cambian intención, contenido o estructura de búsqueda; arquitectura solo si aparece una capacidad nueva que lo justifique.
- Desarrollo implementa el diseño aprobado usando tokens y componentes existentes contrastados con la guía.
- Desarrollo revisa los estados afectados y navegador móvil y escritorio. QA contrasta fidelidad y aceptación si se le encarga. Una corrección visual pequeña con criterio ya definido puede ir directamente a desarrollo.

### Tarea SEO y contenidos

- SEO identifica el objetivo, las páginas, su intención y la evidencia disponible. Distingue presencia, indexación y posicionamiento; consulta documentación oficial vigente cuando corresponda.
- Define contenidos y requisitos técnicos, incluyendo la relación web/app si afecta al encargo. Deja explícitas las decisiones necesarias sobre URLs, dominios, canonical, redirecciones o exclusiones; no las ejecuta por iniciativa propia.
- Desarrollo implementa los requisitos aprobados; diseño participa si el cambio afecta jerarquía o interfaz. Arquitectura interviene si hace falta una capacidad o integración nueva.
- QA verifica los requisitos encargados, diferenciando evidencia local y publicada. Solo se afirma indexación o resultados de búsqueda cuando existe evidencia real pertinente. El fundador decide publicación; las comprobaciones posteriores se encargan expresamente y no prometen posiciones ni plazos.

### Corrección pequeña

- Un fallo acotado, reproducible y con comportamiento esperado conocido puede ir directamente a desarrollo.
- Desarrollo corrige dentro del alcance, comprueba el caso y la regresión pertinente, y entrega evidencia. No necesita arquitectura ni un diseño nuevo por defecto.
- Si la reproducción o el resultado esperado son inciertos, puede prepararse un encargo de QA; si cambia el modelo, la experiencia o la estrategia, deriva solo esa parte a la especialidad correspondiente.
- QA puede verificar el cierre si se le solicita. No se inventa una revisión independiente cuando solo hubo autocomprobación de desarrollo.

## Decisiones, desacuerdos y cambios de alcance

Distingue en tareas y entregas estas situaciones, sin crear una base de datos ni un registro obligatorio para cada una:

| Situación | Qué significa |
| --- | --- |
| Recomendación | Alternativa propuesta; todavía no es una decisión aprobada |
| Decisión aprobada | Elección o instrucción explícita del usuario, con referencia al mensaje o documento |
| Implementación | Cambio realizado, identificando archivos o versión y alcance |
| Verificación | Comprobación ejecutada, con entorno, resultado, evidencia y límites |

Ante un desacuerdo, formula el punto concreto, las fuentes y criterios afectados, las alternativas y su impacto. Cada rol sustenta su especialidad sin redefinir las de los demás. Contrasta documentos con código; si difieren, informa la discrepancia en lugar de presentar una propuesta como realidad.

El fundador resuelve prioridades y compromisos entre alternativas. No deduzcas aprobación del silencio ni repitas preguntas ya resueltas. Una limitación técnica puede justificar una alternativa de desarrollo, pero no un cambio unilateral de identidad, contenido estratégico o alcance comercial. Un hallazgo de QA no autoriza a QA a corregir el producto ni decide por sí solo su publicación.

Si la petición excede el rol, completa lo propio y deja un encargo. Solo un pedido explícito de cambio de rol permite continuar la otra especialidad en este chat.

## Cierre proporcional al trabajo

- Revisa el diff, conserva cambios ajenos y actualiza el contexto cuando cambien las áreas que documenta.
- Aplica la sección 11 de [SISTEMA_DISENO.md](../SISTEMA_DISENO.md). Con impacto visual, revisa tokens, componentes, estados, accesibilidad y navegador móvil y escritorio. Sin impacto visual, comprueba el diff y declara que la UI no se alteró.
- Ejecuta `npm run build` si cambia código o estilos y las verificaciones pertinentes; actualmente [package.json](../package.json) no declara scripts de tests o lint. No inventes comandos o resultados.
- En documentación, comprueba enlaces y coherencia; no hace falta ejecutar el producto si no hay una razón concreta.
- Identifica pruebas locales, automatizadas y sobre la web publicada por separado. No envíes leads reales para revisar apariencia ni publiques como efecto secundario de una validación.
- Expón lo pendiente, excepciones explícitas y limitaciones sin afirmar conformidad total o revisión independiente no realizada.
