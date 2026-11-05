// Playwright CLI run-code function. Serve the repository locally on 4175.
async (page) => {
  const browser = page.context().browser();
  const results = [];
  for (const width of [375, 390, 1280, 1440]) {
    for (const variant of ["paciente", "psicologo"]) {
      for (const fallback of [false, true]) {
        const context = await browser.newContext({viewport: {width, height: 900}, reducedMotion: "reduce"});
        try {
          if (fallback) {
            await context.route(/\.(png|woff2?)(\?.*)?$|fonts\.googleapis\.com/, route => route.abort());
          }
          const p = await context.newPage();
          await p.goto(`http://127.0.0.1:4175/docs/email/registro-anticipado-${variant}.preview.html`);
          await p.getByRole("heading", {level: 1}).waitFor();
          await p.evaluate(() => document.fonts.ready);
          const measurements = await p.evaluate(() => ({
            overflow: document.documentElement.scrollWidth > innerWidth,
            image: [...document.images].every(img => img.complete && img.naturalWidth > 0),
            text: document.body.innerText,
            heading: getComputedStyle(document.querySelector("h1")).color,
          }));
          if (measurements.overflow) throw new Error(`Overflow ${variant} at ${width}`);
          if (!fallback && !measurements.image) throw new Error("Official logo failed to load");
          if (!measurements.text.includes("Te avisaremos cuando la app esté lista.")) throw new Error("Missing future notification");
          if (/app\.lurems|cuenta lista|registro profesional aprobado/i.test(measurements.text)) throw new Error("Incorrect account messaging");
          if (measurements.heading !== "rgb(26, 58, 56)") throw new Error("Incorrect heading token");
          const link = p.getByRole("link", {name: "Conoce el proyecto", exact: true});
          if (await link.getAttribute("href") !== "https://lurems.lat/") throw new Error("Wrong call to action");
          await link.hover();
          await p.getByRole("link").first().focus();
          await p.keyboard.press("Tab");
          if (!await link.evaluate(element => element === document.activeElement)) throw new Error("Keyboard navigation failed");
          await p.screenshot({path: `output/playwright/email-${variant}-${width}${fallback ? "-fallback" : ""}.png`, fullPage: true});
          results.push({width, variant, fallback, passed: true});
        } finally { await context.close(); }
      }
    }
  }
  return {browser: browser.version(), cases: results.length, results};
}
