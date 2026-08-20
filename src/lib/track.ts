/**
 * Émission d'événements produit côté client.
 *
 * Aucun tracker n'est chargé sur le site public pour l'instant : cette fonction
 * détecte le premier sink disponible et se tait sinon. Brancher PostHog
 * (`posthog-js`) ou un GTM plus tard ne demande aucune modification des appelants.
 */

export type TrackEvent =
  | "form_view"
  | "form_step_1"
  | "form_step_2"
  | "form_step_3"
  | "form_submit";

export type TrackProps = Record<string, string | number | boolean | undefined>;

type PostHogLike = { capture?: (event: string, props?: TrackProps) => void };

export function track(event: TrackEvent, props?: TrackProps): void {
  if (typeof window === "undefined") return;

  const w = window as typeof window & {
    posthog?: PostHogLike;
    dataLayer?: unknown[];
  };

  if (typeof w.posthog?.capture === "function") {
    w.posthog.capture(event, props);
    return;
  }

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...props });
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug("[track]", event, props ?? {});
  }
}
