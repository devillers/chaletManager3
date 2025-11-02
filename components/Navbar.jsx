"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { useDictionary } from "../lib/i18n/context";
import { SUPPORTED_LANGUAGES } from "../lib/i18n/dictionaries";

function getLangFromPath(pathname) {
  const seg = (pathname || "/").split("/").filter(Boolean)[0] || "fr";
  const lower = seg.toLowerCase();
  return SUPPORTED_LANGUAGES.includes(lower) ? lower : "fr";
}

function getSiblingLocalePath(pathnameRaw, lang) {
  const pathname = pathnameRaw || "/";
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${lang}`;
  segments[0] = lang;
  return `/${segments.join("/")}`;
}

export default function Navbar() {
  const dict = useDictionary();
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  const lang = useMemo(() => getLangFromPath(pathname), [pathname]);

  const tNav = {
    home: dict?.navigation?.home ?? (lang === "fr" ? "Accueil" : "Home"),
    services: dict?.navigation?.services ?? (lang === "fr" ? "Nos services" : "Services"),
    faq: dict?.navigation?.faq ?? "FAQ",
    contact: dict?.navigation?.contact ?? (lang === "fr" ? "Contact" : "Contact"),
    signin: dict?.navigation?.signin ?? (lang === "fr" ? "Se connecter" : "Sign in"),
    signup: dict?.navigation?.signup ?? (lang === "fr" ? "Créer un compte" : "Sign up"),
  };

  const navLinks = useMemo(
    () => [
      { href: `/${lang}`, label: tNav.home },
      { href: `/${lang}/services`, label: tNav.services },
      { href: `/${lang}/faq`, label: tNav.faq },
      { href: `/${lang}/contact`, label: tNav.contact },
    ],
    [lang, tNav.home, tNav.services, tNav.faq, tNav.contact]
  );

  const isActive = (href) =>
    href === `/${lang}` ? pathname === `/${lang}` : pathname.startsWith(href);

  return (
    <header className="relative border-b border-neutral-200 bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${lang}`} className="text-lg font-semibold tracking-wide">
          Chalet Manager
        </Link>

        <button
          type="button"
          className="rounded-md border border-neutral-300 px-2 py-1 text-sm font-medium md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label="Menu"
        >
          Menu
        </button>

        <nav
          id="main-navigation"
          role="navigation"
          aria-label="Primary"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 top-full z-50 w-full flex-col gap-4 border-b border-neutral-200 bg-white px-4 py-6 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:border-none md:bg-transparent md:p-0`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium hover:text-neutral-900 ${
                isActive(link.href) ? "text-neutral-900" : "text-neutral-700"
              }`}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-3">
            <Link
              href={`/${lang}/signin`}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
              onClick={() => setOpen(false)}
            >
              {tNav.signin}
            </Link>
            <Link
              href={`/${lang}/signup`}
              className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-neutral-700"
              onClick={() => setOpen(false)}
            >
              {tNav.signup}
            </Link>
          </div>

          <div className="flex items-center gap-2" aria-label="Language switcher">
            {SUPPORTED_LANGUAGES.map((language) => {
              const current = language === lang;
              return (
                <Link
                  key={language}
                  href={getSiblingLocalePath(pathname, language)}
                  className={`text-xs font-semibold uppercase ${
                    current ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-800"
                  }`}
                  onClick={() => setOpen(false)}
                  aria-current={current ? "true" : undefined}
                >
                  {language}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
