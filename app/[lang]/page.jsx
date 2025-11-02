// app/[lang]/page.jsx
import Link from "next/link";
import { Section } from "../../components/Section"; // <= chemin corrigé
import { SUPPORTED_LANGUAGES, getDictionary } from "../../lib/i18n/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params; // ✅ params est une Promise en v15
  const dict = await Promise.resolve(getDictionary(lang));
  return {
    title: `Chalet Manager – ${dict?.hero?.title ?? "Home"}`,
    description: dict?.hero?.subtitle ?? undefined,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries((SUPPORTED_LANGUAGES ?? ["fr", "en"]).map((l) => [l, `/${l}`])),
    },
  };
}

export default async function HomePage({ params }) {
  const { lang } = await params; // ✅ important
  const dict = await Promise.resolve(getDictionary(lang));
  const t = (fr, en) => (lang === "fr" ? fr : en);

  return (
    <div>
      <section className="relative overflow-hidden bg-neutral-900 py-24 text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2d2d2d,#090909)] opacity-80"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-6 px-4">
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            {dict?.hero?.title ?? t("Chalet Manager", "Chalet Manager")}
          </h1>
          <p className="max-w-2xl text-lg text-neutral-200">
            {dict?.hero?.subtitle ??
              t(
                "La plateforme de gestion pour locations haut de gamme.",
                "The management platform for luxury rentals."
              )}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center rounded-md bg-white px-5 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-neutral-200"
            >
              {dict?.hero?.cta ?? t("Découvrir les services", "Explore services")}
            </Link>
            <Link
              href={`/${lang}/signup`}
              className="inline-flex items-center rounded-md border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t("Créer un compte", "Create an account")}
            </Link>
          </div>
        </div>
      </section>

      <Section title={t("Pourquoi Chalet Manager ?", "Why Chalet Manager?")}>
        <p>
          {t(
            "Une plateforme pensée pour la gestion des locations haut de gamme : fiches chalets détaillées, suivi des demandes locataires et validation par des experts.",
            "A platform built for luxury rentals: rich chalet profiles, guest enquiry tracking and expert validation before publication."
          )}
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: t("Accompagnement humain", "Human support"),
              text: t(
                "Une équipe dédiée suit chaque propriétaire et assure la qualité des informations publiées.",
                "A dedicated team helps every owner and preserves the quality of published listings."
              ),
            },
            {
              title: t("Expérience locataire", "Guest experience"),
              text: t(
                "Les locataires expriment leurs envies et reçoivent des propositions ciblées pour des séjours mémorables.",
                "Guests share their wishes and receive curated suggestions for unforgettable stays."
              ),
            },
            {
              title: t("Technologie PWA", "PWA technology"),
              text: t(
                "Les administrateurs installent l'application pour gérer les dossiers même avec une connectivité limitée.",
                "Administrators can install the app to manage operations even with limited connectivity."
              ),
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t("Témoignages", "Testimonials")}>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              quote: t(
                "La plateforme nous a permis de structurer la gestion de notre chalet familial et de déléguer la relation client.",
                "The platform helped us streamline our family chalet operations and delegate guest communication."
              ),
              author: t("Sophie, propriétaire", "Sophie, owner"),
            },
            {
              quote: t(
                "Nous recevons des offres parfaitement adaptées à nos envies de séjours à la montagne.",
                "We now get offers that match our ideal mountain getaways perfectly."
              ),
              author: t("Alexandre, locataire", "Alexander, guest"),
            },
          ].map((item) => (
            <figure
              key={item.author}
              className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <blockquote className="text-neutral-700">{item.quote}</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-neutral-500">
                {item.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </div>
  );
}
