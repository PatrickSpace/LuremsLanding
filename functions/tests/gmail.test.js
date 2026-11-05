import assert from "node:assert/strict";
import test from "node:test";
import { createGmailTransport } from "../src/emails/gmail.js";

test("adaptador Gmail autentica el remitente configurado y limita destinatario/envelope sin exponer archivos", async () => {
  let configuration;
  let sent;
  let verified = false;
  const sender = "synthetic.smtp.test@gmail.com";
  const transport = createGmailTransport({user: sender, password: "synthetic app password"}, options => {
    configuration = options;
    return {verify: async () => {verified = true;}, sendMail: async message => {sent = message; return {accepted: [message.to]};}};
  });
  await transport.verify();
  const result = await transport.send({to: "recipient@example.test", subject: "Confirmación sintética", html: "<p>Lista</p>", text: "Lista"});
  assert.equal(verified, true);
  assert.equal(configuration.host, "smtp.gmail.com");
  assert.equal(configuration.port, 465);
  assert.equal(configuration.secure, true);
  assert.deepEqual(configuration.auth, {user: sender, pass: "syntheticapppassword"});
  assert.deepEqual(sent.from, {name: "Lurems", address: sender});
  assert.equal(sent.replyTo, sender);
  assert.deepEqual(sent.envelope, {from: sender, to: ["recipient@example.test"]});
  assert.equal(sent.disableFileAccess, true);
  assert.equal(sent.disableUrlAccess, true);
  assert.deepEqual(result.accepted, ["recipient@example.test"]);
});

test("configuración incompleta no intenta conectar a Gmail", () => {
  for (const configuration of [{}, {user: "not-an-email", password: "synthetic"}, {user: "sender@example.test", password: "synthetic"}, {user: "synthetic.smtp.test@gmail.com", password: ""}]) {
    assert.throws(() => createGmailTransport(configuration, () => {throw new Error("Must not instantiate SMTP");}), error => error.code === "EMAIL_CONFIG");
  }
});
