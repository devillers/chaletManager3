'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary } from "../lib/i18n/context";

export default function Footer({ year }) {
  const dict = useDictionary();
  const pathname = usePathname() || "/";
  const lang = (pathname.split("/").filter(Boolean)[0] || "fr").toLowerCase();
  const isFR = lang === "fr";

  const links = isFR
    ? [
        { href: "/fr/terms", label: "CGV" },
        { href: "/fr/privacy", label: "Confidentialité" },
      ]
    : [
        { href: "/en/terms", label: "Terms" },
        { href: "/en/privacy", label: "Privacy" },
      ];

  return (
    <footer className="border-t border-neutral-200 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p>© {year} · {dict?.footer?.rights ?? (isFR ? "Tous droits réservés." : "All rights reserved.")}</p>
        <nav className="flex gap-4">
          {links.map((l) => (
            <Link key={l.href} className="hover:text-neutral-800" href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
