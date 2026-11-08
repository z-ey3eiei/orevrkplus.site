import { base44 } from "@/api/base44Client";

/**
 * Single entry point for user-interaction tracking.
 * Never throws: analytics must not break the interface.
 * Properties accept strings, numbers, booleans or null only — no PII.
 */
export function track(eventName, properties = {}) {
  try {
    base44?.analytics?.track?.({ eventName, properties });
  } catch {
    /* analytics is best-effort */
  }
}