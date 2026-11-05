# Verificación local de preparación del acceso temprano

4 de noviembre de 2026. **Antecedente de la etapa previa:** esta verificación documenta la preparación anterior a la autorización de Functions. El estado vigente está en [Functions de acceso temprano](./ACCESO_TEMPRANO_FUNCTIONS.md) y [verificación de la implementación](./VERIFICACION_ACCESO_TEMPRANO_FUNCTIONS.md). Autocomprobación de desarrollo, no auditoría independiente. Las limitaciones pendientes que se describen abajo corresponden a aquella etapa.

## Archivos de producto

- `src/services/lead-validation.js`: `trim` y minúsculas antes de validar correo; nombre recortado, máximos compatibles con reglas. Se conserva la exigencia de perfil permitido para psicólogo.
- `src/services/leads.js`: mantiene `addDoc` y la normalización al escribir; fuerza perfil vacío para paciente aunque la UI conserve la selección profesional.
- `src/services/lead-errors.js`: diferencia permisos de conexión/timeout y fallo genérico sin deducir disponibilidad o duplicado.
- `src/components/WaitlistForm.vue`: conserva perfil al alternar tipos, etiquetas y errores accesibles, foco y estado de carga. El mismo componente se usa inline y en el modal.
- `firestore.rules`: revisado, sin modificaciones. No se habilitaron lecturas públicas ni se implementó unicidad en reglas.

## Comprobaciones ejecutadas

`node --test tests/lead-validation.test.js`: cuatro pruebas aprobadas. Cubre ambos tipos con correo normal, mayúsculas, espacios y tabulaciones extremas; conserva etiquetas `+`; rechaza correo vacío, malformado o demasiado largo, nombre vacío/corto/largo y tipo desconocido. Exige perfil profesional permitido y diferencia fallos técnicos sin filtrar sus mensajes internos.

`npm run build`: aprobado tras los cambios finales (Vite 7.3.6, 1784 módulos). `git diff --check`: aprobado.

`scripts/check-waitlist-preparation.js` se ejecutó mediante `playwright-cli run-code` contra Vite local en `127.0.0.1:4173`, con `envDir` alternativo vacío, Firestore y Analytics sustituidos **en el navegador** y configuración Firebase sintética. Chromium 156.0.8078.73. No se leyeron leads, se enviaron registros reales ni se contactó Firebase para la prueba. Las fuentes de Google se permitieron para comprobar Poppins.

| Viewport | Inline | Modal |
| --- | --- | --- |
| 375 × 812 | Aprobado | Aprobado |
| 390 × 812 | Aprobado | Aprobado |
| 1280 × 900 | Aprobado | Aprobado |
| 1440 × 900 | Aprobado | Aprobado |

En los ocho recorridos: normal, hover de selector, selección de tipo, validación de campos y perfil, foco al primer campo inválido, conservación del perfil al alternar, carga/deshabilitado, tres eventos de submit sobre la misma instancia con una sola llamada al servicio, permisos, conexión, corrección/reintento, éxito confirmado y cierre del modal tras éxito. Ante errores técnicos no aparece éxito ni `generate_lead` y el modal permanece disponible. Se comprobó teclado desde la alerta a reintento, nombres de campos estables, correo normalizado y perfil correcto en el payload sintético. Los eventos capturados no contienen el nombre ni los correos sintéticos.

Se usó `prefers-reduced-motion: reduce`; no se añadieron animaciones ni se alteró el hero. No hubo desbordamiento horizontal ni recorte del formulario del modal en esos tamaños. Capturas y salida de la ejecución en `output/playwright/` (ignoradas por Git), con nombres `{home-inline|modal}-{ancho}-{normal|validation|loading|permissions|success}.png` y `waitlist-preparation-run.txt`.

## Cierre de diseño

Se abrió el Brand System oficial, pestaña **12 — Components**, y se compararon formularios, errores y alertas con `SISTEMA_DISENO.md` y `src/index.css`. Los nuevos mensajes usan Poppins, texto `foreground` (`#1A3A38`), superficies claras y acento `destructive` (`#E05454`), con espaciado de 4/8/12/16 px y radio de 12 px (`rounded-lg`). Ayuda: 12 px / 1,5; alerta: 14 px / 1,6. Texto sobre superficie blanca: contraste calculado 12,31:1. En el formulario sobre degradado se usa una superficie sólida para los errores, evitando depender del contraste variable del fondo.

No se cambiaron logos, recursos, colores de las acciones por rol ni layout general. Permanecen diferencias preexistentes fuera del alcance (por ejemplo, acción paciente teal y formas pill del formulario). No se afirma conformidad global del sitio ni verificación por lector de pantalla. Registro de cierre en la sección 11.1 de `SISTEMA_DISENO.md`.

## Criterios pendientes

Las ocho combinaciones de registro nuevo/paciente/psicólogo/ambos con cada tipo solicitado, sus tres mensajes de duplicado, el histórico y las peticiones simultáneas desde **clientes independientes** no pueden aprobarse con este servicio. No se simula una deduplicación para presentarla como evidencia: `addDoc` sigue aceptando nuevos documentos con IDs aleatorios. El guard de la instancia solo evita clics repetidos locales.

También quedan pendientes emuladores con la operación atómica y reglas finales, pruebas de transición, permisos reales y política de reintentos ante resultados desconocidos. La cola actual de Firestore puede quedar pendiente sin conexión; el mensaje de conexión se comprueba cuando el servicio rechaza explícitamente. No se migró producción, desplegó infraestructura ni publicó la web, y no se modificó la app.
