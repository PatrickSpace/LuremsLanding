import { logEvent } from "firebase/analytics";
import { analyticsPromise } from "./firebase.js";

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
