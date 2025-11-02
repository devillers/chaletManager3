import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceWorkerRegister from "../../components/ServiceWorkerRegister";
import { DictionaryProvider } from "../../lib/i18n/context";
import { SUPPORTED_LANGUAGES, getDictionary } from "../../lib/i18n/dictionaries";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export function generateMetadata({ params }) {
  const dictionary = getDictionary(params.lang);
  return {
    title: `Chalet Manager – ${dictionary.navigation.home}`,
    alternates: {
      canonical: `/${params.lang}`,
      languages: Object.fromEntries(
        SUPPORTED_LANGUAGES.map((language) => [language, `/${language}`]),
      ),
    },
  };
}

export default function LocaleLayout({ children, params }) {
  const dictionary = getDictionary(params.lang);
  return (
    <DictionaryProvider value={dictionary}>
      <div className="flex min-h-screen flex-col bg-white">
        <ServiceWorkerRegister />
        <Navbar lang={params.lang} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </DictionaryProvider>
  );
}
