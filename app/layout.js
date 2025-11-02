//app/layout.js
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister";
import { DictionaryProvider } from "../lib/i18n/context";
import { SUPPORTED_LANGUAGES, getDictionary } from "../lib/i18n/dictionaries";

export async function generateStaticParams() {
  return (SUPPORTED_LANGUAGES ?? ["fr","en"]).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await Promise.resolve(getDictionary(lang));
  return {
    title: `Chalet Manager – ${dict?.navigation?.home ?? (lang === "fr" ? "Accueil" : "Home")}`,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries((SUPPORTED_LANGUAGES ?? ["fr","en"]).map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({ children, modal, params }) {
  const { lang } = await params;
  const dict = await Promise.resolve(getDictionary(lang));

  return (
    <DictionaryProvider value={dict}>
      <div className="flex min-h-screen flex-col bg-white">
        <ServiceWorkerRegister />
        <Suspense fallback={null}><Navbar /></Suspense>
        <main className="flex-1">{children}</main>
        <Suspense fallback={null}><Footer /></Suspense>
        <Suspense fallback={null}>{modal}</Suspense>
      </div>
    </DictionaryProvider>
  );
}
