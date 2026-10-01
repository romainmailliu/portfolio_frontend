import { faq, faqHeading } from "../data/faq-content";

/**
 * FAQ de la home. Des <details> natifs : les réponses sont dans le HTML même
 * repliées (lisibles par Google), et le dépliage marche sans JavaScript.
 * Même carte et même caret ▶ que les profils de l'offre.
 */
export default function HomeFaq() {
  return (
    <section
      className="w-full max-w-4xl mx-auto pt-8 md:pt-12"
      aria-labelledby="faq-title"
    >
      <h2 id="faq-title" className="tarifs-section-title text-center mb-6">
        {faqHeading}
      </h2>
      <div className="flex flex-col gap-3">
        {faq.map((entry) => (
          <details
            key={entry.question}
            className="faq-item sticky-card--cream rounded-card border border-pencil"
          >
            <summary className="faq-item__question">
              <span className="offre-profile-card__caret" aria-hidden="true">
                ▶
              </span>
              <h3>{entry.question}</h3>
            </summary>
            <p className="faq-item__answer">{entry.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
