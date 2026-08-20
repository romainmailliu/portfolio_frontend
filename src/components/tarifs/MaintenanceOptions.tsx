import { Check } from "lucide-react";
import { maintenanceOptions } from "../../data/tarifs-content";

/**
 * Trois façons de faire vivre le site après la livraison, présentées côte à
 * côte pour que la comparaison se fasse d'un coup d'œil : ne rien payer,
 * l'annuel, ou l'à la carte.
 */
export default function MaintenanceOptions() {
  return (
    <div className="maintenance-grid">
      {maintenanceOptions.map((option) => (
        <article
          key={option.slug}
          className={`sticky-card maintenance-option ${
            option.featured
              ? "sticky-card--teal maintenance-option--featured"
              : "sticky-card--cream"
          }`}
        >
          {option.badge && (
            <p className="tarif-card__badge">{option.badge}</p>
          )}

          <h3 className="maintenance-option__name">{option.name}</h3>
          <p className="maintenance-option__price">{option.price}</p>
          {option.priceNote && (
            <p className="maintenance-option__price-note">{option.priceNote}</p>
          )}

          <p className="maintenance-option__summary">{option.summary}</p>

          <ul className="tarif-card__list maintenance-option__list">
            {option.items.map((item) => (
              <li key={item}>
                <Check size={16} aria-hidden className="tarifs-table__check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {option.footnote && (
            <p className="maintenance-option__footnote">{option.footnote}</p>
          )}
        </article>
      ))}
    </div>
  );
}
