# Contexto de la web pública

Revisión local: **4 de noviembre de 2026**. Este archivo orienta el trabajo; [CONTEXTO_PROYECTO.md](../CONTEXTO_PROYECTO.md) conserva el detalle del producto y [SISTEMA_DISENO.md](../SISTEMA_DISENO.md) las reglas de marca. No se comprobó el estado publicado, DNS, Search Console ni cuentas de proveedores en esta revisión.

## Propósito y prioridades

Esta web es la presencia pública principal de Lurems. El encargo del fundador prioriza identidad de marca, calidad visual, claridad en móviles, comunicación que genere confianza y conversión hacia acciones definidas para el negocio.

La acción implementada actualmente es **solicitar acceso temprano**, con segmentación paciente/psicólogo y guardado de leads. No crea una cuenta, reserva una sesión ni envía por sí sola un correo. El fundador decide futuras acciones de conversión y su prioridad.

La plataforma para pacientes y psicólogos es otro sistema. Presentar sus herramientas con el estado confirmado en las fuentes pertinentes; no convertir una propuesta futura en una función disponible en la web. Tampoco trasladar automáticamente a la landing funciones, políticas o garantías encontradas en la app.

## Identificación de los sistemas

| Aspecto | Web pública: este repositorio | App: repositorio vecino consultado en lectura |
| --- | --- | --- |
| Carpeta local | `LuremsLanding` | `../PsicoFound-Frontend` desde la raíz del proyecto |
| Remoto Git observado | [PatrickSpace/LuremsLanding](https://github.com/PatrickSpace/LuremsLanding) | [PatrickSpace/PsicoFound-Frontend](https://github.com/PatrickSpace/PsicoFound-Frontend) |
| Dominio | `https://lurems.lat/`, canonical y sitemap configurados | `https://app.lurems.lat`, declarado en su README y usado en enlaces de verificación de correo |
| Frontend declarado | Vue 3, JavaScript, Vite 7, Vue Router 4, Tailwind CSS 4, Lucide, Zod | Vue 3, JavaScript, Vite 7, Vue Router 4, Vuetify 3 y Pinia |
| Servicios observados | Firebase SDK 12, Firestore para leads y Analytics condicionado al entorno | Firebase SDK 12 y backend Cloud Functions con Node 22 |
| Firebase CLI / Hosting | Alias `LuremsLanding` → proyecto `luremslanding`; sitio `luremslanding` | Proyecto predeterminado `psicosaas-3c819`; sitio `luremsapp` |
| Otros hosts | `www.lurems.lat`, `luremslanding.web.app` y `luremslanding.firebaseapp.com` están permitidos por la configuración local de Analytics | El README declara `psico-found-frontend.vercel.app` como despliegue adicional que comparte backend con Hosting |

La separación se comprobó en remotos Git y archivos locales. No acredita qué commit sirve cada host, su disponibilidad, la propiedad de dominios ni el estado actual de la app. Los valores de Firebase CLI no verifican los valores efectivos del SDK definidos mediante entorno. No se leyeron ni copiaron valores de archivos `.env`.

Compartir Vue o marca no implica compartir estilos, rutas, datos, permisos, configuración o despliegue. No copies Vuetify ni los comandos, el entorno o las reglas de la app a esta web sin un encargo específico. No edites el repositorio vecino como efecto secundario de una tarea de la landing.

## Búsqueda de marca: objetivo y límites

El fundador quiere que el inicio de la web sea la referencia principal al buscar **Lurems**. Es un objetivo de negocio; esta revisión no demuestra resultados en Google.

- **Presencia en el buscador:** qué referencias a Lurems aparecen efectivamente en búsquedas observadas.
- **Indexación:** si el buscador incorporó una URL a su índice. Tener sitemap, canonical o permisos de rastreo no prueba su incorporación.
- **Posicionamiento:** en qué lugar aparece para una consulta y contexto concretos; puede variar.

SEO define la estrategia y las comprobaciones necesarias; desarrollo implementa requisitos técnicos aprobados; QA verifica los criterios del encargo. No prometas indexación inmediata ni primeras posiciones. No cambies dominios, canonical, redirecciones o exclusiones del índice por iniciativa propia. Las páginas privadas y las públicas necesitan decisiones específicas; no asumas que toda la app debe indexarse o excluirse.

## Fuentes y cómo ampliar la evidencia

Para la web se contrastaron [README](../README.md), [package.json](../package.json), [.firebaserc](../.firebaserc), [firebase.json](../firebase.json), [router](../src/router.js), [configuración Firebase](../src/services/firebase.js), [servicio de leads](../src/services/leads.js), [index.html](../index.html), [robots.txt](../public/robots.txt) y [sitemap.xml](../public/sitemap.xml).

Para identificar la app se leyeron, en la copia vecina, `README.md`, `package.json`, `functions/package.json`, `.firebaserc`, `firebase.json`, `vite.config.js` y `src/utils/emailVerification.js`, además de su remoto Git. Esa copia no es un requisito para utilizar esta organización. Si no está disponible en otro entorno, conserva esta identificación como antecedente fechado y vuelve a contrastarla antes de una tarea entre sistemas.

Pendientes solo si el próximo encargo los necesita: confirmar despliegues efectivos, enlaces públicos entre sistemas, estado en Search Console y decisiones comerciales aún abiertas. No bloquean tareas documentales de esta web ni autorizan una auditoría o cambios en la app.
