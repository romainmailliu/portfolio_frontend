import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ogImagePath } from "../../data/ai-training-content";
import "../../styles/ai-training.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ai",
});

export const metadata: Metadata = {
  title: "Practical AI Training for Managers and Teams",
  description:
    "Hands-on AI coaching for you and your team — no hype, real productivity gains. Remote sessions tailored to your business.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Practical AI Training for Managers and Teams",
    description:
      "Hands-on AI coaching for you and your team — no hype, real productivity gains.",
    images: [{ url: ogImagePath, width: 1200, height: 630, alt: "Practical AI Training" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Practical AI Training for Managers and Teams",
    description:
      "Hands-on AI coaching for you and your team — no hype, real productivity gains.",
    images: [ogImagePath],
  },
};

export default function AiTrainingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${sans.variable} font-[family-name:var(--font-ai)] antialiased`}>
      {children}
    </div>
  );
}
