import Link from "next/link";
import { signOut } from "../lib/auth";
import PwaInstaller from "./PwaInstaller";

export default function DashboardLayout({ title, description, links, children, role, lang = "en" }) {
  const navLinks = links || [];
  const showPwa = role === "owner" || role === "admin";
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 py-10 md:px-6">
        <aside className="hidden w-64 shrink-0 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:block">
          <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>
          {description ? <p className="mt-2 text-sm text-neutral-600">{description}</p> : null}
          <nav className="mt-6 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href={`/${lang}`} className="mt-8 inline-block text-sm text-neutral-500 hover:text-neutral-800">
            ← {lang === "fr" ? "Retour au site" : "Back to site"}
          </Link>
          <form
            className="mt-4"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/fr/signin" });
            }}
          >
            <button
              type="submit"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100"
            >
              {lang === "fr" ? "Se déconnecter" : "Log out"}
            </button>
          </form>
        </aside>
        <main className="flex-1">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
      <PwaInstaller enabled={showPwa} />
    </div>
  );
}
