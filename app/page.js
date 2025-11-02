// app/[lang]/page.jsx
import { Section } from "../../components/Section";
import { SUPPORTED_LANGUAGES, getDictionary } from "../../lib/i18n/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params; // ✅
  const dict = await Promise.resolve(getDictionary(lang));
  return {
    title: `Chalet Manager – ${dict?.hero?.title ?? "Home"}`,
    description: dict?.hero?.subtitle ?? undefined,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries((SUPPORTED_LANGUAGES ?? ["fr","en"]).map((l) => [l, `/${l}`])),
    },
  };
}

export default async function HomePage({ params }) {
  const { lang } = await params; // ✅
  const dict = await Promise.resolve(getDictionary(lang));
  const t = (fr, en) => (lang === "fr" ? fr : en);

  return (
    <div>
      <section className="relative overflow-hidden bg-neutral-900 py-24 text-white">
        {/* ... */}
      </section>
    </div>
  );
}
