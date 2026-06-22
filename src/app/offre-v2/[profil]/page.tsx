import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OffreV2Profile from "../../../components/OffreV2Profile";
import {
  getProfileBySlug,
  getProfileSlugs,
} from "../../../data/offre-v2-content";

type Props = {
  params: Promise<{ profil: string }>;
};

export function generateStaticParams() {
  return getProfileSlugs().map((profil) => ({ profil }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profil } = await params;
  const profile = getProfileBySlug(profil);

  if (!profile) {
    return { title: "Profil introuvable" };
  }

  return {
    title: profile.statementShort,
    description: profile.situations[0],
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function OffreV2ProfilPage({ params }: Props) {
  const { profil } = await params;
  const profile = getProfileBySlug(profil);

  if (!profile) {
    notFound();
  }

  return <OffreV2Profile profile={profile} />;
}
