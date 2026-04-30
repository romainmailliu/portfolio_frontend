import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Romain Mailliu",
  description: "Portfolio - Développeur Web & IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
