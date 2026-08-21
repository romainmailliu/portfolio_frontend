import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OffreProfile from "../../../components/OffreProfile";
import {
  getProfileBySlug,
  getProfileSlugs,
} from "../../../data/offre-content";
import { pageOpenGraph } from "../../../lib/seo";

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
    alternates: {
      canonical: `/offre/${profile.slug}`,
    },
    openGraph: pageOpenGraph({
      title: `${profile.statementShort} | Romain Mailliu`,
      description: profile.situations[0],
      url: `/offre/${profile.slug}`,
    }),
  };
}

export default async function OffreProfilPage({ params }: Props) {
  const { profil } = await params;
  const profile = getProfileBySlug(profil);

  if (!profile) {
    notFound();
  }

  return <OffreProfile profile={profile} />;
}
