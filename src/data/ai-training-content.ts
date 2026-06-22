export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type CredibilityStat = {
  value: string;
  label: string;
  tag?: string;
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
  title: "Start with you, scale to your team",
  intro: "A 2-hour Claude coaching call to put AI in your day-to-day and save time.",
  footnote:
    "Remote sessions · Tuesdays & Thursdays, 8am–8pm · Pay at the end — only if you're satisfied.",
};

export type StackLogo = {
  name: string;
  logoSrc: string;
};

export const stackContent = {
  claude: {
    name: "Claude",
    logoSrc: "/ai-training/logos/claude.svg",
    label: "The 2-hour session — Claude",
    note: "Personal coaching is built on Claude — that's where my hands-on expertise is today. Email, calendar, meeting notes, and workflows you keep using the next day.",
    techTags: ["MCP", "Skills", "Cowork", "Claude Code"],
    enterpriseTags: ["Microsoft Copilot", "Google Gemini", "Teams"],
  },
  adapt: {
    label: "I adapt to your environment",
    note: "Most teams I work with run Microsoft 365 — Outlook, Teams, and calendar. Google Workspace works too. Your stack, not mine.",
    teamAiNote:
      "For team rollouts, I can adapt to Copilot, Gemini, or other tools your company already licenses. Today's deep expertise: Claude.",
    platforms: [
      {
        name: "Microsoft 365",
        logoSrc: "/ai-training/logos/microsoft.svg",
      },
      {
        name: "Google Workspace",
        logoSrc: "/ai-training/logos/google-workspace.svg",
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
  worksWithNote: string;
  connectIntro: string;
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

// Cal.com slug is /15min; event is "Personal coaching - 2h meeting"
// Cal.com: Tuesdays & Thursdays, 8:00–20:00 (configured in dashboard).
// Settings → Appearance → 24-hour time format (or account locale fr-FR).
export const bookingUrl: string | null =
  "https://cal.com/mailliu-romain-tcumz2/15min";

export const bookingCallLabel = "2-hour session";
export const bookingCtaLabel = "Book your 2-hour session";
export const paymentNote = "Payment at the end — only if you're satisfied.";

export const pricingContent = {
  amount: "400€",
  detail: "excl. VAT",
  expenseNote: "Expensable as professional training",
  roiNote:
    "Less than half a day of external consulting — you leave with Claude running on your tools the next day.",
  claudeSubscription:
    "Plan for a Claude Pro subscription (~€20/month) — separate from the session fee.",
};

export const schedulingContent = {
  availability: "Book online: Tuesdays & Thursdays, 8am–8pm.",
  customTimePrompt: "Need a specific time?",
  customTimeCta: "Email me your preferred slot",
};

export const mailtoScheduleSubject = "2-hour session — request a specific time slot";

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
  title: "Engineer · AI Coach for Managers",
  bio: "Background in consulting, international development projects (France, Lebanon, Indonesia, India, England, United States), and entrepreneurship.",
  languages: "I work in French and English.",
};

export const linkedinUrl = "https://www.linkedin.com/in/romain-mailliu/";

export const mailtoSubject = "2-hour AI coaching session — booking";

export function getMailtoHref(): string {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(mailtoSubject)}`;
}

export function getScheduleRequestMailtoHref(): string {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(mailtoScheduleSubject)}`;
}

export function getHeroPricingLine(): string {
  return `${pricingContent.amount} ${pricingContent.detail} · ${pricingContent.expenseNote.toLowerCase()} · ${paymentNote}`;
}

export function getBookingHref(): string {
  if (bookingUrl) return bookingUrl;
  return getMailtoHref();
}

export function hasBookingLink(): boolean {
  return Boolean(bookingUrl);
}

export const portfolioClientStories: Testimonial[] = [
  {
    quote:
      "Was losing hours on purchase orders every week — Excel and automation now generate them in minutes, not afternoons.",
    name: "Antoine",
    role: "Manager, Solerra",
  },
  {
    quote:
      "Needed to be findable before launch — got a site built for Google and AI search, ready on day one without an agency retainer.",
    name: "Léo",
    role: "Founder, Amidou",
  },
  {
    quote:
      "Every event update meant waiting on a developer — we publish ourselves now, in minutes instead of days.",
    name: "Pierre",
    role: "Manager, La Camaraderie",
  },
  {
    quote:
      "Skill swaps used to mean endless emails and spreadsheets — the app handles matching and follow-ups for our community.",
    name: "Jade",
    role: "Founder, Gomett",
  },
];

export const testimonialsIntro =
  "Same approach every time: automate the repetitive work, keep you in control, give time back.";

/** Short quotes for the hero — fills space below CTA on desktop. */
export const heroTestimonials: Testimonial[] = [
  {
    quote:
      "Purchase orders ate my afternoons — automation generates them in minutes now.",
    name: "Antoine",
    role: "Manager, Solerra",
  },
  {
    quote:
      "Event updates used to wait on a developer — we publish ourselves in minutes.",
    name: "Pierre",
    role: "Manager, La Camaraderie",
  },
];

export const statsContent = {
  label: "Track record",
  title: "By the numbers",
};

export const offers: Offer[] = [
  {
    number: "01",
    title: "Personal coaching",
    duration: "2 hours · Remote",
    price: "400€",
    priceNote: "excl. VAT · expensable training budget",
    summary: "A focused 2-hour Claude setup on your day-to-day workflows.",
    bullets: [
      "Claude set up on your tools — my core expertise today",
      "Email (Outlook or Gmail): triage, draft replies, priorities",
      "Calendar connected to your workflow",
      "Meeting notes: summaries, action items, and follow-ups from your calls",
      "Your data stays yours — I don't access your accounts, emails, or files",
    ],
    outcome:
      "After 2 hours, Claude is set up and ready — emails, priorities, agenda, and meeting notes. Ready to use the next day.",
    bestFor: "You, one-on-one.",
  },
  {
    number: "02",
    title: "Team rollout",
    duration: "Custom · Remote",
    priceNote: "On quote",
    summary: "Deploy the same workflows across your team — on Claude or your company's AI.",
    bullets: [
      "Claude by default; Copilot, Gemini, or other tools when that's your license",
      "Same workflows: Outlook or Gmail, priorities, calendar, meeting notes",
      "Adapted to each role in your organization",
      "Same security model — your data stays on your accounts",
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
    tag: "Clients",
    label: "On tech, automation & AI projects — since early 2026",
    isPlaceholder: false,
  },
  {
    value: "10+",
    tag: "Experience",
    label: "Years training teams & advising managers",
    isPlaceholder: false,
  },
  {
    value: "2–4h",
    tag: "Time back",
    label: "Typical weekly hours recovered (inbox workflow, post-session)",
    isPlaceholder: false,
  },
];

/** Inbox example — baseline tuned for managers; savings are illustrative workflow ranges. */
export const inboxExample: InboxExample = {
  headline: "Start with your inbox — save up to 4 hours a week",
  problemIntro:
    "Whether you use Outlook or Gmail, you probably spend 1–2 hours a day on email — sorting what matters, drafting replies, and catching up between meetings.",
  worksWithNote: "Outlook & Gmail · Microsoft 365 or Google Workspace",
  connectIntro:
    "With Claude connected to your inbox (Outlook or Gmail), you can:",
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
      text: "In Outlook or Gmail: which messages need your attention today — and why.",
      timeSaved: "~15–25 min saved vs. manual sorting",
    },
    {
      title: "Draft replies",
      text: "Routine emails drafted in your tone, ready to review and send.",
      timeSaved: "~10–15 min saved per routine reply",
    },
    {
      title: "Weekly plan",
      text: "Your inbox and calendar turned into priorities, delegations, and follow-ups.",
      timeSaved: "~30–45 min saved vs. manual recap",
    },
    {
      title: "Meeting recap",
      text: "Summaries and action items from Teams, Zoom, or in-person calls — ready to share.",
      timeSaved: "~20–30 min saved per meeting",
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
    "You stay fully in control — every draft is reviewed before you send it. In a 2-hour session, you leave with this Claude workflow on your own inbox (Outlook or Gmail), not a generic demo.",
};

export type SavingsCalculatorTask = {
  id: string;
  label: string;
  unit: "day" | "week";
  minMinutes: number;
  maxMinutes: number;
  defaultMinutes: number;
  afterRatio: number;
  afterFloor: number;
};

export const savingsCalculatorContent = {
  intro: "Move the sliders to match how long you spend today — see a typical weekly gain after a Claude inbox setup.",
  disclaimer:
    "Illustrative ranges based on client sessions. Results vary by inbox volume, role, and how often you use the workflow.",
  workDaysPerWeek: 5,
};

export const savingsCalculatorTasks: SavingsCalculatorTask[] = [
  {
    id: "triage",
    label: "Morning inbox triage",
    unit: "day",
    minMinutes: 10,
    maxMinutes: 60,
    defaultMinutes: 32,
    afterRatio: 0.35,
    afterFloor: 10,
  },
  {
    id: "replies",
    label: "Routine replies (×2–3/day)",
    unit: "day",
    minMinutes: 15,
    maxMinutes: 75,
    defaultMinutes: 38,
    afterRatio: 0.45,
    afterFloor: 15,
  },
  {
    id: "recap",
    label: "Weekly priorities recap",
    unit: "week",
    minMinutes: 20,
    maxMinutes: 90,
    defaultMinutes: 52,
    afterRatio: 0.32,
    afterFloor: 15,
  },
];

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
      "Yes. I never access your accounts, emails, or files — you configure everything on your own tools. Every output is reviewed before you use it.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Personal coaching (2 hours): 400€ excl. VAT — expensable as professional training for most companies. You pay at the end of the session, only if you're satisfied. Team rollout: on quote, depending on team size and scope.",
  },
  {
    question: "Can my company pay for this?",
    answer:
      "Yes. The session is priced as B2B professional training (400€ excl. VAT). I can issue an invoice for your expense report or training budget. Many managers book it as a skills upgrade, not personal spend.",
  },
  {
    question: "Do you work with Microsoft 365 and Copilot?",
    answer:
      "The 2-hour personal session is Claude — that's my expertise today. For team rollouts, I adapt to Copilot, Gemini, or other tools your company licenses. The inbox workflow works the same on Outlook and Gmail.",
  },
  {
    question: "Is there a subscription to plan for?",
    answer:
      "Yes. Claude Pro is about €20/month — separate from the 400€ session fee. You subscribe directly to Anthropic; I help you set it up during the call if needed.",
  },
  {
    question: "When do I pay?",
    answer:
      "After the 2-hour session. No upfront payment — you pay only if you're satisfied with what we set up together.",
  },
  {
    question: "How soon will you see results?",
    answer:
      "After the 2-hour session, Claude is set up on your email, priorities, calendar, and meeting notes. You use it the next day.",
  },
  {
    question: "Personal session or team rollout?",
    answer:
      "Always start with the 2-hour personal session. Team rollout comes once it works for you.",
  },
];
