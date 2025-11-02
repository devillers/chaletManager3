// app/[lang]/terms/page.jsx
import { getDictionary } from "../../../lib/i18n/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params; // params est une Promise en Next 15/16
  const dict = await Promise.resolve(getDictionary(lang));
  return {
    title: `Chalet Manager – ${dict?.terms?.title ?? "Terms"}`,
    description: dict?.terms?.description ?? undefined,
    alternates: { canonical: `/${lang}/terms` },
  };
}

export default async function TermsPage({ params }) {
  const { lang } = await params; // idem
  const dict = await Promise.resolve(getDictionary(lang));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-neutral-900">
        {dict?.terms?.title ?? "Terms"}
      </h1>
      <p className="mt-6 whitespace-pre-line text-neutral-600">
        {dict?.terms?.content ?? ""}
      </p>
    </div>
  );
}
