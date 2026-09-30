/**
 * Émission d'événements produit côté client.
 *
 * PostHog est initialisé dans `instrumentation-client.ts` sur l'instance
 * importée de `posthog-js` : il ne s'expose pas sur `window.posthog`, c'est donc
 * cette instance qu'il faut appeler. Tant que PostHog n'est pas chargé (token
 * absent, visiteur interne), l'appel se tait.
 */

import posthog from "posthog-js";

export type TrackEvent =
  | "form_view"
  | "form_step_1"
  | "form_step_2"
  | "form_step_3"
  | "form_submit";

export type TrackProps = Record<string, string | number | boolean | undefined>;

export function track(event: TrackEvent, props?: TrackProps): void {
  if (typeof window === "undefined") return;

  if (posthog.__loaded) {
    posthog.capture(event, props);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug("[track]", event, props ?? {});
  }
}
