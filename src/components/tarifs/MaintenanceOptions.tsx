import { Check } from "lucide-react";
import { maintenanceOptions } from "../../data/tarifs-content";

/**
 * Trois façons de faire vivre le site après la livraison, présentées côte à
 * côte : ne rien payer, l'annuel, ou l'à la carte. Les trois colonnes ont le
 * même poids visuel, aucune n'est mise en avant.
 */
export default function MaintenanceOptions() {
  return (
    <div className="maintenance-grid">
      {maintenanceOptions.map((option) => (
        <article
          key={option.slug}
          className="sticky-card sticky-card--cream maintenance-option"
        >
          <h3 className="maintenance-option__name">{option.name}</h3>
          <p className="maintenance-option__price">{option.price}</p>

          {option.summary && (
            <p className="maintenance-option__summary">{option.summary}</p>
          )}

          <ul className="tarif-card__list maintenance-option__list">
            {option.items.map((item) => (
              <li key={item}>
                <Check size={16} aria-hidden className="tarifs-table__check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
