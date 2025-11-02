import React from "react";
import { getDictionary } from "../../../lib/i18n/dictionaries";

export const metadata = {
  title: "Chalet Manager – Privacy",
};

export default function PrivacyPage({ params }) {
  const { lang } = React.use(params);
  const dict = getDictionary(lang);
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-semibold text-neutral-900">{dict.privacy.title}</h1>
      <p className="mt-6 whitespace-pre-line text-neutral-600">{dict.privacy.content}</p>
    </div>
  );
}
