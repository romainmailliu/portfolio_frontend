import { isEmailConfigured, sendNotification } from "../email/resend";
import type { Lead } from "./lead-schema";

/**
 * POINT D'INTÉGRATION — c'est le seul endroit à modifier pour brancher un autre
 * service. Aucun composant, aucune page n'appelle un service externe : ils
 * passent tous par `getLeadSink()`.
 *
 * Flux actuel :
 *   formulaire → server action → LeadSink → Resend (notification email)
 *
 * Airtable / n8n viendraient s'ajouter ici, en second sink ou en remplacement.
 */

/** Candidature enrichie des métadonnées serveur. */
export type LeadRecord = Lead & {
  submittedAt: string;
  /** Origine de la soumission, utile si d'autres pages réutilisent le formulaire. */
  source: string;
};

export interface LeadSink {
  readonly name: string;
  deliver(lead: LeadRecord): Promise<void>;
}

/** Rend le formulaire lisible en texte brut, dans l'ordre des trois écrans. */
function formatLead(lead: LeadRecord): string {
  const line = (label: string, value: string | undefined) =>
    value ? `${label} : ${value}` : null;

  return [
    "— Vous —",
    line("Nom", lead.fullName),
    line("Email", lead.email),
    line("Profil", lead.profile),
    line("Structure", lead.structureName),
    line("Site existant", lead.noSiteYet ? "pas encore de site" : lead.siteUrl),
    "",
    "— Le projet —",
    line("Pitch", lead.pitch),
    line("Offre visée", lead.lookingFor),
    line("Besoins", lead.needs.length ? lead.needs.join(", ") : undefined),
    "",
    "— Le cadrage —",
    line("Contenus", lead.contentReadiness),
    line("Échéance", lead.timeline),
    line("Références", lead.inspirations),
    line("Budget", lead.budgetFit),
    "",
    "— Métadonnées —",
    line("Envoyée le", lead.submittedAt),
    line("Depuis", lead.source),
  ]
    .filter((entry) => entry !== null)
    .join("\n");
}

/** Notification email — le mode nominal. */
const resendLeadSink: LeadSink = {
  name: "resend",
  async deliver(lead) {
    await sendNotification({
      subject: `Candidature — ${lead.fullName}${
        lead.structureName ? ` (${lead.structureName})` : ""
      }`,
      text: formatLead(lead),
      // Répondre à l'email suffit à écrire au candidat.
      replyTo: lead.email,
    });
  },
};

/**
 * Repli quand `RESEND_API_KEY` est absente : la candidature part dans les logs
 * plutôt que d'être perdue. En production c'est une anomalie de configuration —
 * on la journalise en `error` pour qu'elle remonte dans Vercel, sinon le
 * formulaire afficherait « Reçu » sans que rien ne parte.
 */
const consoleLeadSink: LeadSink = {
  name: "console",
  async deliver(lead) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[lead] RESEND_API_KEY absente — candidature conservée dans les logs uniquement",
      );
    }
    console.info("[lead] nouvelle candidature\n" + formatLead(lead));
  },
};

export function getLeadSink(): LeadSink {
  return isEmailConfigured() ? resendLeadSink : consoleLeadSink;
}
