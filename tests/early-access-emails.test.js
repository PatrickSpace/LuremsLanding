import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { renderEarlyAccessEmail } from "../functions/src/emails/early-access.js";

test("correos nuevos confirman la lista de acceso temprano y el aviso futuro por cada tipo", () => {
  for (const tipoUsuario of ["Paciente", "Psicólogo"]) {
    const message = renderEarlyAccessEmail({nombre: "Persona sintética", tipoUsuario});
    assert.match(message.text, /registro anticipado/);
    assert.match(message.text, /Te avisaremos cuando la app esté lista/);
    assert.match(message.text, new RegExp(tipoUsuario.toLowerCase()));
    assert.doesNotMatch(message.html, /app\.lurems|VERIFICATION_URL|ACCOUNT_URL|inicia sesi[oó]n|cuenta lista|registro profesional aprobado/i);
    assert.match(message.html, /<html lang="es"/);
    assert.match(message.html, /role="presentation"/);
    assert.match(message.html, /https:\/\/lurems.lat\//);
    assert.ok(message.subject && message.preheader && message.text);
  }
});

test("el nombre se escapa en HTML y no se interpreta como una etiqueta", () => {
  const name = '<img src=x onerror="alert(1)"> & \'persona\'';
  const message = renderEarlyAccessEmail({nombre: name, tipoUsuario: "Paciente"});
  assert.ok(message.text.includes(name));
  assert.doesNotMatch(message.html, /<img src=x/);
  assert.match(message.html, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt; &amp; &#39;persona&#39;/);
  assert.throws(() => renderEarlyAccessEmail({tipoUsuario: "Otro"}));
  assert.throws(() => renderEarlyAccessEmail({tipoUsuario: "__proto__"}));
});

test("las plantillas HTML y TXT entregables coinciden con el renderer usado en Functions", async () => {
  for (const [slug, tipoUsuario] of [["paciente", "Paciente"], ["psicologo", "Psicólogo"]]) {
    const message = renderEarlyAccessEmail({nombre: "{{NOMBRE}}", tipoUsuario});
    assert.equal(await readFile(new URL(`../docs/email/registro-anticipado-${slug}.html`, import.meta.url), "utf8"), message.html + "\n");
    assert.equal(await readFile(new URL(`../docs/email/registro-anticipado-${slug}.txt`, import.meta.url), "utf8"), message.text);
  }
});
