import React from "react";
import { Section } from "../../components/Section";
import { getDictionary } from "../../lib/i18n/dictionaries";

export default function HomePage({ params }) {
  const { lang } = React.use(params);
  const dict = getDictionary(lang);
  return (
    <div>
      <section className="relative overflow-hidden bg-neutral-900 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#2d2d2d,_#090909)] opacity-80" aria-hidden />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-6 px-4">
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{dict.hero.title}</h1>
          <p className="max-w-2xl text-lg text-neutral-200">{dict.hero.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`/${lang}/services`}
              className="inline-flex items-center rounded-md bg-white px-5 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-neutral-200"
            >
              {dict.hero.cta}
            </a>
            <a
              href={`/${lang}/signup`}
              className="inline-flex items-center rounded-md border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {lang === "fr" ? "Créer un compte" : "Create an account"}
            </a>
          </div>
        </div>
      </section>
      <Section title={lang === "fr" ? "Pourquoi Chalet Manager ?" : "Why Chalet Manager?"}>
        <p>
          {lang === "fr"
            ? "Une plateforme pensée pour la gestion des locations haut de gamme : fiches chalets détaillées, suivi des demandes locataires et validation par des experts."
            : "A platform built for luxury rentals: rich chalet profiles, guest enquiry tracking and expert validation before publication."}
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: lang === "fr" ? "Accompagnement humain" : "Human support",
              text:
                lang === "fr"
                  ? "Une équipe dédiée suit chaque propriétaire et assure la qualité des informations publiées."
                  : "A dedicated team helps every owner and preserves the quality of published listings.",
            },
            {
              title: lang === "fr" ? "Expérience locataire" : "Guest experience",
              text:
                lang === "fr"
                  ? "Les locataires expriment leurs envies et reçoivent des propositions ciblées pour des séjours mémorables."
                  : "Guests share their wishes and receive curated suggestions for unforgettable stays.",
            },
            {
              title: lang === "fr" ? "Technologie PWA" : "PWA technology",
              text:
                lang === "fr"
                  ? "Les administrateurs installent l'application pour gérer les dossiers même avec une connectivité limitée."
                  : "Administrators can install the app to manage operations even with limited connectivity.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title={lang === "fr" ? "Témoignages" : "Testimonials"}>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              quote:
                lang === "fr"
                  ? "La plateforme nous a permis de structurer la gestion de notre chalet familial et de déléguer la relation client."
                  : "The platform helped us streamline our family chalet operations and delegate guest communication.",
              author: lang === "fr" ? "Sophie, propriétaire" : "Sophie, owner",
            },
            {
              quote:
                lang === "fr"
                  ? "Nous recevons des offres parfaitement adaptées à nos envies de séjours à la montagne."
                  : "We now get offers that match our ideal mountain getaways perfectly.",
              author: lang === "fr" ? "Alexandre, locataire" : "Alexander, guest",
            },
          ].map((item) => (
            <figure key={item.author} className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <blockquote className="text-neutral-700">{item.quote}</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-neutral-500">{item.author}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </div>
  );
}
