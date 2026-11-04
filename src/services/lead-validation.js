import { z } from "zod";

export function validateLead(data, psychologistProfileOptions) {
  const schema = z
    .object({
      nombre: z.string().min(2, "Nombre requerido"),
      email: z.string().email("Email inválido"),
      tipoUsuario: z.enum(["Paciente", "Psicólogo"]),
      perfilPsicologo: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.tipoUsuario === "Psicólogo" && !psychologistProfileOptions.includes(data.perfilPsicologo || "")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["perfilPsicologo"],
          message: "Selecciona una opción",
        });
      }
    });

  return schema.safeParse(data);
}
