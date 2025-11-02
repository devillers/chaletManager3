// app/[lang]/services/page.jsx
import { Section } from "../../../components/Section";
import { SUPPORTED_LANGUAGES, getDictionary } from "../../../lib/i18n/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;                // ✅ pas de params.lang
  const dict = await Promise.resolve(getDictionary(lang));
  return {
    title: `Chalet Manager – ${dict?.services?.title ?? "Services"}`,
    description:
      dict?.services?.intro ??
      "Discover the tenant and owner services offered by Chalet Manager.",
    alternates: {
      canonical: `/${lang}/services`,
      languages: Object.fromEntries(
        (SUPPORTED_LANGUAGES ?? ["fr", "en"]).map((l) => [l, `/${l}/services`])
      ),
    },
  };
}

export default async function ServicesPage({ params }) {
  const { lang } = await params;                // ✅ pas de params.lang
  const dict = await Promise.resolve(getDictionary(lang));

  return (
    <div className="space-y-12">
      <section className="bg-neutral-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-semibold">
            {dict?.services?.title ?? (lang === "fr" ? "Services" : "Services")}
          </h1>
          <p className="mt-4 text-lg text-neutral-200">
            {dict?.services?.intro ??
              (lang === "fr"
                ? "Découvrez les services proposés aux propriétaires et aux locataires."
                : "Discover the services we offer to owners and tenants.")}
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">
              {dict?.services?.ownerTitle ?? (lang === "fr" ? "Côté propriétaire" : "For owners")}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-700">
              {(dict?.services?.ownerItems ?? []).map((item, i) => (
                <li key={`${item}-${i}`} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">
              {dict?.services?.tenantTitle ?? (lang === "fr" ? "Côté locataire" : "For tenants")}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-700">
              {(dict?.services?.tenantItems ?? []).map((item, i) => (
                <li key={`${item}-${i}`} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-neutral-900" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title={lang === "fr" ? "Processus de publication" : "Publication process"}>
        <ol className="space-y-3 text-neutral-700">
          {[
            lang === "fr"
              ? "Le propriétaire complète la fiche détaillée de son chalet."
              : "The owner completes a detailed chalet profile.",
            lang === "fr"
              ? "Signature numérique du contrat de partenariat."
              : "Digital signature of the partnership agreement.",
            lang === "fr"
              ? "Validation par un super administrateur et mise en ligne avec URL dédiée."
              : "Review by a super admin and publication with a dedicated URL.",
          ].map((item, index) => (
            <li key={`${index}-${item}`} className="flex gap-3">
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
