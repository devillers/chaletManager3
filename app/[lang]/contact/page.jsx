import { getDictionary } from "../../../lib/i18n/dictionaries";

export const metadata = {
  title: "Chalet Manager – Contact",
  description: "Contact the Chalet Manager team for support and partnerships.",
};

export default function ContactPage({ params }) {
  const dict = getDictionary(params.lang);
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-neutral-900">{dict.contact.title}</h1>
      <p className="mt-4 max-w-2xl text-neutral-600">{dict.contact.description}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">{dict.contact.emailLabel}</h2>
          <a className="mt-2 block text-sm text-neutral-700" href={`mailto:${dict.contact.email}`}>
            {dict.contact.email}
          </a>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">{dict.contact.phoneLabel}</h2>
          <a className="mt-2 block text-sm text-neutral-700" href={`tel:${dict.contact.phone}`}>
            {dict.contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
