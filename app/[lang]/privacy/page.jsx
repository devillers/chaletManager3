// app/[lang]/privacy/page.jsx
import { notFound } from "next/navigation";
import { getDictionary } from "../../../lib/i18n/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params; // params est une Promise en Next 15/16
  const dict = await Promise.resolve(getDictionary(lang)).catch(() => null);

  if (!dict) {
    return {
      title: "Chalet Manager – Privacy",
      alternates: { canonical: `/${lang}/privacy` },
    };
  }

  return {
    title: `Chalet Manager – ${dict.privacy.title ?? "Privacy"}`,
    description: dict.privacy.description ?? undefined,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: { fr: "/fr/privacy", en: "/en/privacy" },
    },
  };
}

export default async function PrivacyPage({ params }) {
  const { lang } = await params; // idem
  const dict = await Promise.resolve(getDictionary(lang)).catch(() => null);

  if (!dict) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-neutral-900">
        {dict.privacy.title ?? "Privacy"}
      </h1>
      <p className="mt-6 whitespace-pre-line text-neutral-600">
        {dict.privacy.content ?? ""}
      </p>
    </div>
  );
}
