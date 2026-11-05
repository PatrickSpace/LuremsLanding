import { z } from "zod";

export function validateLead(data, psychologistProfileOptions) {
  const schema = z
    .object({
      nombre: z.string().trim().min(2, "Escribe tu nombre para continuar.").max(100, "Usa como máximo 100 caracteres"),
      email: z.string().trim().toLowerCase().min(5, "Revisa que tu correo esté completo y bien escrito.").max(254, "Revisa que tu correo esté completo y bien escrito.").email("Revisa que tu correo esté completo y bien escrito."),
      tipoUsuario: z.enum(["Paciente", "Psicólogo"]),
      perfilPsicologo: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.tipoUsuario === "Psicólogo" && !psychologistProfileOptions.includes(data.perfilPsicologo || "")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["perfilPsicologo"],
          message: "Selecciona la opción que mejor describe tu perfil.",
        });
      }
    });

  return schema.safeParse(data);
}
