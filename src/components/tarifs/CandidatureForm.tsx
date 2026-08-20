"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import {
  BUDGET_FIT_OPTIONS,
  CONTENT_READINESS_OPTIONS,
  LOOKING_FOR_OPTIONS,
  NEEDS_OPTIONS,
  PROFILE_OPTIONS,
  TIMELINE_OPTIONS,
  candidatureAnchor,
  confirmation,
  formCopy,
} from "../../data/tarifs-content";
import {
  STEP_FIELDS,
  emptyLead,
  validateStep,
  type FieldErrors,
  type LeadInput,
} from "../../lib/leads/lead-schema";
import { track, type TrackEvent } from "../../lib/track";
import { submitCandidature } from "../../app/tarifs/actions";

const STEP_COUNT = 3;
const STEP_EVENTS: TrackEvent[] = ["form_step_1", "form_step_2", "form_step_3"];

/* ------------------------------------------------------------------ */
/* Sous-composants de champ                                            */
/* ------------------------------------------------------------------ */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error">
      {message}
    </p>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  placeholder,
  disabled = false,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "url";
}) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  error,
  rows = 4,
  required = false,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-input resize-y"
        placeholder={placeholder}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

/** Choix unique — boutons cliquables adossés à de vrais boutons radio. */
function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  error,
}: {
  legend: string;
  name: string;
  options: readonly T[];
  value: T | undefined;
  onChange: (value: T) => void;
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <fieldset
      className="form-fieldset"
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="field-label form-legend">{legend}</legend>
      <div className="choice-group">
        {options.map((option) => (
          <label key={option} className="choice">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

/** Choix multiple — mêmes boutons, cases à cocher natives dessous. */
function MultiChoiceGroup<T extends string>({
  legend,
  name,
  options,
  values,
  onToggle,
}: {
  legend: string;
  name: string;
  options: readonly T[];
  values: readonly T[];
  onToggle: (value: T) => void;
}) {
  return (
    <fieldset className="form-fieldset">
      <legend className="field-label form-legend">{legend}</legend>
      <div className="choice-group">
        {options.map((option) => (
          <label key={option} className="choice">
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={values.includes(option)}
              onChange={() => onToggle(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* ------------------------------------------------------------------ */
/* Formulaire                                                          */
/* ------------------------------------------------------------------ */

export default function CandidatureForm() {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<LeadInput>(emptyLead);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const headingRef = useRef<HTMLParagraphElement>(null);
  const firedEvents = useRef<Set<TrackEvent>>(new Set());
  const isFirstRender = useRef(true);

  const fieldId = (name: string) => `${uid}-${name}`;

  const set = <K extends keyof LeadInput>(key: K, value: LeadInput[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const fireOnce = (event: TrackEvent) => {
    if (firedEvents.current.has(event)) return;
    firedEvents.current.add(event);
    track(event);
  };

  useEffect(() => {
    fireOnce("form_view");
  }, []);

  // Le titre de l'écran reçoit le focus à chaque changement d'étape,
  // pour que la navigation clavier et les lecteurs d'écran suivent.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const goToStep = (target: number) => {
    setStep(target);
    setFormError(undefined);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;

    const stepErrors = validateStep(values, step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setFormError("Complétez les champs signalés ci-dessous.");
      return;
    }

    setErrors({});
    setFormError(undefined);
    fireOnce(STEP_EVENTS[step]);

    if (step < STEP_COUNT - 1) {
      goToStep(step + 1);
      return;
    }

    startTransition(async () => {
      const result = await submitCandidature({ ...values, website: honeypot });

      if (result.ok) {
        track("form_submit");
        setSubmitted(true);
        return;
      }

      setFormError(result.formError);
      if (result.fieldErrors) {
        setErrors(result.fieldErrors);
        // Renvoyer l'utilisateur au premier écran contenant une erreur.
        const firstBadStep = STEP_FIELDS.findIndex((fields) =>
          fields.some((field) => result.fieldErrors?.[field]),
        );
        if (firstBadStep >= 0 && firstBadStep !== step) setStep(firstBadStep);
      }
    });
  };

  if (submitted) {
    return (
      <section
        id={candidatureAnchor}
        className="sticky-card sticky-card--mint scroll-mt-28"
        aria-live="polite"
      >
        <h2 className="tarifs-card-title mb-4">
          {confirmation.title}
        </h2>
        {confirmation.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-body-sm leading-relaxed mb-3">
            {paragraph}
          </p>
        ))}
      </section>
    );
  }

  const progressPercent = ((step + 1) / STEP_COUNT) * 100;
  const isLastStep = step === STEP_COUNT - 1;

  return (
    <section
      id={candidatureAnchor}
      className="sticky-card sticky-card--cream scroll-mt-28"
    >
      <h2 className="tarifs-card-title">{formCopy.heading}</h2>
      <p className="text-body-sm mt-2 mb-5 opacity-80">{formCopy.intro}</p>

      <div className="flex flex-col gap-2 mb-6">
        <div
          className="form-progress__track"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEP_COUNT}
          aria-valuenow={step + 1}
          aria-valuetext={`Étape ${step + 1} sur ${STEP_COUNT} — ${formCopy.steps[step].title}`}
        >
          <div
            className="form-progress__fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <ol className="form-progress__steps">
          {formCopy.steps.map((item, index) => (
            <li
              key={item.title}
              className={`form-progress__step ${
                index === step
                  ? "form-progress__step--current"
                  : index < step
                    ? "form-progress__step--done"
                    : ""
              }`}
            >
              {index + 1}. {item.title}
            </li>
          ))}
        </ol>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <p
          ref={headingRef}
          tabIndex={-1}
          className="field-label"
        >
          Étape {step + 1} sur {STEP_COUNT} · {formCopy.steps[step].legend}
        </p>

        <div aria-live="polite" className="empty:hidden">
          {formError && <p className="form-alert">{formError}</p>}
        </div>

        {/* Pot de miel — ni visible ni annoncé, mais présent dans le DOM. */}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor={fieldId("website")}>
            Ne remplissez pas ce champ
          </label>
          <input
            id={fieldId("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        {step === 0 && (
          <div className="flex flex-col gap-5">
            <TextField
              id={fieldId("fullName")}
              label="Prénom et nom"
              value={values.fullName}
              onChange={(value) => set("fullName", value)}
              error={errors.fullName}
              required
              autoComplete="name"
            />
            <TextField
              id={fieldId("email")}
              label="Email"
              type="email"
              inputMode="email"
              value={values.email}
              onChange={(value) => set("email", value)}
              error={errors.email}
              required
              autoComplete="email"
              placeholder="votre@email.com"
            />
            <ChoiceGroup
              legend="Vous êtes…"
              name={fieldId("profile")}
              options={PROFILE_OPTIONS}
              value={values.profile}
              onChange={(value) => set("profile", value)}
              error={errors.profile}
            />
            <TextField
              id={fieldId("structureName")}
              label="Nom du projet ou de la structure"
              value={values.structureName ?? ""}
              onChange={(value) => set("structureName", value)}
              error={errors.structureName}
              autoComplete="organization"
            />
            <div className="flex flex-col gap-3">
              <TextField
                id={fieldId("siteUrl")}
                label="Vous avez déjà un site ?"
                value={values.siteUrl ?? ""}
                onChange={(value) => set("siteUrl", value)}
                error={errors.siteUrl}
                disabled={values.noSiteYet === true}
                placeholder="monsite.fr"
                inputMode="url"
              />
              <label className="consent-row">
                <input
                  type="checkbox"
                  checked={values.noSiteYet === true}
                  onChange={(event) => {
                    set("noSiteYet", event.target.checked);
                    if (event.target.checked) set("siteUrl", "");
                  }}
                />
                <span>Pas encore de site</span>
              </label>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <TextAreaField
              id={fieldId("pitch")}
              label="Votre projet en deux phrases"
              value={values.pitch}
              onChange={(value) => set("pitch", value)}
              error={errors.pitch}
              required
              rows={4}
              placeholder="Ce que vous faites, pour qui, et ce que le site doit permettre."
            />
            <ChoiceGroup
              legend="Vous cherchez…"
              name={fieldId("lookingFor")}
              options={LOOKING_FOR_OPTIONS}
              value={values.lookingFor}
              onChange={(value) => set("lookingFor", value)}
              error={errors.lookingFor}
            />
            <MultiChoiceGroup
              legend="Ce dont vous avez besoin"
              name={fieldId("needs")}
              options={NEEDS_OPTIONS}
              values={values.needs ?? []}
              onToggle={(option) => {
                const current = values.needs ?? [];
                set(
                  "needs",
                  current.includes(option)
                    ? current.filter((item) => item !== option)
                    : [...current, option],
                );
              }}
            />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <ChoiceGroup
              legend="Vos contenus (textes, photos, logo) sont…"
              name={fieldId("contentReadiness")}
              options={CONTENT_READINESS_OPTIONS}
              value={values.contentReadiness}
              onChange={(value) => set("contentReadiness", value)}
              error={errors.contentReadiness}
            />
            <ChoiceGroup
              legend="Vous voulez être en ligne…"
              name={fieldId("timeline")}
              options={TIMELINE_OPTIONS}
              value={values.timeline}
              onChange={(value) => set("timeline", value)}
              error={errors.timeline}
            />
            <TextAreaField
              id={fieldId("inspirations")}
              label="2 ou 3 sites que vous aimez"
              value={values.inspirations ?? ""}
              onChange={(value) => set("inspirations", value)}
              error={errors.inspirations}
              rows={3}
              placeholder="Une URL par ligne, et ce qui vous plaît dessus."
            />
            <ChoiceGroup
              legend="Le tarif affiché correspond à votre budget ?"
              name={fieldId("budgetFit")}
              options={BUDGET_FIT_OPTIONS}
              value={values.budgetFit}
              onChange={(value) => set("budgetFit", value)}
              error={errors.budgetFit}
            />
            <div className="flex flex-col gap-2">
              <label className="consent-row">
                <input
                  type="checkbox"
                  checked={values.consent === true}
                  onChange={(event) => set("consent", event.target.checked)}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={
                    errors.consent ? fieldId("consent-error") : undefined
                  }
                  required
                />
                <span>{formCopy.consentLabel}</span>
              </label>
              <FieldError
                id={fieldId("consent-error")}
                message={errors.consent}
              />
              <p className="consent-detail">{formCopy.consentDetail}</p>
            </div>
          </div>
        )}

        <div className="form-nav">
          {step > 0 && (
            <button
              type="button"
              className="btn-outline"
              onClick={() => goToStep(step - 1)}
            >
              {formCopy.backLabel}
            </button>
          )}
          <button type="submit" className="btn-primary" disabled={isPending}>
            <span aria-hidden="true">→</span>
            {isLastStep
              ? isPending
                ? "Envoi…"
                : formCopy.submitLabel
              : formCopy.nextLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
