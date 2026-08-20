import { Check, Minus } from "lucide-react";
import { offreFeatures, offres } from "../../data/tarifs-content";

/** Cellule ✓ / — avec un libellé lu par les lecteurs d'écran. */
function Cell({ included }: { included: boolean }) {
  return included ? (
    <>
      <Check size={18} aria-hidden className="tarifs-table__check" />
      <span className="sr-only">inclus</span>
    </>
  ) : (
    <>
      <Minus size={16} aria-hidden className="tarifs-table__dash" />
      <span className="sr-only">non inclus</span>
    </>
  );
}

function ColumnHead({ index }: { index: number }) {
  const offre = offres[index];
  return (
    <>
      {offre.badge && <span className="tarifs-table__badge">{offre.badge}</span>}
      <span className="tarifs-table__plan">{offre.name}</span>
      <span className="tarifs-table__price">{offre.price}</span>
      <span className="tarifs-table__detail">{offre.detail}</span>
    </>
  );
}

export default function TarifsTable() {
  const cls = (index: number, base: string) =>
    `${base}${offres[index].featured ? ` ${base}--featured` : ""}`;

  return (
    <>
      {/* Comparatif — à partir de 900px */}
      <div className="tarifs-table-wrap">
        <table className="tarifs-table">
          <caption className="sr-only">
            Comparaison des trois offres de site vitrine
          </caption>
          <colgroup>
            <col className="tarifs-table__col-feature" />
            {offres.map((offre) => (
              <col key={offre.slug} className="tarifs-table__col-plan" />
            ))}
          </colgroup>
          <thead>
            <tr>
              <td />
              {offres.map((offre, index) => (
                <th key={offre.slug} scope="col" className={cls(index, "tarifs-table__head")}>
                  <ColumnHead index={index} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {offreFeatures.map((feature) => (
              <tr key={feature.label}>
                <th scope="row" className="tarifs-table__feature">
                  {feature.label}
                  {feature.note && (
                    <span className="tarifs-table__note">{feature.note}</span>
                  )}
                </th>
                {feature.included.map((included, index) => (
                  <td key={offres[index].slug} className={cls(index, "tarifs-table__cell")}>
                    <Cell included={included} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td />
              {offres.map((offre, index) => (
                <td key={offre.slug} className={cls(index, "tarifs-table__foot")}>
                  {offre.hook && (
                    <span className="tarifs-table__hook">{offre.hook}</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cartes empilées — en dessous de 900px, où un comparatif à 3 colonnes
          devient illisible. `display: none` retire l'autre version de l'arbre
          d'accessibilité, il n'y a donc pas de doublon annoncé. */}
      <div className="tarifs-cards">
        {offres.map((offre, index) => (
          <article
            key={offre.slug}
            className={`sticky-card tarif-card ${
              offre.featured
                ? "sticky-card--mint tarif-card--featured"
                : "sticky-card--cream"
            }`}
          >
            {offre.badge && <p className="tarif-card__badge">{offre.badge}</p>}
            <h3 className="tarif-card__name">{offre.name}</h3>
            <p className="tarif-card__price">{offre.price}</p>
            <p className="tarif-card__detail">{offre.detail}</p>

            <ul className="tarif-card__list">
              {offreFeatures
                .filter((feature) => feature.included[index])
                .map((feature) => (
                  <li key={feature.label}>
                    <Check size={16} aria-hidden className="tarifs-table__check" />
                    <span>
                      {feature.label}
                      {feature.note && (
                        <span className="tarifs-table__note">{feature.note}</span>
                      )}
                    </span>
                  </li>
                ))}
            </ul>

            {offre.hook && <p className="tarif-card__hook">{offre.hook}</p>}
          </article>
        ))}
      </div>
    </>
  );
}
