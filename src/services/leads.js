import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase.js";

export async function submitLead(data) {
  await addDoc(collection(db, "leads"), {
    nombre: data.nombre.trim(),
    email: data.email.trim().toLowerCase(),
    tipoUsuario: data.tipoUsuario,
    perfilPsicologo: data.perfilPsicologo?.trim() || "",
    origenFormulario: data.origenFormulario || "waitlist",
    pagePath: window.location.pathname,
    createdAt: serverTimestamp(),
  });
}
