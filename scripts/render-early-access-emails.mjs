import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { renderEarlyAccessEmail } from "../functions/src/emails/early-access.js";

const directory = new URL("../docs/email/", import.meta.url);
await mkdir(directory, {recursive: true});
const metadata = {};
for (const [slug, tipoUsuario] of [["paciente", "Paciente"], ["psicologo", "Psicólogo"]]) {
  const content = renderEarlyAccessEmail({nombre: "{{NOMBRE}}", tipoUsuario});
  const preview = renderEarlyAccessEmail({nombre: "Persona de ejemplo", tipoUsuario});
  const previewHtml = preview.html
    .replace("https://lurems.lat/brand/lurems-logo-principal-transparent.png", "../../public/brand/lurems-logo-principal-transparent.png")
    .replace("</head>", '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">\n</head>');
  await writeFile(new URL(`registro-anticipado-${slug}.html`, directory), content.html + "\n");
  await writeFile(new URL(`registro-anticipado-${slug}.txt`, directory), content.text);
  await writeFile(new URL(`registro-anticipado-${slug}.preview.html`, directory), previewHtml + "\n");
  metadata[slug] = {subject: content.subject, preheader: content.preheader};
}
await writeFile(new URL("metadata.json", directory), JSON.stringify(metadata, null, 2) + "\n");
console.log(`Plantillas y vistas previas generadas en ${fileURLToPath(directory)}`);
