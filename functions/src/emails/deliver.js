import { randomUUID } from "node:crypto";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { validateLeadRequest } from "../lead-validation.js";
import { renderEarlyAccessEmail } from "./early-access.js";

const leaseMs = 120000;
const maxAttempts = 5;
const busy = () => Object.assign(new Error("Email attempt in progress"), {code: "EMAIL_BUSY"});
const timestamp = () => FieldValue.serverTimestamp();

// SMTP cannot guarantee exactly-once delivery after a lost acknowledgement.
// An ambiguous send is held for review instead of automatically sending again.
export async function deliverEarlyAccessEmail({db, jobRef, createTransport, now = Date.now}) {
  const attemptId = randomUUID();
  const claim = await db.runTransaction(async transaction => {
    const snapshot = await transaction.get(jobRef);
    if (!snapshot.exists) return null;
    const job = snapshot.data();
    if (["sent", "failed", "needs_review"].includes(job.status)) return null;
    if (["preparing", "sending"].includes(job.status)) {
      if (job.leaseUntil?.toMillis() > now()) throw busy();
      if (job.status === "sending") {
        transaction.update(jobRef, {status: "needs_review", errorCode: "SMTP_RESULT_UNKNOWN", updatedAt: timestamp()});
        return null;
      }
    } else if (job.status !== "pending") {
      throw Object.assign(new Error("Invalid email state"), {code: "EMAIL_STATE"});
    }
    if (job.version !== 1 || job.leadId !== jobRef.id || !Number.isInteger(job.attempts) || job.attempts < 0) {
      transaction.update(jobRef, {status: "failed", errorCode: "INVALID_EMAIL_JOB", updatedAt: timestamp()});
      return null;
    }
    if (job.attempts >= maxAttempts) {
      transaction.update(jobRef, {status: "failed", errorCode: "MAX_ATTEMPTS", updatedAt: timestamp()});
      return null;
    }
    transaction.update(jobRef, {
      status: "preparing", attemptId, attempts: job.attempts + 1,
      leaseUntil: Timestamp.fromMillis(now() + leaseMs), updatedAt: timestamp(),
    });
    return {attempts: job.attempts + 1, leadId: job.leadId};
  });
  if (!claim) return;

  async function change(status, extra = {}, allowed = ["preparing", "sending"]) {
    return db.runTransaction(async transaction => {
      const snapshot = await transaction.get(jobRef);
      const job = snapshot.data();
      if (!job || job.attemptId !== attemptId || !allowed.includes(job.status)) return false;
      if (status === "sending" && job.leaseUntil?.toMillis() <= now()) return false;
      transaction.update(jobRef, {status, ...extra, updatedAt: timestamp()});
      return true;
    });
  }

  let transport;
  let content;
  let lead;
  try {
    const snapshot = await db.collection("leads").doc(claim.leadId).get();
    const data = snapshot.data();
    const parsed = validateLeadRequest(data && {
      nombre: data.nombre, email: data.email, tipoUsuario: data.tipoUsuario,
      perfilPsicologo: data.perfilPsicologo, origenFormulario: data.origenFormulario, pagePath: data.pagePath,
    });
    if (!parsed.success) throw Object.assign(new Error("Invalid email recipient"), {code: "EMAIL_RECIPIENT"});
    lead = parsed.data;
    content = renderEarlyAccessEmail(lead);
    transport = createTransport(jobRef.id);
    // No email is sent in preflight; retries are safe at this stage.
    await transport.verify();
  } catch (error) {
    const permanent = ["EMAIL_CONFIG", "EMAIL_RECIPIENT", "EAUTH"].includes(error?.code);
    const retry = !permanent && claim.attempts < maxAttempts;
    await change(retry ? "pending" : "failed", {errorCode: permanent ? error.code : "SMTP_PREFLIGHT_FAILED"}, ["preparing"]);
    if (retry) throw Object.assign(new Error("Email preflight retry needed"), {code: "EMAIL_RETRY"});
    return;
  }

  if (!await change("sending")) throw busy();
  let info;
  try {
    info = await transport.send({
      to: lead.email, subject: content.subject, html: content.html, text: content.text,
      messageId: `<lurems-early-access-v1-${jobRef.id}@gmail.com>`,
    });
  } catch (error) {
    // An explicit negative SMTP response confirms non-acceptance; only 4xx retry.
    const rejected = Number.isInteger(error?.responseCode) && error.responseCode >= 400 && error.responseCode <= 599;
    const retry = rejected && error.responseCode < 500 && claim.attempts < maxAttempts;
    await change(retry ? "pending" : rejected ? "failed" : "needs_review", {
      errorCode: rejected ? `SMTP_${error.responseCode}` : "SMTP_RESULT_UNKNOWN",
    }, ["sending"]);
    if (retry) throw Object.assign(new Error("SMTP retry needed"), {code: "EMAIL_RETRY"});
    return;
  }
  if (!Array.isArray(info?.accepted) || !info.accepted.some(address => String(address).toLowerCase() === lead.email)
    || info.rejected?.length) {
    await change("needs_review", {errorCode: "SMTP_ACCEPTANCE_UNKNOWN"}, ["sending"]);
    return;
  }
  // If this write fails, an event retry sees 'sending' and cannot resend blindly.
  await change("sent", {acceptedAt: timestamp(), errorCode: FieldValue.delete()}, ["sending", "needs_review"]);
}
