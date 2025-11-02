import React from "react";
import { getDictionary } from "../../../lib/i18n/dictionaries";

export const metadata = {
  title: "Chalet Manager – FAQ",
  description: "Answers to the most common questions about Chalet Manager.",
};

export default function FaqPage({ params }) {
  const { lang } = React.use(params);
  const dict = getDictionary(lang);
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-neutral-900">{dict.faq.title}</h1>
      <div className="mt-8 space-y-4">
        {dict.faq.items.map((item) => (
          <details key={item.question} className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer text-lg font-medium text-neutral-900 focus:outline-none focus-visible:ring">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
