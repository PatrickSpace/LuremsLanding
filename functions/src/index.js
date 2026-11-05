import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { logger } from "firebase-functions";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { defineSecret, defineString } from "firebase-functions/params";
import { duplicateMessage, validateLeadRequest } from "./lead-validation.js";
import { registerLead } from "./register-lead.js";
import { createGmailTransport } from "./emails/gmail.js";
import { deliverEarlyAccessEmail } from "./emails/deliver.js";

initializeApp();
const db = getFirestore();
const smtpUser = defineString("EARLY_ACCESS_SMTP_USER", {default: "not-configured"});
const smtpPassword = defineSecret("EARLY_ACCESS_SMTP_PASSWORD");

export const sendEarlyAccessEmail = onDocumentCreated({
  document: "leadEmails/{leadId}", region: "us-central1",
  retry: true, maxInstances: 1, concurrency: 1, memory: "256MiB", timeoutSeconds: 60,
  secrets: [smtpPassword],
}, async event => {
  if (!event.data) return;
  const createTransport = jobId => {
    // Emulator runs are always local captures; never connect to Gmail from tests.
    if (process.env.FUNCTIONS_EMULATOR === "true") {
      if (process.env.GCLOUD_PROJECT !== "demo-luremslanding") throw Object.assign(new Error("Use the isolated demo project"), {code: "EMAIL_CONFIG"});
      return {
        verify: async () => true,
        send: async message => {
          await db.collection("emailTestDeliveries").doc(jobId).create(message);
          return {accepted: [message.to], rejected: []};
        },
      };
    }
    return createGmailTransport({user: smtpUser.value(), password: smtpPassword.value()});
  };
  try {
    await deliverEarlyAccessEmail({db, jobRef: event.data.ref, createTransport});
  } catch (error) {
    const code = ["EMAIL_BUSY", "EMAIL_RETRY", "EMAIL_STATE"].includes(error?.code) ? error.code : "EMAIL_INTERNAL";
    logger.warn("early_access_email_retry", {code});
    throw new Error(code);
  }
});

export const submitLead = onCall({
  region: "us-central1",
  minInstances: 0,
  maxInstances: 3,
  concurrency: 10,
  memory: "256MiB",
  timeoutSeconds: 60,
  cors: [
    "https://lurems.lat", "https://www.lurems.lat",
    "https://luremslanding.web.app", "https://luremslanding.firebaseapp.com",
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
  ],
}, async request => {
  const parsed = validateLeadRequest(request.data);
  if (!parsed.success) {
    throw new HttpsError("invalid-argument", "Revisa los datos del formulario.", {
      fields: [...new Set(parsed.error.issues.map(issue => issue.path[0]).filter(field => typeof field === "string"))],
    });
  }

  try {
    const result = await registerLead(db, parsed.data);
    if (result.status === "duplicate") {
      throw new HttpsError("already-exists", duplicateMessage(result.types), {
        kind: "duplicate",
        types: result.types,
      });
    }
    return result;
  } catch (error) {
    if (error instanceof HttpsError) throw error;
    // Do not log payloads, emails, names, document IDs or exception messages.
    const code = typeof error?.code === "number" ? error.code : "unknown";
    logger.error("lead_registration_failed", { code });
    const publicCode = ({ 4: "deadline-exceeded", 7: "permission-denied", 8: "resource-exhausted", 10: "aborted", 14: "unavailable" })[code] || "internal";
    throw new HttpsError(publicCode, "No pudimos confirmar tu registro. Intenta de nuevo.");
  }
});
