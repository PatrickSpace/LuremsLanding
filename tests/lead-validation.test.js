import assert from "node:assert/strict";
import test from "node:test";
import { validateLead } from "../src/services/lead-validation.js";
import { getLeadErrorMessage } from "../src/services/lead-errors.js";

const profiles = [
  "Psicólogo clínico independiente",
  "Psicólogo clínico dependiente",
  "Psicólogo con otra especialidad",
  "No soy psicólogo pero me interesa el proyecto",
];
const lead = { nombre: "Persona sintética", email: "persona@example.test", tipoUsuario: "Paciente", perfilPsicologo: "" };

test("normaliza antes de validar en ambos tipos, conservando aliases", () => {
  for (const tipoUsuario of ["Paciente", "Psicólogo"]) {
    for (const email of ["persona@example.test", "PERSONA@EXAMPLE.TEST", "  Persona@Example.Test  ", "\tPersona@Example.Test\n"]) {
      const parsed = validateLead({ ...lead, email, tipoUsuario, perfilPsicologo: profiles[0] }, profiles);
      assert.equal(parsed.success, true);
      assert.equal(parsed.data.email, "persona@example.test");
    }
  }
  assert.equal(validateLead({ ...lead, email: "  Persona+Etiqueta@Example.Test " }, profiles).data.email, "persona+etiqueta@example.test");
});

test("mantiene validaciones de correo, nombre y tipo y los límites de escritura", () => {
  for (const data of [
    { email: "   " }, { email: "sin-arroba" }, { email: "persona @example.test" },
    { email: `${"a".repeat(250)}@example.test` },
    { nombre: " " }, { nombre: "A" }, { nombre: "a".repeat(101) },
    { tipoUsuario: "Otro" },
  ]) assert.equal(validateLead({ ...lead, ...data }, profiles).success, false);
  assert.equal(validateLead({ ...lead, nombre: "  Persona sintética  " }, profiles).data.nombre, lead.nombre);
});

test("psicólogo exige un perfil permitido incluso después de validar paciente", () => {
  assert.equal(validateLead(lead, profiles).success, true);
  for (const perfilPsicologo of [undefined, "", "Perfil inventado"]) {
    const result = validateLead({ ...lead, tipoUsuario: "Psicólogo", perfilPsicologo }, profiles);
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].path[0], "perfilPsicologo");
  }
  for (const perfilPsicologo of profiles) {
    const result = validateLead({ ...lead, tipoUsuario: "Psicólogo", perfilPsicologo }, profiles);
    assert.equal(result.success, true);
    assert.equal(result.data.perfilPsicologo, perfilPsicologo);
  }
});

test("los fallos técnicos no se interpretan como disponibilidad o duplicado", () => {
  assert.match(getLeadErrorMessage({ code: "permission-denied" }), /permisos/);
  for (const code of ["unavailable", "deadline-exceeded"]) {
    assert.match(getLeadErrorMessage({ code }), /conexión/);
  }
  for (const error of [null, new Error("Fallo sintético"), { code: 14 }, { code: "unknown" }, { code: "permission-denied" }, { code: "unavailable" }]) {
    assert.doesNotMatch(getLeadErrorMessage(error), /disponible|Ya te has registrado|registrado con éxito/);
    assert.doesNotMatch(getLeadErrorMessage(error), /Fallo sintético/);
  }
});

test("solo el contrato explícito de duplicado muestra los mensajes aprobados", () => {
  for (const [types, message] of [
    [["Paciente"], "Ya te has registrado con este correo como paciente."],
    [["Psicólogo"], "Ya te has registrado con este correo como psicólogo."],
    [["Paciente", "Psicólogo"], "Ya te has registrado con este correo como paciente y psicólogo."],
  ]) {
    assert.equal(getLeadErrorMessage({code: "functions/already-exists", details: {kind: "duplicate", types}}), message);
  }
  for (const error of [
    {code: "functions/permission-denied", details: {kind: "duplicate", types: ["Paciente"]}},
    {code: "functions/unavailable", details: {kind: "duplicate", types: ["Paciente"]}},
    {code: "functions/already-exists"},
    {code: "functions/already-exists", details: {kind: "duplicate", types: []}},
    {code: "functions/already-exists", details: {kind: "duplicate", types: ["Paciente", "Paciente"]}},
    {code: "functions/already-exists", details: {kind: "duplicate", types: ["Otro"]}},
    {code: "functions/internal", message: "Ya te has registrado con este correo como paciente."},
  ]) assert.doesNotMatch(getLeadErrorMessage(error), /Ya te has registrado/);
});
