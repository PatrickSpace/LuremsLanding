// Playwright CLI run-code function. Vite on 4173 must use the synthetic demo
// configuration and VITE_USE_FIREBASE_EMULATORS=true. Functions/Firestore are real
// local emulators; only Analytics is replaced to capture outgoing event params.
async (page) => {
  const browser = page.context().browser();
  const endpoint = "http://127.0.0.1:5001/demo-luremslanding/us-central1/submitLead";
  const profile = "Psicólogo clínico independiente";
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  const results = [];
  const prefix = `browser-${Date.now()}`;
  let serial = 0;

  async function createContext(width) {
    const context = await browser.newContext({viewport: {width, height: width < 768 ? 812 : 900}, reducedMotion: "reduce"});
    await context.addInitScript(() => { window.__leadEvents = []; });
    await context.route("**/src/services/analytics.js", route => route.fulfill({
      contentType: "application/javascript", body: `
        export function trackEvent(name, params) { window.__leadEvents.push({name, params}); }
        export function trackPageView() {}
      `,
    }));
    return context;
  }

  async function openForm(p, origin, type) {
    await p.goto("http://127.0.0.1:4173/");
    if (origin === "modal") await p.getByRole("button", {name: "Quiero recibir novedades como psicólogo", exact: true}).last().click();
    const form = p.locator("form").last();
    await form.getByRole("button", {name: new RegExp(type)}).click();
    return form;
  }

  for (const width of [375, 390, 1280, 1440]) {
    for (const origin of ["home-inline", "modal"]) {
      const context = await createContext(width);
      try {
        let checkedModalDelay = false;
        for (const existing of [[], ["Paciente"], ["Psicólogo"], ["Paciente", "Psicólogo"]]) {
          for (const type of ["Paciente", "Psicólogo"]) {
            const email = `${prefix}-${++serial}@example.test`;
            for (const tipoUsuario of existing) {
              const seed = await context.request.post(endpoint, {data: {data: {
                nombre: "Histórico sintético", email, tipoUsuario, perfilPsicologo: profile,
                origenFormulario: origin, pagePath: "/",
              }}});
              check(seed.status() === 200, "Failed to create emulator fixture");
            }
            const p = await context.newPage();
            const form = await openForm(p, origin, type);
            await form.getByRole("textbox", {name: "Tu nombre", exact: true}).fill("Persona sintética");
            const emailInput = form.getByRole("textbox", {name: "Correo electrónico", exact: true});
            await emailInput.fill(` ${email.toUpperCase()} `);
            if (type === "Psicólogo") await form.getByRole("combobox").selectOption(profile);
            await form.locator('button[type="submit"]').click();
            const duplicate = existing.includes(type);
            if (duplicate) {
              const message = existing.length === 2
                ? "Ya te has registrado con este correo como paciente y psicólogo."
                : `Ya te has registrado con este correo como ${type.toLowerCase()}.`;
              await form.getByRole("alert").filter({hasText: message}).waitFor();
              check(await form.getByRole("alert").innerText() === message, "Wrong duplicate message");
              check(await form.getByRole("alert").evaluate(el => document.activeElement === el), "Duplicate alert lacks focus");
              check((await emailInput.inputValue()).trim().toLowerCase() === email, "Duplicate cleared email");
              check(await form.getByRole("textbox", {name: "Tu nombre", exact: true}).inputValue() === "Persona sintética", "Duplicate cleared name");
              check(await p.getByText("Ya estás en la lista.", {exact: true}).count() === 0, "Duplicate showed success");
              check(await p.evaluate(() => window.__leadEvents.every(e => e.name !== "generate_lead")), "Duplicate emitted conversion");
              if (origin === "modal" && !checkedModalDelay) {
                await p.waitForTimeout(1600);
                check(await p.locator('[class*="z-[100]"]').getByRole("heading", {name: "Recibe un aviso cuando puedas conocer Lurems."}).isVisible(), "Duplicate closed modal / emitted submitted");
                checkedModalDelay = true;
              }
              const layout = await form.evaluate(el => {
                const r = el.getBoundingClientRect();
                return {overflow: document.documentElement.scrollWidth > innerWidth, left: r.left, right: r.right, top: r.top, bottom: r.bottom, height: innerHeight};
              });
              check(!layout.overflow && layout.left >= 0 && layout.right <= width, "Duplicate horizontal overflow");
              if (origin === "modal") check(layout.top >= 0 && layout.bottom <= layout.height, "Duplicate modal clipped");
              const state = existing.length === 2 ? "both" : type === "Paciente" ? "patient" : "psychologist";
              await form.screenshot({path: `output/playwright/functions-${origin}-${width}-${state}.png`});
              // A different type can be selected without clearing the professional profile.
              await form.getByRole("button", {name: new RegExp(type === "Paciente" ? "Psicólogo" : "Paciente")}).click();
              check(await form.getByRole("alert").count() === 0, "Changing type retained obsolete duplicate");
              if (type === "Psicólogo") {
                await form.getByRole("button", {name: /Psicólogo/}).click();
                check(await form.getByRole("combobox").inputValue() === profile, "Profile lost after duplicate");
              }
              await emailInput.fill(`${prefix}-correction-${serial}@example.test`);
              check(await emailInput.isEnabled(), "Duplicate prevents correcting email");
            } else {
              await p.getByText("Ya estás en la lista.", {exact: true}).waitFor();
              check(await p.evaluate(() => window.__leadEvents.filter(e => e.name === "generate_lead").length) === 1, "Confirmed creation did not emit conversion once");
              if (origin === "modal") await p.locator('[class*="z-[100]"]').getByRole("heading", {name: "Recibe un aviso cuando puedas conocer Lurems."}).waitFor({state: "hidden"});
            }
            check(await p.evaluate(() => !/example\.test|Persona sintética|Histórico sintético/.test(JSON.stringify(window.__leadEvents))), "PII in Analytics");
            results.push({width, origin, existing, requested: type, outcome: duplicate ? "duplicate" : "created"});
            await p.close();
          }
        }
      } finally { await context.close(); }
    }
  }

  // Independent browser contexts model separate devices/tabs, with the real callable.
  const contexts = [await createContext(375), await createContext(1440)];
  try {
    const email = `${prefix}-simultaneous@example.test`;
    const pages = await Promise.all(contexts.map(context => context.newPage()));
    const forms = await Promise.all(pages.map(p => openForm(p, "modal", "Paciente")));
    for (const form of forms) {
      await form.getByRole("textbox", {name: "Tu nombre", exact: true}).fill("Persona sintética");
      await form.getByRole("textbox", {name: "Correo electrónico", exact: true}).fill(email);
    }
    await Promise.all(forms.map(form => form.locator('button[type="submit"]').click()));
    await Promise.all(pages.map(p => p.getByText(/Ya estás en la lista.|Ya te has registrado con este correo como paciente\./).waitFor()));
    const conversions = await Promise.all(pages.map(p => p.evaluate(() => window.__leadEvents.filter(e => e.name === "generate_lead").length)));
    check(conversions.reduce((a,b) => a+b, 0) === 1, "Separate clients produced multiple conversions");
    check((await Promise.all(forms.map(form => form.getByRole("alert").count()))).reduce((a,b) => a+b, 0) === 1, "Missing loser duplicate across clients");
  } finally { await Promise.all(contexts.map(context => context.close())); }
  return {browser: browser.version(), cases: results.length, results, independentClients: "passed", backend: "local Functions + Firestore emulators"};
}
