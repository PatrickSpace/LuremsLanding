import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { userTypes } from "./lead-validation.js";

export async function registerLead(db, lead) {
  const key = createHash("sha256").update(lead.email).digest("hex");
  const indexRef = db.collection("leadRegistrations").doc(key);
  const leadRef = db.collection("leads").doc();

  return db.runTransaction(async transaction => {
    const index = await transaction.get(indexRef);
    const types = new Set();

    if (index.exists) {
      const data = index.data();
      // Fail closed if the private index is inconsistent.
      if (data.version !== 1 || !Array.isArray(data.types) || data.types.length === 0
        || data.types.length > 2 || new Set(data.types).size !== data.types.length
        || !data.types.every(type => userTypes.includes(type))) {
        throw new Error("Invalid registration index");
      }
      data.types.forEach(type => types.add(type));
    } else {
      // No production migration: recognize random-ID legacy records, including
      // non-normalized emails. Only email/type are read; old documents stay intact.
      // This scan occurs only until an index is created by a successful registration.
      const legacy = await transaction.get(db.collection("leads").select("email", "tipoUsuario"));
      for (const document of legacy.docs) {
        const data = document.data();
        if (typeof data.email === "string" && data.email.trim().toLowerCase() === lead.email) {
          if (!userTypes.includes(data.tipoUsuario)) throw new Error("Invalid legacy registration type");
          types.add(data.tipoUsuario);
        }
      }
    }

    if (types.has(lead.tipoUsuario)) {
      return { status: "duplicate", types: userTypes.filter(type => types.has(type)) };
    }

    types.add(lead.tipoUsuario);
    transaction.create(leadRef, { ...lead, createdAt: FieldValue.serverTimestamp() });
    // One private email job per confirmed lead, committed together with it.
    transaction.create(db.collection("leadEmails").doc(leadRef.id), {
      leadId: leadRef.id, version: 1, status: "pending", attempts: 0,
      createdAt: FieldValue.serverTimestamp(),
    });
    // Reading and writing this same document serializes registrations for an email
    // across all instances/devices. Both types retain their own lead documents.
    transaction.set(indexRef, {
      version: 1,
      types: userTypes.filter(type => types.has(type)),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return { status: "created" };
  });
}
