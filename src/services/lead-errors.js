export function getDuplicateLeadMessage(error) {
  const types = error?.details?.types;
  if (error?.code !== "functions/already-exists" || error?.details?.kind !== "duplicate"
    || !Array.isArray(types) || types.length < 1 || types.length > 2
    || new Set(types).size !== types.length || !types.every(type => ["Paciente", "Psicólogo"].includes(type))) return null;

  if (types.length === 2) return "Ya te has registrado con este correo como paciente y psicólogo.";
  return types[0] === "Paciente"
    ? "Ya te has registrado con este correo como paciente."
    : "Ya te has registrado con este correo como psicólogo.";
}

// Un fallo técnico nunca confirma que un correo esté disponible o duplicado.
export function getLeadErrorMessage(error) {
  const duplicate = getDuplicateLeadMessage(error);
  if (duplicate) return duplicate;
  const code = typeof error?.code === "string" ? error.code.replace(/^functions\//, "") : "";
  switch (code) {
    case "permission-denied":
      return "No pudimos guardar tu registro por un problema de permisos. Intenta más tarde.";
    case "unavailable":
    case "deadline-exceeded":
      return "No pudimos confirmar tu registro por un problema de conexión. Revisa tu conexión e intenta de nuevo.";
    case "invalid-argument":
      return "Revisa los datos del formulario e intenta de nuevo.";
    case "resource-exhausted":
      return "Estamos recibiendo muchas solicitudes. Intenta de nuevo en unos momentos.";
    default:
      return "No pudimos guardar tus datos. Inténtalo de nuevo.";
  }
}
