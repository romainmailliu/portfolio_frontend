import Image from "next/image";
import Link from "next/link";

/**
 * Présentation courte, à côté du formulaire sur la home. La phrase reprend
 * mot pour mot la bio de /contact (views/App.tsx) : toute modification doit
 * être répercutée aux deux endroits.
 */
export default function HomePresentation() {
  return (
    <div className="sticky-card sticky-card--mint w-full h-full flex flex-col gap-4 text-forest">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-btn overflow-hidden border border-forest shrink-0">
          <Image
            src="/moi.png"
            alt="Romain Mailliu, développeur web et consultant IA à Marseille"
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-lg font-bold font-body leading-tight">
            Romain Mailliu
          </p>
          <p className="font-mono-label text-micro uppercase tracking-widest text-forest/70 mt-1">
            Développeur Web &amp; Consultant IA
          </p>
        </div>
      </div>

      <p className="text-body-sm leading-relaxed">
        Ingénieur évoluant entre entreprises et ONG, en France et à
        l&apos;international, je mets l&apos;entrepreneuriat et
        l&apos;innovation au service de l&apos;impact social et
        environnemental.
      </p>
      <p className="text-body-sm leading-relaxed">
        Également producteur du film{" "}
        <span className="font-semibold">I AM THE FUTURE</span>.
      </p>

      <Link
        href="/contact"
        className="mt-auto self-start inline-flex items-center min-h-11 md:min-h-0 md:py-1 text-caption font-medium underline underline-offset-4 hover:opacity-70"
      >
        Qui suis-je →
      </Link>
    </div>
  );
}
