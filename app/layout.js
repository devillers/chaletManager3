import { Suspense } from "react";
import { headers } from "next/headers";             // ✅
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister";
import { DictionaryProvider } from "../lib/i18n/context";
import { SUPPORTED_LANGUAGES, getDictionary } from "../lib/i18n/dictionaries";

export async function generateStaticParams() {
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
  const dictionary = await Promise.resolve(getDictionary(lang));

  headers();                                       // ✅ rend le segment dynamique
  const year = new Date().getFullYear();           // ✅ maintenant autorisé

  return (
    <DictionaryProvider value={dictionary}>
      <div className="flex min-h-screen flex-col bg-white">
        <ServiceWorkerRegister />
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Suspense fallback={null}>
          <Footer year={year} />                    {/* ✅ pas de new Date dans Footer */}
        </Suspense>
        <Suspense fallback={null}>{modal}</Suspense>
      </div>
    </DictionaryProvider>
  );
}
