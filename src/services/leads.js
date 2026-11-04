import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { firebaseApp } from "./firebase.js";

// Este módulo solo se solicita después de validar un envío. Conserva Firestore
// completo y su cola/reintento en memoria cuando se pierde la conexión.
const db = getFirestore(firebaseApp);

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
