// app/[lang]/contact/page.jsx
import { getDictionary } from "../../../lib/i18n/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;                // ✅ pas de params.lang
  const dict = await Promise.resolve(getDictionary(lang));
  return {
    title: `Chalet Manager – ${dict?.contact?.title ?? "Contact"}`,
    description:
      dict?.contact?.description ??
      "Contact the Chalet Manager team for support and partnerships.",
    alternates: { canonical: `/${lang}/contact` },
  };
}

export default async function ContactPage({ params }) {
  const { lang } = await params;                // ✅ pas de params.lang
  const dict = await Promise.resolve(getDictionary(lang));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-neutral-900">
        {dict?.contact?.title ?? "Contact"}
      </h1>
      <p className="mt-4 max-w-2xl text-neutral-600">
        {dict?.contact?.description ??
          "Contact the Chalet Manager team for support and partnerships."}
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">
            {dict?.contact?.emailLabel ?? "Email"}
          </h2>
          <a
            className="mt-2 block text-sm text-neutral-700 break-all"
            href={`mailto:${dict?.contact?.email ?? "contact@chaletmanager.fr"}`}
            aria-label={`Email: ${dict?.contact?.email ?? "contact@chaletmanager.fr"}`}
          >
            {dict?.contact?.email ?? "contact@chaletmanager.fr"}
          </a>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">
            {dict?.contact?.phoneLabel ?? (lang === "fr" ? "Téléphone" : "Phone")}
          </h2>
          <a
            className="mt-2 block text-sm text-neutral-700"
            href={`tel:${dict?.contact?.phone ?? ""}`}
            aria-label={`Téléphone: ${dict?.contact?.phone ?? ""}`}
          >
            {dict?.contact?.phone ?? ""}
          </a>
        </div>
      </div>
    </div>
  );
}
