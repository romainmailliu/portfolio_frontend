import posthog from "posthog-js";
import { isInternalVisitor } from "./src/lib/internal-visitor";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!token) {
  if (process.env.NODE_ENV !== "production") {
    console.error(
      "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, " +
        "this causes events to be silently missed. " +
        "This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
    );
  }
} else if (!isInternalVisitor()) {
  posthog.init(token, {
    api_host: "/ingest",
    ui_host: host ?? "https://eu.posthog.com",
    defaults: "2026-01-30",
    // Mesure d'audience sans cookie ni stockage local : pas de bandeau de
    // consentement à afficher (exemption CNIL). Exige « Cookieless tracking »
    // activé dans PostHog (Settings > Web analytics), sinon les événements
    // sont ignorés à l'ingestion.
    cookieless_mode: "always",
    person_profiles: "never",
    // Le replay et les sondages sortent de l'exemption et pèsent ~100 Ko de JS.
    disable_session_recording: true,
    disable_surveys: true,
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}
