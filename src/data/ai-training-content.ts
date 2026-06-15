export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type CredibilityStat = {
  value: string;
  label: string;
  isPlaceholder?: boolean;
};

export type ClientLogo = {
  name: string;
  initials: string;
  /** PLACEHOLDER: add logo file in /public and set path, e.g. "/logos/coexister.svg" */
  logoSrc: string | null;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Offer = {
  number: string;
  title: string;
  duration: string;
  price?: string;
  priceNote?: string;
  summary: string;
  bullets: string[];
  outcome?: string;
  bestFor: string;
  featured?: boolean;
};

export const approachContent = {
  label: "The approach",
  title: "First you. Then your team.",
  intro: "A 2-hour call to put AI in your day-to-day and save time.",
  footnote: "Remote sessions · Flexible scheduling. Pay at the end — only if you're satisfied.",
};

export type StackLogo = {
  name: string;
  logoSrc: string;
};

export const stackContent = {
  claude: {
    name: "Claude",
    logoSrc: "/ai-training/logos/claude.svg",
    label: "I work with Claude",
    note: "Hands-on setup during your session — not a generic demo.",
    techTags: ["MCP", "Skills", "Cowork", "Claude Code"],
  },
  adapt: {
    label: "I adapt to your environment",
    note: "Gmail or Outlook, Google Calendar or Microsoft — your stack, not mine.",
    platforms: [
      {
        name: "Google Workspace",
        logoSrc: "/ai-training/logos/google-workspace.svg",
      },
      {
        name: "Microsoft 365",
        logoSrc: "/ai-training/logos/microsoft.svg",
      },
    ] satisfies StackLogo[],
  },
};

export type InboxTimeRow = {
  task: string;
  before: string;
  after: string;
  saved: string;
};

export type InboxExample = {
  headline: string;
  problemIntro: string;
  baseline: {
    hoursPerDay: string;
    percentOfWeek: string;
    source: string;
  };
  weeklySavings: {
    range: string;
    label: string;
    note: string;
  };
  steps: { title: string; text: string; timeSaved: string }[];
  timeBreakdown: InboxTimeRow[];
  footerNote: string;
};

// ── PLACEHOLDERS — replace before sharing widely ─────────────────────────────
// bookingUrl: set to your Calendly / Cal.com link (leave null to use email only)
// profilePhotoSrc: headshot in /public (falls back to initials if missing)
// ogImagePath: Open Graph image for link previews (replace SVG with 1200×630 PNG when ready)
// placeholderTestimonials: removed — use portfolioClientStories from the main portfolio
// clientLogos[].logoSrc: add PNG/SVG logos in /public/logos/

export const contactEmail = "romain.mailliu@gmail.com";

// bookingUrl: your Cal.com event for the 2-hour coaching session (not a discovery call)
export const bookingUrl: string | null =
  "https://cal.com/mailliu-romain-tcumz2/15min";

export const bookingCallLabel = "2-hour session";
export const bookingCtaLabel = "Book your 2-hour session";
export const paymentNote = "Payment at the end — only if you're satisfied.";

/** Bullet list marks — change activeBulletMarkSet to switch style */
export const bulletMarkSets = {
  star: ["✦"],
  energy: ["⚡", "✦", "→"],
  workflow: ["📬", "📋", "🤝"],
  playful: ["✨", "🎯", "💬"],
  punch: ["→", "→", "→"],
} as const;

export type BulletMarkSetKey = keyof typeof bulletMarkSets;

export const activeBulletMarkSet: BulletMarkSetKey = "star";

export const profilePhotoSrc = "/moi.png";

export const ogImagePath = "/ai-training-og.svg";

export const profileBio = {
  name: "Romain Mailliu",
  title: "Engineer · Your AI coach",
  bio: "Background in consulting, international development projects (France, Lebanon, Indonesia, India, England, United States), and entrepreneurship. I work in French and English.",
};

export const mailtoSubject = "2-hour AI coaching session — booking";

export function getMailtoHref(): string {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(mailtoSubject)}`;
}

export function getBookingHref(): string {
  if (bookingUrl) return bookingUrl;
  return getMailtoHref();
}

export function hasBookingLink(): boolean {
  return Boolean(bookingUrl);
}

/** Client stories from romainmailliu.com portfolio (dernières réalisations). */
export const portfolioClientStories: Testimonial[] = [
  {
    quote:
      "Needed to be visible before launch — got a site optimized for Google and AI tools, ready on day one.",
    name: "Léo",
    role: "Founder, Amidou",
  },
  {
    quote:
      "We wanted to publish events on our own, without depending on a developer — we now run a simple, well-referenced site ourselves.",
    name: "Pierre",
    role: "Manager, La Camaraderie",
  },
  {
    quote:
      "Was losing hours editing purchase orders by hand — Excel files now generate the documents automatically.",
    name: "Antoine",
    role: "Manager, Solerra",
  },
  {
    quote:
      "We wanted to make skill swaps easier for entrepreneurs — we built a custom app for our community.",
    name: "Jade",
    role: "Founder, Gomett",
  },
];

export const offers: Offer[] = [
  {
    number: "01",
    title: "Personal coaching",
    duration: "2 hours · Remote",
    price: "400€",
    summary: "Put AI in your day-to-day and start saving time.",
    bullets: [
      "Claude set up on your tools",
      "Email: triage, draft replies, priorities",
      "Calendar connected to your workflow",
    ],
    outcome:
      "After 2 hours, Claude is set up and ready — emails, priorities, and agenda.",
    bestFor: "You, one-on-one.",
  },
  {
    number: "02",
    title: "Team rollout",
    duration: "Custom · Remote",
    priceNote: "On quote",
    summary: "Deploy the same setup across your team.",
    bullets: [
      "Same workflows: email, priorities, calendar",
      "Adapted to each role in your organization",
      "Hands-on sessions for you and your team",
    ],
    outcome: "Once it works for you, your team gets there too.",
    bestFor: "After your personal session — when you're ready to scale.",
    featured: true,
  },
];

export const credibilityStats: CredibilityStat[] = [
  {
    value: "20+",
    label: "Clients accompanied on tech, automation & AI projects — since early 2026",
    isPlaceholder: false,
  },
  {
    value: "10+",
    label: "Years training teams & advising managers",
    isPlaceholder: false,
  },
  {
    value: "2–4h",
    label: "Typical weekly time you could recover (inbox workflow, post-session)",
    isPlaceholder: true,
  },
];

/** Inbox example — baseline tuned for managers; savings are illustrative workflow ranges. */
export const inboxExample: InboxExample = {
  headline: "Start with the inbox",
  problemIntro:
    "You probably spend 1–2 hours a day on email — sorting what matters, drafting replies, and catching up between meetings. That adds up fast across your week.",
  baseline: {
    hoursPerDay: "1–2h",
    percentOfWeek: "12–25%",
    source: "Typical range for managers in session",
  },
  weeklySavings: {
    range: "2–4 hours",
    label: "back per week",
    note: "Typical range when morning triage and routine drafts are set up in your session. Results vary by your inbox volume and role.",
  },
  steps: [
    {
      title: "Morning briefing",
      text: "Which emails actually need your attention today — and why.",
      timeSaved: "~15–25 min saved vs. manual sorting",
    },
    {
      title: "Draft replies",
      text: "Routine messages drafted in your tone, ready to review and send.",
      timeSaved: "~10–15 min saved per routine reply",
    },
    {
      title: "Weekly plan",
      text: "Your emails and meetings turned into priorities, delegations, and follow-ups.",
      timeSaved: "~30–45 min saved vs. manual recap",
    },
  ],
  timeBreakdown: [
    {
      task: "Morning inbox triage",
      before: "25–40 min",
      after: "10–15 min",
      saved: "~15–25 min/day",
    },
    {
      task: "Routine replies (×2–3/day)",
      before: "30–45 min",
      after: "15–20 min",
      saved: "~15–25 min/day",
    },
    {
      task: "Weekly priorities recap",
      before: "45–60 min",
      after: "15–20 min",
      saved: "~30 min/week",
    },
  ],
  footerNote:
    "You stay fully in control — every draft is reviewed before you send it. In a 2-hour session, you leave with this workflow on your own inbox, not a generic demo.",
};

export const clientLogos: ClientLogo[] = [
  { name: "Gomett", initials: "Go", logoSrc: null },
  { name: "La Camaraderie", initials: "LC", logoSrc: null },
  { name: "Coexister", initials: "Cx", logoSrc: null },
  { name: "Youth Visions", initials: "YV", logoSrc: null },
  { name: "Amidou", initials: "Am", logoSrc: null },
];

export const faqItems: FaqItem[] = [
  {
    question: "Do you need technical skills?",
    answer:
      "No. Sessions are designed for you — even if you've never used AI tools. We work on your real tasks (email, reporting, planning) in plain language, with no assumed IT background.",
  },
  {
    question: "Is your company data safe?",
    answer:
      "Yes. You stay in control of what tools connect to what data, and every output is reviewed before you use it.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Personal coaching (2 hours): 400€. You pay at the end of the session — only if you're satisfied. Team rollout: on quote, depending on your team size and scope.",
  },
  {
    question: "When do I pay?",
    answer:
      "After the 2-hour session. No upfront payment — you pay only if you're satisfied with what we set up together.",
  },
  {
    question: "How soon will you see results?",
    answer:
      "After the 2-hour session, Claude is set up on your email, priorities, and calendar. You use it the next day.",
  },
  {
    question: "Personal session or team rollout?",
    answer:
      "Always start with the 2-hour personal session. Team rollout comes once it works for you.",
  },
];
