"use server";

import { headers } from "next/headers";
import {
  leadSchema,
  toFieldErrors,
  type FieldErrors,
  type LeadInput,
} from "../../lib/leads/lead-schema";
import { getLeadSink } from "../../lib/leads/lead-sink";
import {
  clientIpFromHeaders,
  consumeLeadRateLimit,
} from "../../lib/leads/rate-limit";

export type SubmitResult =
  | { ok: true }
  | { ok: false; formError?: string; fieldErrors?: FieldErrors };

/** Payload attendu : les réponses + le pot de miel. */
export type CandidaturePayload = LeadInput & {
  /** Honeypot — invisible pour les humains, rempli par les bots. */
  website?: string;
};

export async function submitCandidature(
  payload: CandidaturePayload,
): Promise<SubmitResult> {
  // 1. Pot de miel : on renvoie un succès silencieux pour ne rien apprendre au bot.
  if (payload?.website) {
    return { ok: true };
  }

  // 2. Limite par IP.
  const requestHeaders = await headers();
  const ip = clientIpFromHeaders(requestHeaders);
  if (!consumeLeadRateLimit(ip)) {
    return {
      ok: false,
      formError:
        "Vous avez déjà envoyé plusieurs candidatures. Réessayez dans une heure.",
    };
  }

  // 3. Validation serveur complète — le client n'est jamais cru sur parole.
  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      formError: "Complétez les champs signalés ci-dessous.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  // 4. Livraison via le point d'intégration isolé.
  try {
    await getLeadSink().deliver({
      ...parsed.data,
      submittedAt: new Date().toISOString(),
      source: "/site-vitrine",
    });
  } catch (error) {
    console.error("[lead] échec de livraison", error);
    return {
      ok: false,
      formError:
        "L'envoi a échoué de mon côté. Réessayez dans un instant, ou écrivez-moi depuis la page Contact.",
    };
  }

  return { ok: true };
}
