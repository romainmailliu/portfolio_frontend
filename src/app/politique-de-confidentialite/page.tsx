import type { Metadata } from "next";
import LegalPage, { LegalSection } from "../../components/LegalPage";
import { legalUpdatedAt, publisher } from "../../data/legal-content";
import { pageOpenGraph } from "../../lib/seo";

const title = "Politique de confidentialité";
const description =
  "Quelles données romainmailliu.com collecte, pourquoi, combien de temps elles sont conservées et comment exercer vos droits.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/politique-de-confidentialite",
  },
  openGraph: pageOpenGraph({
    title: `${title} | Romain Mailliu`,
    description,
    url: "/politique-de-confidentialite",
  }),
};

const mailto = (
  <a href={`mailto:${publisher.email}`} className="underline underline-offset-2">
    {publisher.email}
  </a>
);

export default function ConfidentialitePage() {
  return (
    <LegalPage title={title} updatedAt={legalUpdatedAt}>
      <LegalSection title="Responsable du traitement">
        <p>
          {publisher.name}, joignable à {mailto}.
        </p>
      </LegalSection>

      <LegalSection title="Formulaire de contact">
        <p>
          Données collectées : votre email, et si vous les renseignez votre
          téléphone et votre message.
        </p>
        <p>
          Finalité : vous répondre et échanger sur votre projet. Base légale :
          les mesures précontractuelles prises à votre demande.
        </p>
        <p>
          Conservation : 3 ans après notre dernier échange, puis suppression.
        </p>
      </LegalSection>

      <LegalSection title="Formulaire « Présenter mon projet »">
        <p>
          Données collectées : nom, email, structure, site existant et les
          réponses sur votre projet (besoins, contenus, échéance, budget).
        </p>
        <p>
          Finalité : étudier votre projet et vous recontacter, avec votre
          accord donné dans le formulaire. Conservation : 3 ans, puis
          suppression.
        </p>
      </LegalSection>

      <LegalSection title="Mesure d'audience">
        <p>
          Le site mesure sa fréquentation avec PostHog, hébergé dans
          l&apos;Union européenne, en mode sans cookie : aucun cookie ni
          stockage n&apos;est déposé sur votre appareil. Les visites sont
          comptées à partir d&apos;une empreinte technique renouvelée chaque
          jour, qui ne permet pas de vous suivre d&apos;un jour à l&apos;autre.
          Ces statistiques servent uniquement à améliorer le site.
        </p>
      </LegalSection>

      <LegalSection title="Destinataires et sous-traitants">
        <p>Vos données ne sont ni vendues ni cédées. Elles transitent par :</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Vercel, hébergement du site ;</li>
          <li>Resend, envoi des messages des formulaires par email ;</li>
          <li>Google (Gmail), réception de ces messages ;</li>
          <li>PostHog, mesure d&apos;audience.</li>
        </ul>
        <p>
          Certains de ces prestataires sont établis aux États-Unis. Les
          transferts sont encadrés par le Data Privacy Framework ou par les
          clauses contractuelles types de la Commission européenne.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Vous pouvez accéder à vos données, les rectifier, les effacer, en
          limiter l&apos;usage ou vous y opposer en écrivant à {mailto}. Vous
          pouvez aussi introduire une réclamation auprès de la CNIL (cnil.fr).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
