import type { Lead } from "./lead-schema";

/**
 * POINT D'INTÉGRATION — c'est le seul endroit à modifier pour brancher Airtable
 * puis n8n. Aucun composant, aucune page n'appelle un service externe : ils
 * passent tous par `getLeadSink()`.
 *
 * Flux visé :
 *   formulaire → server action → LeadSink → Airtable (base « Leads »)
 *                                        → n8n (notification + auto-réponse)
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

/**
 * Implémentation par défaut : journalise la candidature dans les logs Vercel.
 * Rien n'est perdu tant qu'Airtable n'est pas branché — les logs runtime sont
 * consultables via `vercel logs` ou le dashboard.
 */
const consoleLeadSink: LeadSink = {
  name: "console",
  async deliver(lead) {
    console.info(
      "[lead] nouvelle candidature",
      JSON.stringify(
        {
          submittedAt: lead.submittedAt,
          source: lead.source,
          fullName: lead.fullName,
          email: lead.email,
          profile: lead.profile,
          structureName: lead.structureName,
          siteUrl: lead.siteUrl,
          noSiteYet: lead.noSiteYet,
          pitch: lead.pitch,
          lookingFor: lead.lookingFor,
          needs: lead.needs,
          contentReadiness: lead.contentReadiness,
          timeline: lead.timeline,
          inspirations: lead.inspirations,
          budgetFit: lead.budgetFit,
        },
        null,
        2,
      ),
    );
  },
};

/*
 * ÉTAPE SUIVANTE — Airtable.
 * Ajouter les variables d'environnement AIRTABLE_TOKEN / AIRTABLE_BASE_ID /
 * AIRTABLE_TABLE (base « Leads », un champ par question), puis écrire un
 * `airtableLeadSink` respectant cette même interface et le retourner ci-dessous.
 * Rien d'autre dans le code n'aura besoin de changer.
 *
 * Idem pour n8n : soit un second sink appelé en parallèle, soit une automation
 * Airtable déclenchée à la création de l'enregistrement.
 */

export function getLeadSink(): LeadSink {
  return consoleLeadSink;
}
