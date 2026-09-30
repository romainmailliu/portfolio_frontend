import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalSection } from "../../components/LegalPage";
import { host, legalUpdatedAt, publisher } from "../../data/legal-content";
import { pageOpenGraph } from "../../lib/seo";

const title = "Mentions légales";
const description =
  "Mentions légales du site romainmailliu.com : éditeur, hébergeur et propriété intellectuelle.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/mentions-legales",
  },
  openGraph: pageOpenGraph({
    title: `${title} | Romain Mailliu`,
    description,
    url: "/mentions-legales",
  }),
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title={title} updatedAt={legalUpdatedAt}>
      <LegalSection title="Éditeur du site">
        <p>
          {publisher.name}
          <br />
          {publisher.status}
          <br />
          SIRET : {publisher.siret}
          <br />
          {publisher.vat}
          <br />
          {/* Adresse et téléphone : affichés dès qu'ils sont renseignés
              dans legal-content.ts (voir le TODO en tête du fichier). */}
          {publisher.address && (
            <>
              Adresse : {publisher.address}
              <br />
            </>
          )}
          {publisher.phone && (
            <>
              Téléphone : {publisher.phone}
              <br />
            </>
          )}
          Email :{" "}
          <a
            href={`mailto:${publisher.email}`}
            className="underline underline-offset-2"
          >
            {publisher.email}
          </a>
        </p>
        <p>Directeur de la publication : {publisher.name}.</p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          {host.name}
          <br />
          {host.address}
          <br />
          <a
            href={host.website}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            {host.website.replace("https://", "")}
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          Les textes, visuels et le code de ce site appartiennent à{" "}
          {publisher.name}, sauf mention contraire. Les captures des sites
          présentés en exemple, ainsi que leurs noms et logos, appartiennent à
          leurs structures respectives.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          La collecte et l&apos;usage de vos données sont détaillés dans la{" "}
          <Link
            href="/politique-de-confidentialite"
            className="underline underline-offset-2"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
