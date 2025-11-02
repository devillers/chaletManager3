import { redirect } from "next/navigation";
import { SUPPORTED_LANGUAGES } from "../lib/i18n/dictionaries";

export default function RootPage() {
  const [defaultLang = "fr"] = SUPPORTED_LANGUAGES ?? [];
  redirect(`/${defaultLang}`);
}
