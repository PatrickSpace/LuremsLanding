// Playwright CLI run-code function. Run against the isolated Vite server on 4173.
// Functions and Analytics are doubles; this does NOT test database deduplication.
async (page) => {
  const browser = page.context().browser();
  const results = [];
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const profile = "Psicólogo clínico independiente";

  for (const width of [375, 390, 1280, 1440]) {
    for (const origin of ["home-inline", "modal"]) {
      const context = await browser.newContext({ viewport: { width, height: width < 768 ? 812 : 900 }, reducedMotion: "reduce" });
      try {
        await context.addInitScript(() => {
          window.__leadChecks = { writes: [], events: [], mode: "permission-denied" };
        });
        // Never load the actual environment configuration or call Firebase.
        await context.route("**/src/services/firebase.js", route => route.fulfill({
          contentType: "application/javascript", body: "export const firebaseApp = {};",
        }));
        await context.route("**/src/services/analytics.js", route => route.fulfill({
          contentType: "application/javascript", body: `
            export function trackEvent(name, params) { window.__leadChecks.events.push({name, params}); }
            export function trackPageView() {}
          `,
        }));
        await context.route("**/node_modules/.vite/deps/firebase_functions.js*", route => route.fulfill({
          contentType: "application/javascript", body: `
            export const getFunctions = () => ({});
            export const connectFunctionsEmulator = () => {};
            export const httpsCallable = () => async (data) => {
              const state = window.__leadChecks;
              state.writes.push({data});
              await new Promise(resolve => { state.resolve = resolve; });
              if (state.mode !== "success") throw {code: "functions/" + state.mode};
              return {data: {status: "created"}};
            }
          `,
        }));
        await context.route(/https:\/\/.*(?:googleapis\.com|firebaseio\.com|google-analytics\.com|googletagmanager\.com).*/, route => {
          if (route.request().url().startsWith("https://fonts.googleapis.com/")) return route.continue();
          throw new Error("Unexpected remote service request");
        });
        const p = await context.newPage();
        await p.goto("http://127.0.0.1:4173/");
        if (origin === "modal") {
          await p.getByRole("button", {name: "Quiero recibir novedades como psicólogo", exact: true}).last().click();
        }
        const form = p.locator("form").last();
        const submit = form.locator('button[type="submit"]');
        const patient = form.getByRole("button", {name: /Paciente/});
        const psychologist = form.getByRole("button", {name: /Psicólogo/});
        const name = form.getByRole("textbox", {name: "Tu nombre", exact: true});
        const email = form.getByRole("textbox", {name: "Correo electrónico", exact: true});
        await patient.click();
        await form.scrollIntoViewIfNeeded();
        await form.screenshot({path: `output/playwright/${origin}-${width}-normal.png`});
        await psychologist.hover();
        await psychologist.click();
        await submit.click();
        await form.getByText("Selecciona la opción que mejor describe tu perfil.", {exact: true}).waitFor();
        check(await form.getByRole("combobox").evaluate(el => el === document.activeElement), "Focus must reach invalid profile");
        check(await form.locator('[aria-invalid="true"]').count() === 3, "All required fields must be marked invalid");
        await form.screenshot({path: `output/playwright/${origin}-${width}-validation.png`});
        await form.getByRole("combobox").selectOption(profile);
        await patient.click();
        await psychologist.click();
        check(await form.getByRole("combobox").inputValue() === profile, "Switching types must preserve profile");
        await name.fill("  Persona sintética  ");
        await email.fill("  Persona@Example.Test  ");
        await submit.click();
        await form.getByText("Guardando tus datos…", {exact: true}).waitFor();
        check(await submit.isDisabled() && await email.isDisabled(), "Pending submission must disable editing");
        // Two simultaneous DOM submits in the same component must not enqueue writes.
        await form.evaluate(el => {
          el.requestSubmit();
          el.requestSubmit();
        });
        await p.waitForFunction(() => !!window.__leadChecks.resolve, null, {timeout: 10000}).catch(async () => {
          throw new Error(JSON.stringify(await p.evaluate(() => ({mode: window.__leadChecks.mode, writes: window.__leadChecks.writes.length, text: document.querySelector("form").innerText}))));
        });
        check(await p.evaluate(() => window.__leadChecks.writes.length) === 1, "Instance guard failed");
        await form.screenshot({path: `output/playwright/${origin}-${width}-loading.png`});
        await p.evaluate(() => window.__leadChecks.resolve());
        await form.getByRole("alert").filter({hasText: /permisos/}).waitFor();
        check(await email.isEnabled(), "Error must allow correcting email");
        check((await name.inputValue()).trim() === "Persona sintética", "Error must retain name");
        check(await form.getByRole("combobox").inputValue() === profile, "Error must retain profile");
        check(await form.getByRole("alert").evaluate(el => el === document.activeElement), "Technical error must receive focus");
        await p.keyboard.press("Tab");
        check(await submit.evaluate(el => el === document.activeElement), "Retry must be reachable by keyboard");
        await form.screenshot({path: `output/playwright/${origin}-${width}-permissions.png`});
        check(await p.getByText("Ya estás en la lista.", {exact: true}).count() === 0, "Error must not show success");
        check(await p.evaluate(() => window.__leadChecks.events.every(e => e.name !== "generate_lead")), "Error must not emit conversion");
        if (origin === "modal") check(await p.locator('[class*="z-[100]"]').getByRole("heading", {name: "Recibe un aviso cuando puedas conocer Lurems."}).isVisible(), "Error must keep modal open");

        await email.fill("OTRA@EXAMPLE.TEST");
        check(await form.getByRole("alert").count() === 0, "Correction must clear stale error");
        await patient.click();
        await p.evaluate(() => { window.__leadChecks.mode = "unavailable"; window.__leadChecks.resolve = null; });
        await submit.click();
        await p.waitForFunction(() => !!window.__leadChecks.resolve, null, {timeout: 10000}).catch(async () => {
          throw new Error(JSON.stringify(await p.evaluate(() => ({mode: window.__leadChecks.mode, writes: window.__leadChecks.writes.length, text: document.querySelector("form").innerText}))));
        });
        await p.evaluate(() => window.__leadChecks.resolve());
        await form.getByRole("alert").filter({hasText: /conexión/}).waitFor();
        check(await p.evaluate(() => window.__leadChecks.writes[1].data.perfilPsicologo) === "", "Patient write must omit retained professional profile");

        const layout = await form.evaluate(el => {
          const r = el.getBoundingClientRect();
          return {left: r.left, right: r.right, top: r.top, bottom: r.bottom, viewport: innerHeight,
            overflow: document.documentElement.scrollWidth > innerWidth,
            font: getComputedStyle(el).fontFamily};
        });
        check(!layout.overflow && layout.left >= 0 && layout.right <= width, "Horizontal overflow");
        if (origin === "modal") check(layout.top >= 0 && layout.bottom <= layout.viewport, "Modal form clipped");

        await psychologist.click();
        check(await form.getByRole("combobox").inputValue() === profile, "Second type change lost profile");
        await p.evaluate(() => { window.__leadChecks.mode = "success"; window.__leadChecks.resolve = null; });
        await submit.click();
        await p.waitForFunction(() => !!window.__leadChecks.resolve, null, {timeout: 10000}).catch(async () => {
          throw new Error(JSON.stringify(await p.evaluate(() => ({mode: window.__leadChecks.mode, writes: window.__leadChecks.writes.length, text: document.querySelector("form").innerText}))));
        });
        await p.evaluate(() => window.__leadChecks.resolve());
        await p.getByText("Ya estás en la lista.", {exact: true}).waitFor();
        const state = await p.evaluate(() => ({writes: window.__leadChecks.writes, events: window.__leadChecks.events}));
        check(state.writes[0].data.email === "persona@example.test", "Email must be normalized before write");
        check(state.writes[0].data.nombre === "Persona sintética", "Name must be trimmed");
        check(state.writes[0].data.perfilPsicologo === profile, "Professional write lost profile");
        check(state.writes[2].data.email === "otra@example.test", "Corrected email not normalized");
        check(state.writes.every(w => w.data.origenFormulario === origin), "Wrong form origin");
        check(state.events.filter(e => e.name === "generate_lead").length === 1, "Only confirmed success may emit conversion");
        check(!/example\.test|Persona sintética/.test(JSON.stringify(state.events)), "Personal data in Analytics");
        await p.screenshot({path: `output/playwright/${origin}-${width}-success.png`});
        if (origin === "modal") await p.locator('[class*="z-[100]"]').getByRole("heading", {name: "Recibe un aviso cuando puedas conocer Lurems."}).waitFor({state: "hidden"});
        results.push({width, origin, passed: true, layout});
      } finally {
        await context.close();
      }
    }
  }
  return {browser: browser.version(), results, deduplication: "Covered separately by emulator integration tests"};
}
