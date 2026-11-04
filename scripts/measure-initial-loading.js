// Playwright CLI run-code function. Serve baseline on 4176 and candidate on 4173.
async (page) => {
  const browser = page.context().browser();
  const runs = [];
  const targets = [
    { label: "before", url: "http://localhost:4176/" },
    { label: "after", url: "http://localhost:4173/" },
  ];
  await page.goto("about:blank");

  for (const repeat of [1, 2, 3]) {
    for (const slow of [false, true]) {
      for (const target of targets) {
        const context = await browser.newContext({
          viewport: { width: 1440, height: 900 },
          deviceScaleFactor: 1,
        });
        try {
          const testPage = await context.newPage();
          const cdp = await context.newCDPSession(testPage);
          await cdp.send("Network.enable");
          await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
          await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
          if (slow) {
            await cdp.send("Network.emulateNetworkConditions", {
              offline: false,
              latency: 300,
              downloadThroughput: 128 * 1024,
              uploadThroughput: 64 * 1024,
              connectionType: "cellular3g",
            });
          }
          // Remove variable external network timing symmetrically. Visual checks
          // use normal fonts in separate runs, outside this measurement.
          await testPage.route("**/*", (route) =>
            new URL(route.request().url()).hostname === "localhost"
              ? route.continue()
              : route.abort(),
          );

          const requests = new Map();
          cdp.on("Network.requestWillBeSent", (event) => {
            requests.set(event.requestId, {
              path: new URL(event.request.url).pathname,
              type: event.type,
              body: 0,
              encoded: 0,
              start: event.timestamp,
            });
          });
          cdp.on("Network.dataReceived", (event) => {
            const request = requests.get(event.requestId);
            if (request) {
              request.body += event.dataLength;
              request.encoded += event.encodedDataLength;
            }
          });
          cdp.on("Network.responseReceived", (event) => {
            const request = requests.get(event.requestId);
            if (request) {
              request.status = event.response.status;
              request.encoding = event.response.headers["Content-Encoding"] || "identity";
            }
          });
          cdp.on("Network.loadingFinished", (event) => {
            const request = requests.get(event.requestId);
            if (request) {
              request.finished = true;
              request.transfer = event.encodedDataLength;
            }
          });
          await testPage.addInitScript(() => {
            window.__firstFrame = null;
            const timer = setInterval(() => {
              const video = document.querySelector(".video-hero__film--active");
              if (video && video.currentTime > 0.05) {
                window.__firstFrame = performance.now();
                clearInterval(timer);
              }
            }, 10);
          });

          const start = Date.now();
          await testPage.goto(target.url, { waitUntil: "commit" });
          const points = [];
          for (const sec of [3, 10, 20]) {
            await testPage.waitForTimeout(Math.max(0, start + sec * 1000 - Date.now()));
            const rows = [...requests.values()].filter((request) =>
              request.path.endsWith(".mp4") || request.path.endsWith(".js"),
            );
            const sum = (extension, transfer) => rows
              .filter((request) => request.path.endsWith(extension))
              .reduce((total, request) => total + (transfer
                ? (request.finished ? request.transfer : request.encoded)
                : request.body), 0);
            points.push({
              sec,
              elapsedMs: Date.now() - start,
              jsBody: sum(".js", false),
              jsTransfer: sum(".js", true),
              videoBody: sum(".mp4", false),
              videoTransfer: sum(".mp4", true),
              requests: JSON.parse(JSON.stringify(rows)),
            });
          }
          runs.push({
            label: target.label,
            repeat,
            slow,
            browser: browser.version(),
            points,
            firstFrameMs: await testPage.evaluate(() => window.__firstFrame),
          });
        } finally {
          await context.close();
        }
      }
    }
  }
  return runs;
}
