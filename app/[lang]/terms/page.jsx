import { getDictionary } from "../../../lib/i18n/dictionaries";

export const metadata = {
  title: "Chalet Manager – Terms",
};

export default function TermsPage({ params }) {
  const dict = getDictionary(params.lang);
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-neutral-900">{dict.terms.title}</h1>
      <p className="mt-6 whitespace-pre-line text-neutral-600">{dict.terms.content}</p>
    </div>
  );
}
