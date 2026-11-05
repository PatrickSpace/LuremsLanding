# Encargo de arquitectura: unicidad de acceso temprano

Fecha: 4 de noviembre de 2026. **Antecedente resuelto:** después de preparar este encargo, el fundador autorizó en el chat implementar con Functions. La implementación y el contrato vigentes están en [Functions de acceso temprano](./ACCESO_TEMPRANO_FUNCTIONS.md). No se publicó ni migró producción. Las secciones siguientes conservan el diagnóstico previo, no describen el estado actual.

## Objetivo y alcance aprobado

En la web pública `LuremsLanding` (`PatrickSpace/LuremsLanding`, dominio configurado `lurems.lat`, alias Firebase `luremslanding`), permitir un registro por correo normalizado y tipo: uno como paciente y uno como psicólogo. Captar interesados no crea cuentas ni envía correos. Abarca formulario inline y modal. Excluye la app, publicación y migración de producción.

## Evidencia y bloqueo

- `src/services/leads.js` crea documentos con IDs aleatorios mediante `addDoc`. Los documentos conservan nombre, correo, tipo, perfil profesional, origen, ruta y fecha.
- `firestore.rules` permite creaciones válidas y deniega lecturas, actualizaciones y eliminaciones. No hay backend servidor, función ni índice de unicidad configurados en este repositorio.
- Cambiar únicamente a IDs deterministas no incluye los documentos anteriores con IDs aleatorios. Un error de permisos tampoco permite saber si hay uno o ambos tipos registrados.
- Una consulta seguida de escritura independiente no resuelve las carreras. Un control en memoria o localStorage no coordina pestañas y dispositivos. Un trigger posterior a la escritura tampoco impide confirmar inicialmente un duplicado.
- No se consultaron leads reales ni configuración efectiva del SDK; no se leyeron valores de `.env.local`.

La documentación oficial explica las [transacciones atómicas y sus reintentos ante concurrencia](https://firebase.google.com/docs/firestore/manage-data/transactions) y que las [reglas no filtran consultas; el acceso servidor usa IAM](https://firebase.google.com/docs/firestore/security/rules-query). Es necesario resolver una operación confiable que reconozca el histórico sin exponer los documentos al cliente.

## Decisiones que debe entregar arquitectura

1. Elegir dónde ejecutar el registro confiable (por ejemplo, una función de la landing o un servicio autorizado), su región, permisos, configuración local y requisitos de infraestructura/costo para decisión del fundador. No reutilizar el backend de la app por defecto.
2. Definir identidad normalizada (`trim` + minúsculas, sin fusionar aliases, puntos o etiquetas `+`), representación privada y mecanismo atómico de exclusión por correo/tipo. Explicar cómo dos solicitudes del mismo tipo producen exactamente una creación y cómo tipos distintos conservan ambos registros.
3. Definir cómo reconocer **todos** los registros existentes, incluso variantes históricas de mayúsculas/espacios y duplicados previos, sin sobrescribir nombres, perfil profesional, origen ni fechas. La prohibición actual de migrar producción sigue vigente: si la solución requiere preparar un índice o migrar datos, entregar un plan separado y obtener autorización antes de ejecutarlo. Una consulta exacta por correo no cubre históricos sin normalizar.
4. Resolver la transición desde clientes antiguos que aún usan `addDoc`: cierre de la ruta de escritura directa, coordinación con el histórico, ventanas de carrera y reversión. Una nueva API con las reglas actuales permitiría saltarse la unicidad.
5. Especificar contrato de solicitud y respuesta: creación confirmada, duplicado de paciente, de psicólogo o de ambos, validación, permisos, conexión/indisponibilidad y resultado desconocido por interrupción. Distinguir reintentos de una operación confirmada de un nuevo intento; no convertir fallos técnicos en disponibilidad. No devolver datos personales de otros registros.
6. Definir validación del servidor, exigencia de perfil al agregar psicólogo, protección proporcional del endpoint público frente a abuso/enumeración, registros técnicos sin datos personales y límites de petición. Mantener denegadas las consultas públicas de leads.

## Criterios funcionales ya definidos por el fundador

| Tipos existentes para el correo normalizado | Solicita paciente | Solicita psicólogo con perfil válido |
| --- | --- | --- |
| Ninguno | Crear paciente | Crear psicólogo |
| Paciente | Bloquear: «Ya te has registrado con este correo como paciente.» | Crear psicólogo adicional |
| Psicólogo | Crear paciente adicional | Bloquear: «Ya te has registrado con este correo como psicólogo.» |
| Ambos | Bloquear: «Ya te has registrado con este correo como paciente y psicólogo.» | Mismo bloqueo de ambos |

Agregar psicólogo sin perfil válido se rechaza sin escribir. Cada tipo conserva sus datos. Ante duplicado: mensaje accesible dentro del formulario, datos editables conservados, modal abierto, sin éxito, sin `submitted` y sin `generate_lead`. Correo y nombre nunca se envían a Analytics.

## Entrega esperada para retomar desarrollo

Decisión aprobada y contrato concreto, esquema/operación atómica y tratamiento del histórico, cambios de reglas y transición, dependencias de infraestructura, configuración de emuladores y criterios de despliegue/reversión. Publicar y migrar requieren encargos independientes. No hace falta redefinir la regla funcional ni los textos ya aprobados.

Verificar en entorno aislado con datos sintéticos la tabla completa, correos con mayúsculas y espacios, conservación del perfil, peticiones simultáneas del mismo tipo y de tipos distintos desde clientes separados, fallos de permisos/conexión, reintentos y ausencia de datos personales en Analytics. Los dobles de prueba del navegador no acreditan exclusión en Firestore.

## Avance independiente permitido

Desarrollo puede normalizar antes de validar, conservar el perfil al alternar tipos (enviar perfil vacío para paciente), hacer accesibles los errores locales y técnicos y verificar esos cambios. Hasta contar con la decisión anterior, `addDoc` sigue sin deduplicación: no presentar esta preparación como la función terminada.
