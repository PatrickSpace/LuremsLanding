import { connectFunctionsEmulator, getFunctions, httpsCallable } from "firebase/functions";
import { firebaseApp } from "./firebase.js";

const functions = getFunctions(firebaseApp, "us-central1");
// Development opt-in; production builds always use the deployed callable.
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === "true") {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
const register = httpsCallable(functions, "submitLead", { timeout: 70000 });

export async function submitLead(data) {
  const response = await register({
    nombre: data.nombre.trim(),
    email: data.email.trim().toLowerCase(),
    tipoUsuario: data.tipoUsuario,
    perfilPsicologo: data.tipoUsuario === "Psicólogo" ? data.perfilPsicologo?.trim() || "" : "",
    origenFormulario: data.origenFormulario,
    pagePath: window.location.pathname,
  });
  // Only an explicit, confirmed creation may trigger success / generate_lead.
  if (response.data?.status !== "created") {
    throw Object.assign(new Error("Unexpected registration response"), { code: "functions/internal" });
  }
}
