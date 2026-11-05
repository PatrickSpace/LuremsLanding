import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createHash } from "node:crypto";
import { initializeApp, deleteApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { validateLeadRequest } from "../src/lead-validation.js";
import { registerLead } from "../src/register-lead.js";
import { deliverEarlyAccessEmail } from "../src/emails/deliver.js";

// Never run database fixtures or cleanup against a real project.
if (process.env.GCLOUD_PROJECT !== "demo-luremslanding"
  || process.env.FIRESTORE_EMULATOR_HOST !== "127.0.0.1:8080") {
  throw new Error("Run using npm run test:integration with demo-luremslanding emulators only");
}
const app = initializeApp({ projectId: "demo-luremslanding" });
const db = getFirestore(app);
const endpoint = "http://127.0.0.1:5001/demo-luremslanding/us-central1/submitLead";
const profiles = ["Psicólogo clínico independiente", "Psicólogo clínico dependiente", "Psicólogo con otra especialidad", "No soy psicólogo pero me interesa el proyecto"];
const base = { nombre: "Persona sintética", email: "persona@example.test", tipoUsuario: "Paciente", perfilPsicologo: "", origenFormulario: "home-inline", pagePath: "/" };
let serial = 0;
const uniqueEmail = () => `synthetic-${++serial}@example.test`;
const keyFor = email => createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
const messages = {
  Paciente: "Ya te has registrado con este correo como paciente.",
  "Psicólogo": "Ya te has registrado con este correo como psicólogo.",
  ambos: "Ya te has registrado con este correo como paciente y psicólogo.",
};

async function call(data) {
  const response = await fetch(endpoint, {
    method: "POST", headers: {"Content-Type": "application/json", Origin: "http://127.0.0.1:4173"},
    body: JSON.stringify({data}), signal: AbortSignal.timeout(75000),
  });
  return {status: response.status, body: await response.json()};
}

async function records(email) {
  const result = await db.collection("leads").get();
  return result.docs.filter(doc => doc.data().email.trim().toLowerCase() === email).map(doc => ({id: doc.id, ...doc.data()}));
}

before(async () => {
  // Clear only the isolated, in-memory demo database.
  await fetch("http://127.0.0.1:8080/emulator/v1/projects/demo-luremslanding/databases/(default)/documents", {method: "DELETE"});
});
after(async () => { await db.terminate(); await deleteApp(app); });

test("callable: las ocho combinaciones consideran histórico y conservan cada tipo", async () => {
  for (const existing of [[], ["Paciente"], ["Psicólogo"], ["Paciente", "Psicólogo"]]) {
    for (const requested of ["Paciente", "Psicólogo"]) {
      const email = uniqueEmail();
      const old = [];
      for (const type of existing) {
        const ref = db.collection("leads").doc();
        const data = {...base, nombre: `Nombre anterior ${type}`, email: `  ${email.toUpperCase()}  `, tipoUsuario: type,
          perfilPsicologo: type === "Psicólogo" ? profiles[1] : "", createdAt: Timestamp.fromMillis(1000)};
        await ref.set(data);
        old.push({ref, data});
      }
      const result = await call({...base, email: ` ${email.toUpperCase()} `, tipoUsuario: requested,
        perfilPsicologo: requested === "Psicólogo" ? profiles[0] : ""});
      const duplicate = existing.includes(requested);
      if (duplicate) {
        assert.equal(result.status, 409);
        assert.equal(result.body.error.status, "ALREADY_EXISTS");
        assert.equal(result.body.error.message, messages[existing.length === 2 ? "ambos" : requested]);
        assert.deepEqual(result.body.error.details, {kind: "duplicate", types: existing});
      } else {
        assert.equal(result.status, 200);
        assert.deepEqual(result.body.result, {status: "created"});
      }
      const saved = await records(email);
      assert.equal(saved.length, existing.length + (duplicate ? 0 : 1));
      for (const previous of old) assert.deepEqual((await previous.ref.get()).data(), previous.data);
      if (!duplicate) {
        const created = saved.find(record => !old.some(previous => previous.ref.id === record.id));
        assert.equal(created.email, email);
        assert.equal(created.perfilPsicologo, requested === "Psicólogo" ? profiles[0] : "");
        assert.ok(created.createdAt instanceof Timestamp);
      }
    }
  }
});

test("callable: tipos adicionales, perfil y duplicado de ambos tras registros nuevos", async () => {
  for (const first of ["Paciente", "Psicólogo"]) {
    const email = uniqueEmail();
    const second = first === "Paciente" ? "Psicólogo" : "Paciente";
    for (const tipoUsuario of [first, second]) {
      if (first === "Paciente" && tipoUsuario === "Psicólogo") {
        const invalid = await call({...base, email, tipoUsuario, perfilPsicologo: ""});
        assert.equal(invalid.status, 400);
        assert.equal((await records(email)).length, 1);
      }
      const response = await call({...base, email, tipoUsuario, perfilPsicologo: profiles[2]});
      assert.equal(response.status, 200);
    }
    for (const tipoUsuario of [first, second]) {
      const response = await call({...base, email, tipoUsuario, perfilPsicologo: profiles[0]});
      assert.equal(response.status, 409);
      assert.equal(response.body.error.message, messages.ambos);
    }
    const saved = await records(email);
    assert.equal(saved.length, 2);
    assert.equal(saved.find(r => r.tipoUsuario === "Paciente").perfilPsicologo, "");
    assert.equal(saved.find(r => r.tipoUsuario === "Psicólogo").perfilPsicologo, profiles[2]);
  }
});

test("callable: validaciones se aplican sin confiar en el navegador", async () => {
  const email = uniqueEmail();
  for (const invalid of [
    {nombre: " "}, {nombre: "A"}, {nombre: "x".repeat(101)}, {email: "bad"}, {email: "a @example.test"},
    {email: `${"x".repeat(250)}@example.test`}, {tipoUsuario: "Otro"},
    {tipoUsuario: "Psicólogo", perfilPsicologo: ""}, {tipoUsuario: "Psicólogo", perfilPsicologo: "inventado"},
    {origenFormulario: "waitlist"}, {pagePath: "https://otro.test/"}, {pagePath: "/?email=synthetic@example.test"},
    {createdAt: "client-time"},
  ]) {
    const response = await call({...base, email, ...invalid});
    assert.equal(response.status, 400);
    assert.equal(response.body.error.status, "INVALID_ARGUMENT");
  }
  assert.equal((await records(email)).length, 0);
  assert.equal((await db.collection("leadRegistrations").doc(keyFor(email)).get()).exists, false);
  for (const perfilPsicologo of profiles) assert.equal(validateLeadRequest({...base, tipoUsuario: "Psicólogo", perfilPsicologo}).success, true);
});

test("callable: 8 solicitudes simultáneas del mismo tipo crean exactamente un lead", async () => {
  for (const tipoUsuario of ["Paciente", "Psicólogo"]) {
    const email = uniqueEmail();
    const responses = await Promise.all(Array.from({length: 8}, (_, index) => call({
      ...base, email: index % 2 ? ` ${email.toUpperCase()} ` : email, tipoUsuario, perfilPsicologo: profiles[0],
    })));
    assert.equal(responses.filter(r => r.status === 200).length, 1);
    assert.equal(responses.filter(r => r.status === 409).length, 7);
    assert.equal((await records(email)).length, 1);
  }
});

test("callable: tipos distintos concurrentes conservan dos leads y el perfil", async () => {
  const email = uniqueEmail();
  const responses = await Promise.all(Array.from({length: 8}, (_, index) => call({
    ...base, email, tipoUsuario: index % 2 ? "Psicólogo" : "Paciente", perfilPsicologo: profiles[3],
  })));
  assert.equal(responses.filter(r => r.status === 200).length, 2);
  assert.equal(responses.filter(r => r.status === 409).length, 6);
  const saved = await records(email);
  assert.equal(saved.length, 2);
  assert.equal(saved.find(r => r.tipoUsuario === "Psicólogo").perfilPsicologo, profiles[3]);
  assert.deepEqual((await db.collection("leadRegistrations").doc(keyFor(email)).get()).data().types, ["Paciente", "Psicólogo"]);
});

test("callable: agregar psicólogo concurrentemente a paciente histórico crea solo un registro adicional", async () => {
  const email = uniqueEmail();
  const ref = db.collection("leads").doc();
  const old = {...base, email: ` ${email.toUpperCase()} `, createdAt: Timestamp.fromMillis(1000)};
  await ref.set(old);
  const responses = await Promise.all(Array.from({length: 8}, () => call({
    ...base, email, tipoUsuario: "Psicólogo", perfilPsicologo: profiles[0],
  })));
  assert.equal(responses.filter(r => r.status === 200).length, 1);
  assert.equal(responses.filter(r => r.status === 409).length, 7);
  assert.equal((await records(email)).length, 2);
  assert.deepEqual((await ref.get()).data(), old);
});

test("callable: múltiples duplicados históricos no se reescriben ni amplían", async () => {
  const email = uniqueEmail();
  for (const variant of [email, email.toUpperCase(), ` ${email} `]) {
    await db.collection("leads").add({...base, email: variant, createdAt: Timestamp.fromMillis(1000)});
  }
  assert.equal((await call({...base, email})).status, 409);
  assert.equal((await records(email)).length, 3);
  assert.equal((await call({...base, email, tipoUsuario: "Psicólogo", perfilPsicologo: profiles[0]})).status, 200);
  assert.equal((await records(email)).length, 4);
});

test("índice inconsistente y errores de almacenamiento nunca se toman como disponibilidad", async () => {
  const email = uniqueEmail();
  await db.collection("leadRegistrations").doc(keyFor(email)).set({version: 1, types: ["Otro"]});
  assert.equal((await call({...base, email})).status, 500);
  assert.equal((await records(email)).length, 0);
  for (const code of [7, 14]) {
    let reads = 0;
    let writes = 0;
    const failingDb = {
      collection: () => ({doc: () => ({}), select: () => ({})}),
      runTransaction: async callback => callback({
        get: async () => { if (++reads === 1) return {exists: false}; throw {code}; },
        create: () => { writes++; }, set: () => { writes++; },
      }),
    };
    await assert.rejects(registerLead(failingDb, {...base, email}), error => error.code === code);
    assert.equal(reads, 2);
    assert.equal(writes, 0);
  }
});

test("reglas: cliente público no puede leer ni escribir leads o índice", async () => {
  const root = "http://127.0.0.1:8080/v1/projects/demo-luremslanding/databases/(default)/documents";
  for (const collection of ["leads", "leadRegistrations", "leadEmails", "emailTestDeliveries"]) {
    assert.equal((await fetch(`${root}/${collection}`)).status, 403);
    assert.equal((await fetch(`${root}/${collection}/synthetic`)).status, 403);
    assert.equal((await fetch(`${root}/${collection}?documentId=synthetic`, {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({fields: {email: {stringValue: "synthetic@example.test"}}}),
    })).status, 403);
    assert.equal((await fetch(`${root}/${collection}/synthetic`, {method: "DELETE"})).status, 403);
  }
});

async function waitFor(check) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    const result = await check();
    if (result) return result;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error("Local email trigger timed out");
}

async function manualJob(extra = {}) {
  const ref = db.collection("leads").doc();
  await ref.set({...base, email: uniqueEmail(), createdAt: Timestamp.fromMillis(1000)});
  // Separate test collection: do not activate the real trigger for mocked workers.
  const jobRef = db.collection("emailDeliveryTestJobs").doc(ref.id);
  await jobRef.set({leadId: ref.id, version: 1, status: "pending", attempts: 0, ...extra});
  return jobRef;
}

const accepted = async message => ({accepted: [message.to], rejected: []});

test("registro válido dispara una confirmación por tipo; duplicados e históricos no generan más correos", async () => {
  const email = uniqueEmail();
  for (const tipoUsuario of ["Paciente", "Psicólogo"]) {
    const result = await call({...base, email, tipoUsuario, perfilPsicologo: profiles[0]});
    assert.equal(result.status, 200);
    const record = (await records(email)).find(record => record.tipoUsuario === tipoUsuario);
    const ref = db.collection("leadEmails").doc(record.id);
    await waitFor(async () => (await ref.get()).data()?.status === "sent");
    const captured = (await db.collection("emailTestDeliveries").doc(record.id).get()).data();
    assert.equal(captured.to, email);
    assert.match(captured.text, /Te avisaremos cuando la app esté lista/);
    assert.match(captured.text, new RegExp(tipoUsuario.toLowerCase()));
    assert.doesNotMatch(captured.html, /app\.lurems|VERIFICATION_URL|ACCOUNT_URL/);
    assert.equal((await call({...base, email, tipoUsuario, perfilPsicologo: profiles[0]})).status, 409);
    assert.equal((await ref.get()).data().attempts, 1);
  }
  assert.equal((await records(email)).length, 2);
  const jobs = await db.collection("leadEmails").get();
  const created = (await records(email)).map(record => record.id);
  assert.equal(jobs.docs.filter(doc => created.includes(doc.id)).length, 2);
  const legacy = db.collection("leads").doc();
  await legacy.set({...base, email: uniqueEmail(), createdAt: Timestamp.fromMillis(1000)});
  assert.equal((await db.collection("leadEmails").doc(legacy.id).get()).exists, false);
});

test("workers concurrentes y replay del evento no envían la misma confirmación dos veces", async () => {
  const jobRef = await manualJob();
  let sends = 0;
  const createTransport = () => ({verify: async () => true, send: async message => {sends++; return accepted(message);}});
  const outcomes = await Promise.allSettled(Array.from({length: 8}, () => deliverEarlyAccessEmail({db, jobRef, createTransport})));
  assert.ok(outcomes.every(result => result.status === "fulfilled" || result.reason.code === "EMAIL_BUSY"));
  await deliverEarlyAccessEmail({db, jobRef, createTransport});
  assert.equal(sends, 1);
  assert.equal((await jobRef.get()).data().status, "sent");
  assert.equal((await jobRef.get()).data().attempts, 1);
});

test("fallo de conexión durante preflight se puede reintentar sin perder el lead", async () => {
  const jobRef = await manualJob();
  let sends = 0;
  await assert.rejects(deliverEarlyAccessEmail({db, jobRef, createTransport: () => ({
    verify: async () => {throw {code: "ECONNECTION", message: "synthetic-sensitive-message"};},
    send: async () => {sends++;},
  })}), error => error.code === "EMAIL_RETRY");
  const job = (await jobRef.get()).data();
  assert.equal(job.status, "pending");
  assert.equal(sends, 0);
  assert.ok((await db.collection("leads").doc(jobRef.id).get()).exists);
  assert.ok(!JSON.stringify(job).includes("synthetic-sensitive-message"));
  await deliverEarlyAccessEmail({db, jobRef, createTransport: () => ({verify: async () => true, send: async message => {sends++; return accepted(message);}})});
  assert.equal(sends, 1);
  assert.equal((await jobRef.get()).data().status, "sent");
});

test("credenciales ausentes o rechazadas marcan fallo sin llamar al envío", async () => {
  for (const code of ["EMAIL_CONFIG", "EAUTH"]) {
    const jobRef = await manualJob();
    let sends = 0;
    const createTransport = () => ({verify: async () => {throw {code};}, send: async () => {sends++;}});
    await deliverEarlyAccessEmail({db, jobRef, createTransport});
    await deliverEarlyAccessEmail({db, jobRef, createTransport});
    assert.equal((await jobRef.get()).data().status, "failed");
    assert.equal(sends, 0);
  }
});

test("respuesta SMTP ambigua requiere revisión y no se reenvía automáticamente", async () => {
  const jobRef = await manualJob();
  let sends = 0;
  const createTransport = () => ({verify: async () => true, send: async () => {sends++; throw {code: "ETIMEDOUT", command: "DATA"};}});
  await deliverEarlyAccessEmail({db, jobRef, createTransport});
  await deliverEarlyAccessEmail({db, jobRef, createTransport});
  assert.equal(sends, 1);
  assert.equal((await jobRef.get()).data().status, "needs_review");
});

test("rechazo SMTP explícito temporal reintenta; rechazo permanente no reintenta", async () => {
  const retryJob = await manualJob();
  await assert.rejects(deliverEarlyAccessEmail({db, jobRef: retryJob, createTransport: () => ({
    verify: async () => true, send: async () => {throw {responseCode: 451};},
  })}), error => error.code === "EMAIL_RETRY");
  assert.equal((await retryJob.get()).data().status, "pending");
  await deliverEarlyAccessEmail({db, jobRef: retryJob, createTransport: () => ({verify: async () => true, send: accepted})});
  assert.equal((await retryJob.get()).data().status, "sent");

  const permanentJob = await manualJob();
  await deliverEarlyAccessEmail({db, jobRef: permanentJob, createTransport: () => ({
    verify: async () => true, send: async () => {throw {responseCode: 550};},
  })});
  assert.equal((await permanentJob.get()).data().status, "failed");
});

test("un worker interrumpido después de iniciar SMTP no produce un segundo envío", async () => {
  const jobRef = await manualJob({status: "sending", attemptId: "expired", leaseUntil: Timestamp.fromMillis(1), attempts: 1});
  let calls = 0;
  await deliverEarlyAccessEmail({db, jobRef, createTransport: () => {calls++; throw new Error("Must not connect");}});
  assert.equal(calls, 0);
  assert.equal((await jobRef.get()).data().status, "needs_review");
});

test("una preparación vencida puede recuperarse y el worker antiguo queda excluido", async () => {
  const jobRef = await manualJob();
  let time = 1000;
  let release;
  let entered;
  const started = new Promise(resolve => {entered = resolve;});
  let sends = 0;
  const first = deliverEarlyAccessEmail({db, jobRef, now: () => time, createTransport: () => ({
    verify: async () => {entered(); await new Promise(resolve => {release = resolve;});},
    send: async message => {sends++; return accepted(message);},
  })});
  await started;
  time += 120001;
  await deliverEarlyAccessEmail({db, jobRef, now: () => time, createTransport: () => ({
    verify: async () => true, send: async message => {sends++; return accepted(message);},
  })});
  release();
  await assert.rejects(first, error => error.code === "EMAIL_BUSY");
  assert.equal(sends, 1);
  assert.equal((await jobRef.get()).data().attempts, 2);
});

test("si Gmail acepta pero falla el guardado final, el replay no vuelve a enviar", async () => {
  const jobRef = await manualJob();
  let sends = 0;
  const createTransport = () => ({verify: async () => true, send: async message => {sends++; return accepted(message);}});
  const failingDb = {
    collection: name => db.collection(name),
    runTransaction: callback => db.runTransaction(transaction => callback({
      get: ref => transaction.get(ref),
      update: (ref, data) => {
        if (data.status === "sent") throw new Error("Synthetic commit failure");
        transaction.update(ref, data);
      },
    })),
  };
  await assert.rejects(deliverEarlyAccessEmail({db: failingDb, jobRef, createTransport}));
  assert.equal((await jobRef.get()).data().status, "sending");
  await deliverEarlyAccessEmail({db, jobRef, createTransport, now: () => Date.now() + 120001});
  assert.equal(sends, 1);
  assert.equal((await jobRef.get()).data().status, "needs_review");
});
