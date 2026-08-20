import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Preuve } from "../../data/tarifs-content";

/**
 * Carte de preuve. Le témoignage est optionnel : tant qu'aucun verbatim n'a été
 * recueilli, la carte se termine simplement sur le lien vers le site.
 */
export default function PreuveCard({ preuve }: { preuve: Preuve }) {
  return (
    <article className={`sticky-card preuve-card ${preuve.surface}`}>
      <div className="preuve-card__shot">
        <Image
          src={preuve.screenshot}
          alt={preuve.screenshotAlt}
          fill
          sizes="(min-width: 900px) 33vw, 100vw"
        />
      </div>

      <div className="preuve-card__body">
        <p className="preuve-card__meta">{preuve.segment}</p>
        <h3 className="preuve-card__name">{preuve.name}</h3>
        <p className="preuve-card__need">{preuve.need}</p>

        <a
          href={preuve.href}
          target="_blank"
          rel="noopener noreferrer"
          className="preuve-card__link"
        >
          Voir le site
          <ArrowUpRight size={15} aria-hidden className="shrink-0" />
          <span className="sr-only"> (nouvel onglet)</span>
        </a>

        {preuve.testimonial && (
          <blockquote className="preuve-card__quote">
            <p>« {preuve.testimonial.quote} »</p>
            <footer>— {preuve.testimonial.author}</footer>
          </blockquote>
        )}
      </div>
    </article>
  );
}
