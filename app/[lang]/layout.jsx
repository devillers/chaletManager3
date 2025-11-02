import { Suspense } from "react";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceWorkerRegister from "../../components/ServiceWorkerRegister";
import { DictionaryProvider } from "../../lib/i18n/context";
import { SUPPORTED_LANGUAGES, getDictionary } from "../../lib/i18n/dictionaries";

export async function generateStaticParams() {
  return (SUPPORTED_LANGUAGES ?? ["fr", "en"]).map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, modal, params }) {
  const resolvedParams = await Promise.resolve(params);
  const lang = resolvedParams?.lang;

  if (!lang || !(SUPPORTED_LANGUAGES ?? ["fr", "en"]).includes(lang)) {
    notFound();
  }

  const dict = await Promise.resolve(getDictionary(lang));

  return (
    <DictionaryProvider value={dict}>
      <div className="flex min-h-screen flex-col bg-white">
        <ServiceWorkerRegister />
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>{modal}</Suspense>
      </div>
    </DictionaryProvider>
  );
}
