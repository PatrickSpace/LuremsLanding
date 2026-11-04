import { initializeAnalytics, isSupported, logEvent } from "firebase/analytics";
import { firebaseApp } from "./firebase.js";

const analyticsAllowedHosts = [
  "lurems.lat",
  "www.lurems.lat",
  "luremslanding.web.app",
  "luremslanding.firebaseapp.com",
];

// Una única inicialización compartida: cada llamada conserva su evento mientras espera.
// Router es dueño de page_view; se evita el evento automático adicional del SDK.
const analyticsPromise =
  import.meta.env.PROD &&
  typeof window !== "undefined" &&
  analyticsAllowedHosts.includes(window.location.hostname)
    ? isSupported()
        .then((supported) => supported
          ? initializeAnalytics(firebaseApp, { config: { send_page_view: false } })
          : null)
        .catch(() => null)
    : Promise.resolve(null);

function cleanParams(params) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}

export async function trackEvent(name, params = {}) {
  try {
    const analytics = await analyticsPromise;
    if (!analytics) return;

    logEvent(analytics, name, cleanParams(params));
  } catch {
    // Analytics should never block the landing experience.
  }
}

export function trackPageView(route) {
  const pagePath = route?.fullPath || window.location.pathname + window.location.hash;
  const pageLocation = new URL(pagePath, window.location.origin).href;

  trackEvent("page_view", {
    page_location: pageLocation,
    page_path: pagePath,
    page_title: document.title,
  });
}
