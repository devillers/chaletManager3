import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceWorkerRegister from "../../components/ServiceWorkerRegister";
import { DictionaryProvider } from "../../lib/i18n/context";
import { SUPPORTED_LANGUAGES, getDictionary } from "../../lib/i18n/dictionaries";

const DEFAULT_LANG = "fr";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dictionary = await Promise.resolve(getDictionary(lang));
  return {
    title: `Chalet Manager – ${dictionary.navigation.home}`,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(SUPPORTED_LANGUAGES.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({ children, modal, params }) {
  const { lang } = await params;

  // 🔒 Normalise et valide la "langue"
  const normalized = String(lang).toLowerCase();
  const isLang = SUPPORTED_LANGUAGES.includes(normalized);

  // Si ce n'est pas une langue (ex: "owner"), on renvoie vers /fr/... (même sous-chemin)
  if (!isLang) {
    const h = headers();
    const fullPath = h.get("x-invoke-path") || h.get("next-url") || `/${lang}`;
    // remplace le 1er segment par DEFAULT_LANG
    const segments = fullPath.split("/").filter(Boolean);
    segments[0] = DEFAULT_LANG;
    return redirect("/" + segments.join("/"));
  }

  const dictionary = await Promise.resolve(getDictionary(normalized));
  headers(); // rend ce segment dynamique avant new Date()
  const year = new Date().getFullYear();

  return (
    <DictionaryProvider value={dictionary}>
      <div className="flex min-h-screen flex-col bg-white">
        <ServiceWorkerRegister />
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Suspense fallback={null}>
          <Footer year={year} />
        </Suspense>
        <Suspense fallback={null}>{modal}</Suspense>
      </div>
    </DictionaryProvider>
  );
}
