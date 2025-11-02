// app/[lang]/faq/page.jsx
import { getDictionary } from "../../../lib/i18n/dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params; // params est une Promise en Next 15/16
  const dict = await Promise.resolve(getDictionary(lang));
  return {
    title: `Chalet Manager – ${dict?.faq?.title ?? "FAQ"}`,
    description:
      dict?.faq?.description ??
      "Answers to the most common questions about Chalet Manager.",
    alternates: { canonical: `/${lang}/faq` },
  };
}

export default async function FaqPage({ params }) {
  const { lang } = await params; // idem
  const dict = await Promise.resolve(getDictionary(lang));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-neutral-900">
        {dict.faq.title}
      </h1>
      <div className="mt-8 space-y-4">
        {dict.faq.items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <summary className="cursor-pointer text-lg font-medium text-neutral-900 focus:outline-none focus-visible:ring">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
