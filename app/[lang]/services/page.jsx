import { Section } from "../../../components/Section";
import { getDictionary } from "../../../lib/i18n/dictionaries";

export const metadata = {
  title: "Chalet Manager – Services",
  description: "Discover the tenant and owner services offered by Chalet Manager.",
};

export default function ServicesPage({ params }) {
  const dict = getDictionary(params.lang);
  return (
    <div className="space-y-12">
      <section className="bg-neutral-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-semibold">{dict.services.title}</h1>
          <p className="mt-4 text-lg text-neutral-200">{dict.services.intro}</p>
        </div>
      </section>
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">{dict.services.ownerTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-700">
              {dict.services.ownerItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">{dict.services.tenantTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-700">
              {dict.services.tenantItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section title={params.lang === "fr" ? "Processus de publication" : "Publication process"}>
        <ol className="space-y-3 text-neutral-700">
          {[
            params.lang === "fr"
              ? "Le propriétaire complète la fiche détaillée de son chalet."
              : "The owner completes a detailed chalet profile.",
            params.lang === "fr"
              ? "Signature numérique du contrat de partenariat."
              : "Digital signature of the partnership agreement.",
            params.lang === "fr"
              ? "Validation par un super administrateur et mise en ligne avec URL dédiée."
              : "Review by a super admin and publication with a dedicated URL.",
          ].map((item, index) => (
            <li key={item} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
