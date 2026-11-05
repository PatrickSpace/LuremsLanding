// Playwright CLI run-code function. Uses the approved prototype copy and opens
// the real modal without submitting. Change targets for published verification.
async (page) => {
  const targets = ["http://localhost:4173/", "http://localhost:4180/"];
  const widths = [374, 375, 390, 767, 768, 1023, 1024, 1279, 1280, 1439, 1440];
  const expectedTitles = ["Consigue nuevos pacientes", "Automatiza tus citas y recordatorios", "Deja los cobros en nuestras manos", "Comparte recursos para cada paciente"];
  const approvedCopy = ["Para psicólogos", "Más pacientes. Menos pendientes.", "Estamos creando Lurems para ayudarte a conseguir pacientes, automatizar tu consulta y acompañar cada proceso con recursos personalizados.", "Quiero sumarme como psicólogo", "Únete a la lista de acceso temprano. Te avisaremos cuando puedas probar Lurems.", "Funcionalidades previstas", "Tu consulta, organizada de principio a fin.", "Así queremos ayudarte cuando Lurems esté disponible.", "Consigue nuevos pacientes", "Crea tu perfil para que las personas que buscan atención puedan encontrarte según tu especialidad y forma de trabajar.", "Automatiza tus citas y recordatorios", "Tus pacientes podrán reservar según tu disponibilidad y recibir recordatorios automáticos antes de cada sesión.", "Deja los cobros en nuestras manos", "Lurems gestionará los cobros y te mostrará el estado de tus pagos, para que no tengas que perseguir cada pendiente.", "Comparte recursos para cada paciente", "Personaliza ejercicios, materiales y herramientas para que cada paciente pueda trabajarlos y consultarlos entre sesiones.", "Estas funcionalidades están en desarrollo y todavía no están disponibles."];
  const results = [];
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  for (const target of targets) {
    for (const width of widths) {
      const context = await page.context().browser().newContext({viewport: {width, height: width < 768 ? 844 : 1000}, reducedMotion: "reduce"});
      try {
        await context.routeWebSocket("**", () => {});
        // Keep automated checks out of production telemetry and block writes.
        await context.route(/https:\/\/.*(?:google-analytics\.com|analytics\.google\.com|cloudfunctions\.net|firestore\.googleapis\.com).*/, route => route.abort());
        const p = await context.newPage();
        const errors = [];
        p.on("pageerror", error => errors.push(error.message));
        await p.goto(target + "#para-psicologos");
        await p.evaluate(() => document.fonts.ready);
        const section = p.locator("#para-psicologos");
        const text = (await section.textContent()).replace(/\s+/g, " ").trim();
        for (const copy of approvedCopy) check(text.includes(copy), `Missing approved copy: ${copy}`);
        check(await section.locator("article").count() === 4, "Incorrect card count");
        check(JSON.stringify((await section.locator("article h4").allTextContents()).map(t => t.trim())) === JSON.stringify(expectedTitles), "Incorrect titles");
        check(await section.locator("ul").count() === 0, "Old benefit list retained");
        check(await section.locator(".professional-summary > .intro").count() === 1, "Summary must be one paragraph");
        check(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}`);
        const layout = await section.evaluate(el => {
          const summary = el.querySelector(".professional-summary").getBoundingClientRect();
          const features = el.querySelector(".professional-features").getBoundingClientRect();
          const grid = getComputedStyle(el.querySelector(".professional-grid")).gridTemplateColumns;
          const cards = getComputedStyle(el.querySelector(".professional-cards")).gridTemplateColumns;
          return {summaryFirst: summary.left < features.left || summary.top < features.top, gridColumns: grid.split(" ").length, cardColumns: cards.split(" ").length};
        });
        check(layout.summaryFirst, "Summary must precede features");
        check(layout.gridColumns === (width >= 1280 ? 2 : 1), "Wrong composition breakpoint");
        check(layout.cardColumns === (width >= 768 ? 2 : 1), "Wrong card breakpoint");
        const button = section.getByRole("button", {name: "Quiero sumarme como psicólogo", exact: true});
        await section.scrollIntoViewIfNeeded();
        await p.mouse.move(0, 0);
        check(await button.evaluate(el => getComputedStyle(el).backgroundColor) === "rgb(99, 88, 184)", "Wrong button normal color");
        await button.focus(); await p.keyboard.press("Tab"); await p.keyboard.press("Shift+Tab");
        check(await button.evaluate(el => el === document.activeElement && getComputedStyle(el).outlineWidth === "2px"), "Missing keyboard focus");
        if ([390,1440].includes(width)) {
          const scope = target.includes("4180") ? "release" : target.includes("https") ? "production" : "workspace";
          await section.screenshot({path: `output/playwright/psychologists-${scope}-${width}.png`, style: "header{visibility:hidden}"});
        }
        await button.hover();
        check(await button.evaluate(el => getComputedStyle(el).backgroundColor) === "rgb(77, 68, 160)", "Wrong hover color");
        await p.mouse.down();
        check(await button.evaluate(el => getComputedStyle(el).backgroundColor) === "rgb(56, 49, 136)", "Wrong active color");
        await p.mouse.up();
        const modal = p.locator('[class*="z-[100]"]');
        await modal.waitFor();
        check(await modal.locator("select").isVisible(), "Psychologist was not preselected");
        check(await modal.locator("select option:not([disabled])").count() === 4, "Professional options changed");
        await modal.getByRole("button", {name: "Cerrar", exact: true}).click();
        await button.focus(); await button.press("Enter");
        await modal.waitFor();
        check(await modal.locator("select").isVisible(), "Keyboard CTA lost professional preselection");
        await modal.getByRole("button", {name: "Cerrar", exact: true}).focus(); await p.keyboard.press("Enter");
        check(errors.length === 0, "Browser errors: " + errors.join(", "));
        results.push({target, width, ...layout, copy: "literal", CTA: "normal/hover/active/focus, mouse/keyboard and professional preselection passed"});
      } finally { await context.close(); }
    }
  }
  return {browser: page.context().browser().version(), cases: results.length, results, leadsSubmitted: 0};
}
