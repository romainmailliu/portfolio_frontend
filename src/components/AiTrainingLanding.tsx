"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Mail,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import {
  SketchClaudeLogo,
  sketchPlatformLogos,
} from "./SketchBrandLogos";
import { sketchReasonIcons } from "./SketchReasonIcons";
import {
  type CredibilityStat,
  type Testimonial,
  approachContent,
  activeBulletMarkSet,
  bookingCtaLabel,
  bulletMarkSets,
  contactEmail,
  credibilityStats,
  faqItems,
  getBookingHref,
  getMailtoHref,
  hasBookingLink,
  inboxExample,
  offers,
  portfolioClientStories,
  profileBio,
  profilePhotoSrc,
  paymentNote,
  stackContent,
} from "../data/ai-training-content";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className={`ai-reveal ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function StackLogoMark({
  name,
  tilt = "left",
}: {
  name: string;
  tilt?: "left" | "right";
}) {
  const Logo = sketchPlatformLogos[name];
  if (!Logo) return null;

  return (
    <div className="flex flex-col items-center gap-2.5 text-center">
      <div
        className={`ai-sketch-logo-wrap h-[4.25rem] w-[4.25rem] p-2 ${
          tilt === "right" ? "ai-sketch-logo-wrap--tilt-right" : "ai-sketch-logo-wrap--tilt-left"
        }`}
      >
        <Logo className="h-full w-full" />
      </div>
      <span className="max-w-[7.5rem] text-xs font-medium leading-tight text-slate-600">
        {name}
      </span>
    </div>
  );
}

function StackStrip() {
  return (
    <Reveal delay={160}>
      <div className="ai-card ai-sketch-strip mt-10 overflow-hidden p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {stackContent.claude.label}
            </p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="shrink-0">
                <div className="ai-sketch-logo-wrap ai-sketch-logo-wrap--claude ai-sketch-logo-wrap--tilt-left h-[4.25rem] w-[4.25rem] p-1.5">
                  <SketchClaudeLogo className="h-full w-full" />
                </div>
                <div className="mt-2.5 flex max-w-[9.5rem] flex-wrap gap-1.5">
                  {stackContent.claude.techTags.map((tag) => (
                    <span key={tag} className="ai-tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-slate-900">{stackContent.claude.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {stackContent.claude.note}
                </p>
              </div>
            </div>
          </div>

          <div className="md:border-l md:border-dashed md:border-slate-200 md:pl-10">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {stackContent.adapt.label}
            </p>
            <div className="mt-4 flex flex-wrap items-start gap-6 sm:gap-8">
              {stackContent.adapt.platforms.map((platform, i) => (
                <StackLogoMark
                  key={platform.name}
                  name={platform.name}
                  tilt={i % 2 === 0 ? "left" : "right"}
                />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {stackContent.adapt.note}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProfilePhoto({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-slate-200 bg-sky-50 text-3xl font-bold text-sky-700 ${className}`}
        aria-hidden
      >
        RM
      </div>
    );
  }

  return (
    <Image
      src={profilePhotoSrc}
      alt={profileBio.name}
      width={320}
      height={400}
      className={`rounded-2xl border border-slate-200 object-cover shadow-sm ${className}`}
      onError={() => setFailed(true)}
      priority
    />
  );
}

function StatCard({ stat }: { stat: CredibilityStat }) {
  return (
    <div className="ai-card relative p-6 text-center">
      {stat.isPlaceholder && showEditorHints && (
        <span className="absolute right-3 top-3 rounded-full border border-dashed border-sky-300 bg-sky-50 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-sky-700">
          TBD
        </span>
      )}
      <p
        className={`text-3xl font-bold tracking-tight md:text-4xl ${stat.isPlaceholder ? "text-sky-600/70" : "text-slate-900"}`}
      >
        {stat.value}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-balance text-slate-500">{stat.label}</p>
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="ai-card flex h-full flex-col p-5 md:p-6">
      <blockquote className="flex-1 text-sm leading-relaxed text-slate-600 md:text-base">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4">
        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
        <p className="mt-0.5 text-xs text-slate-500">{item.role}</p>
      </figcaption>
    </figure>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="ai-card divide-y divide-slate-100 overflow-hidden">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full min-h-[52px] cursor-pointer items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-slate-50 md:px-6"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-slate-900">{item.question}</span>
              <ChevronDown
                className={`mt-0.5 h-5 w-5 shrink-0 text-sky-700 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 md:px-6">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

const inboxStepIcons = [MessageSquare, Sparkles, Calendar] as const;

const reasons = [
  {
    title: "Practical, not theoretical",
    text: "Every session is built around real tasks you and your team do every day — not generic AI demos.",
    iconVariant: "mint" as const,
    tilt: "left" as const,
  },
  {
    title: "Independent and tailored",
    text: "No software to sell, no fixed package. The program is built around your business, not a template.",
    iconVariant: "sky" as const,
    tilt: "right" as const,
  },
  {
    title: "Clear communication",
    text: "Plain language — even if you've never used AI tools. No assumed technical background.",
    iconVariant: "sun" as const,
    tilt: "left" as const,
  },
];

function BulletMark({ index }: { index: number }) {
  const marks = bulletMarkSets[activeBulletMarkSet];
  const tilt = index % 2 === 0 ? "-rotate-6" : "rotate-6";

  return (
    <span
      className={`mt-0.5 inline-block shrink-0 text-[0.85rem] leading-none ${tilt}`}
      aria-hidden
    >
      {marks[index % marks.length]}
    </span>
  );
}

function CtaButton({
  className = "",
  size = "default",
  variant = "primary",
  tilt = "left",
}: {
  className?: string;
  size?: "default" | "large";
  variant?: "primary" | "secondary";
  tilt?: "left" | "right";
}) {
  const sizeClass =
    size === "large"
      ? "min-h-[56px] px-10 py-4 text-base"
      : "min-h-[48px] px-7 py-3 text-sm md:text-base";

  const tiltClass =
    tilt === "right" ? "ai-btn-sticker--tilt-right" : "ai-btn-sticker--tilt-left";

  if (variant === "secondary") {
    return (
      <a
        href={getMailtoHref()}
        className={`ai-btn-secondary ${tiltClass} ${sizeClass} ${className}`}
      >
        <Mail className="h-4 w-4" />
        Email instead
      </a>
    );
  }

  return (
    <a
      href={getBookingHref()}
      className={`ai-btn-primary group ${tiltClass} ${sizeClass} ${className}`}
    >
      {hasBookingLink() && <Calendar className="h-4 w-4" />}
      {bookingCtaLabel}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function BookingPlaceholder() {
  if (hasBookingLink() || !showEditorHints) return null;

  return (
    <div className="mt-4 rounded-xl border border-dashed border-sky-200 bg-sky-50 px-4 py-3 text-sm text-slate-600">
      <span className="font-medium text-sky-800">Calendly placeholder:</span> set{" "}
      <code className="rounded bg-white px-1.5 py-0.5 text-xs text-slate-800">bookingUrl</code> in{" "}
      <code className="rounded bg-white px-1.5 py-0.5 text-xs text-slate-800">
        ai-training-content.ts
      </code>
    </div>
  );
}

function StickerLabel({
  children,
  tilt = "left",
}: {
  children: React.ReactNode;
  tilt?: "left" | "right";
}) {
  return (
    <span className={`ai-section-sticker ai-section-sticker--${tilt}`}>{children}</span>
  );
}

function SectionHeader({
  label,
  title,
  description,
  stickerTilt = "left",
}: {
  label: string;
  title: string;
  description?: string;
  stickerTilt?: "left" | "right";
}) {
  return (
    <div className="max-w-3xl">
      <StickerLabel tilt={stickerTilt}>{label}</StickerLabel>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl md:leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

const clientStories = portfolioClientStories;
const showEditorHints = process.env.NODE_ENV === "development";

export default function AiTrainingLanding() {
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setHeroReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="ai-training ai-training-grid relative min-h-[100dvh] overflow-x-hidden">
      <div className="ai-training-glow pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px]" aria-hidden />

      <main className="relative z-[1] pb-24 sm:pb-0">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-[max(4rem,env(safe-area-inset-top))] sm:px-8 md:pb-24 md:pt-20">
          <div className="lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
            <div>
              <h1
                className="text-[clamp(2.35rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-slate-900"
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.55s ease 0.08s, transform 0.55s ease 0.08s",
                }}
              >
                Give your team practical AI skills
                <span className="block text-sky-700">without the hype</span>
              </h1>

              <p
                className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600"
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.55s ease 0.16s, transform 0.55s ease 0.16s",
                }}
              >
                Hands-on training for you and your team — set up real workflows on
                day one, not another slide deck.
              </p>

              <div
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
                style={{
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.55s ease 0.24s, transform 0.55s ease 0.24s",
                }}
              >
                <CtaButton className="group" tilt="left" />
                <a
                  href="#approach"
                  className="ai-btn-secondary ai-btn-sticker--tilt-right min-h-[48px] px-7 py-3 text-sm md:text-base"
                >
                  See the approach
                </a>
              </div>

              <div
                style={{
                  opacity: heroReady ? 1 : 0,
                  transition: "opacity 0.55s ease 0.32s",
                }}
              >
                <p className="mt-4 text-sm text-slate-500">
                  400€ · {paymentNote}
                </p>
                <BookingPlaceholder />
              </div>
            </div>

            <div
              className="mt-12 lg:mt-2"
              style={{
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s",
              }}
            >
              <ProfilePhoto className="mx-auto aspect-[4/5] w-full max-w-sm lg:mx-0" />
              <div className="ai-card mt-4 p-5">
                <p className="text-lg font-bold text-slate-900">{profileBio.name}</p>
                <p className="mt-1 text-sm font-medium text-sky-800">{profileBio.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{profileBio.bio}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-slate-200 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {credibilityStats.map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="scroll-mt-8 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
            <Reveal>
              <SectionHeader
                label={approachContent.label}
                title={approachContent.title}
                description={approachContent.intro}
                stickerTilt="left"
              />
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {offers.map((offer, i) => (
                <Reveal key={offer.number} delay={80 + i * 80}>
                  <article
                    className={`ai-card flex h-full flex-col p-8 ${
                      offer.featured
                        ? "border-sky-200 bg-gradient-to-b from-sky-50/80 to-white ring-1 ring-sky-100"
                        : ""
                    }`}
                  >
                    <h3 className="text-2xl font-bold text-slate-900">{offer.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-sky-700">{offer.duration}</p>
                    {offer.price && (
                      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        {offer.price}
                      </p>
                    )}
                    {offer.priceNote && (
                      <p className="mt-3 text-lg font-semibold text-slate-500">{offer.priceNote}</p>
                    )}
                    <p className="mt-4 leading-relaxed text-slate-600">{offer.summary}</p>
                    <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
                      {offer.bullets.map((item, bulletIndex) => (
                        <li key={item} className="flex items-start gap-2.5 leading-relaxed">
                          <BulletMark index={bulletIndex + i} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {offer.outcome && (
                      <p className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800">
                        {offer.outcome}
                      </p>
                    )}
                    <p
                      className={`mt-6 border-t pt-6 text-sm text-slate-500 ${
                        offer.featured ? "border-sky-100" : "border-slate-100"
                      }`}
                    >
                      <span className="font-semibold text-slate-800">Best for:</span>{" "}
                      {offer.bestFor}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
            <StackStrip />
            <Reveal delay={240}>
              <p className="mt-10 text-center text-sm text-slate-500">
                {approachContent.footnote}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Inbox example */}
        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
            <Reveal>
              <SectionHeader
                label="A practical example"
                title={inboxExample.headline}
                description={inboxExample.problemIntro}
                stickerTilt="right"
              />
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-10 text-lg text-slate-700">
                By connecting an AI assistant like Claude to your email, you can:
              </p>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {inboxExample.steps.map((step, i) => {
                const Icon = inboxStepIcons[i] ?? MessageSquare;
                return (
                  <Reveal key={step.title} delay={180 + i * 80}>
                    <div className="ai-card flex h-full flex-col p-6">
                      <Icon className="mb-4 h-5 w-5 text-sky-700" strokeWidth={1.5} />
                      <h3 className="font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                        {step.text}
                      </p>
                      <p className="mt-4 border-t border-slate-100 pt-3 text-xs font-semibold text-sky-800">
                        {step.timeSaved}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={360}>
              <div className="ai-card mt-10 overflow-hidden">
                <div className="hidden grid-cols-4 gap-px bg-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:grid">
                  <div className="bg-slate-50 px-5 py-3">Task</div>
                  <div className="bg-slate-50 px-5 py-3 text-center">Before</div>
                  <div className="bg-slate-50 px-5 py-3 text-center">After AI</div>
                  <div className="bg-slate-50 px-5 py-3 text-center">Saved</div>
                </div>
                {inboxExample.timeBreakdown.map((row) => (
                  <div
                    key={row.task}
                    className="border-t border-slate-100 px-5 py-4 sm:grid sm:grid-cols-4 sm:items-center sm:gap-4"
                  >
                    <p className="text-sm font-medium text-slate-900">{row.task}</p>
                    <p className="mt-2 text-sm text-slate-500 sm:mt-0 sm:text-center">{row.before}</p>
                    <p className="mt-1 text-sm font-medium text-slate-800 sm:mt-0 sm:text-center">
                      {row.after}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-sky-700 sm:mt-0 sm:text-center">
                      {row.saved}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={440}>
              <div className="ai-card mt-6 border-sky-200 bg-sky-50/40 p-6 md:p-8">
                <p className="text-lg leading-relaxed text-slate-800">{inboxExample.footerNote}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Client stories */}
        <section id="testimonials" className="scroll-mt-8 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
            <Reveal>
              <SectionHeader
                label="Recent client work"
                title="Problems solved, results delivered"
                description="Recent projects from my portfolio."
                stickerTilt="left"
              />
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {clientStories.map((item, i) => (
                <Reveal key={`${item.name}-${i}`} delay={80 + i * 60}>
                  <TestimonialCard item={item} />
                </Reveal>
              ))}
            </div>
            <Reveal delay={320}>
              <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CtaButton className="group" tilt="left" />
                <CtaButton variant="secondary" tilt="right" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why */}
        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
            <Reveal>
              <SectionHeader
                label="Why work with me"
                title="Built for you, not tech teams"
                stickerTilt="right"
              />
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {reasons.map((reason, i) => {
                const Icon = sketchReasonIcons[i];
                return (
                  <Reveal key={reason.title} delay={80 + i * 80}>
                    <div className="ai-card h-full p-6">
                      <div
                        className={`ai-sketch-logo-wrap ai-sketch-reason-icon ai-sketch-reason-icon--${reason.iconVariant} ${
                          reason.tilt === "right"
                            ? "ai-sketch-logo-wrap--tilt-right"
                            : "ai-sketch-logo-wrap--tilt-left"
                        }`}
                      >
                        <Icon className="h-full w-full" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">{reason.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{reason.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
            <Reveal>
              <SectionHeader label="Common questions" title="Before you book" stickerTilt="left" />
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-10 max-w-3xl">
                <FaqAccordion />
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
            <Reveal>
              <div className="ai-card overflow-hidden bg-gradient-to-br from-white via-sky-50/30 to-white px-6 py-14 text-center md:px-16 md:py-20">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Book your 2-hour coaching session
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
                  Claude set up on your email, priorities, and calendar — in one call.
                  {` ${paymentNote}`}
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <CtaButton size="large" className="group" tilt="left" />
                  <a
                    href={getMailtoHref()}
                    className="ai-btn-secondary ai-btn-sticker--tilt-right min-h-[56px] px-8 py-4 text-base"
                  >
                    <Mail className="h-5 w-5" />
                    {contactEmail}
                  </a>
                </div>
                <BookingPlaceholder />
                <p className="mt-4 text-xs text-slate-400">
                  400€ · 2 hours · {paymentNote} · Team rollout on quote.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Romain Mailliu · Practical AI Training</p>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-md sm:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={getBookingHref()}
          className="ai-btn-primary ai-btn-sticker--tilt-left flex min-h-[48px] w-full text-base"
        >
          {bookingCtaLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
