import { writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

// Synthetic emulator-only config. Never read or overwrite existing local secrets.
for (const [path, value] of [
  ["../functions/.env.demo-luremslanding", "EARLY_ACCESS_SMTP_USER=synthetic-sender@example.test\n"],
  ["../functions/.secret.local", "EARLY_ACCESS_SMTP_PASSWORD=synthetic-emulator-only\n"],
]) {
  try { await writeFile(new URL(path, import.meta.url), value, {flag: "wx", mode: 0o600}); }
  catch (error) { if (error.code !== "EEXIST") throw error; }
}

const child = spawn("firebase", [
  "emulators:exec", "--project", "demo-luremslanding", "--only", "firestore,functions", "npm --prefix functions test",
], {cwd: new URL("../", import.meta.url), stdio: "inherit"});
child.on("error", error => { console.error(error.message); process.exitCode = 1; });
child.on("exit", (code, signal) => { process.exitCode = code ?? (signal ? 1 : 0); });
