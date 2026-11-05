import { z } from "zod";

export const userTypes = ["Paciente", "Psicólogo"];
export const psychologistProfiles = [
  "Psicólogo clínico independiente",
  "Psicólogo clínico dependiente",
  "Psicólogo con otra especialidad",
  "No soy psicólogo pero me interesa el proyecto",
];

const leadSchema = z.strictObject({
  nombre: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().min(5).max(254).email(),
  tipoUsuario: z.enum(userTypes),
  perfilPsicologo: z.string().trim().default(""),
  origenFormulario: z.enum(["modal", "home-inline"]),
  pagePath: z.string().min(1).max(200).regex(/^\/[^?#]*$/),
}).superRefine((lead, context) => {
  if (lead.tipoUsuario === "Psicólogo" && !psychologistProfiles.includes(lead.perfilPsicologo)) {
    context.addIssue({ code: "custom", path: ["perfilPsicologo"], message: "Selecciona una opción" });
  }
}).transform(lead => ({
  ...lead,
  perfilPsicologo: lead.tipoUsuario === "Paciente" ? "" : lead.perfilPsicologo,
}));

export function validateLeadRequest(data) {
  return leadSchema.safeParse(data);
}

export function duplicateMessage(types) {
  if (types.length === 2) return "Ya te has registrado con este correo como paciente y psicólogo.";
  return types[0] === "Paciente"
    ? "Ya te has registrado con este correo como paciente."
    : "Ya te has registrado con este correo como psicólogo.";
}
