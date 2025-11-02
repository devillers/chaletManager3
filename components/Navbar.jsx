"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDictionary } from "../lib/i18n/context";
import { SUPPORTED_LANGUAGES } from "../lib/i18n/dictionaries";

function getSiblingLocalePath(pathname, lang) {
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return `/${lang}`;
  segments[0] = lang;
  return `/${segments.join("/")}`;
}

export default function Navbar({ lang }) {
  const dict = useDictionary();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navLinks = [
    { href: `/${lang}`, label: dict.navigation.home },
    { href: `/${lang}/services`, label: dict.navigation.services },
    { href: `/${lang}/faq`, label: dict.navigation.faq },
    { href: `/${lang}/contact`, label: dict.navigation.contact },
  ];

  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${lang}`} className="text-lg font-semibold tracking-wide">
          Chalet Manager
        </Link>
        <button
          className="rounded-md border border-neutral-300 px-2 py-1 text-sm font-medium md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="main-navigation"
        >
          Menu
        </button>
        <nav
          id="main-navigation"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 top-full z-50 w-full flex-col gap-4 border-b border-neutral-200 bg-white px-4 py-6 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:border-none md:bg-transparent md:p-0`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
              onClick={() => setOpen(false)}
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
              {dict.navigation.signin}
            </Link>
            <Link
              href={`/${lang}/signup`}
              className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-neutral-700"
              onClick={() => setOpen(false)}
            >
              {dict.navigation.signup}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {SUPPORTED_LANGUAGES.map((language) => (
              <Link
                key={language}
                href={getSiblingLocalePath(pathname, language)}
                className={`text-xs font-semibold uppercase ${
                  language === lang ? "text-neutral-900" : "text-neutral-500"
                }`}
                onClick={() => setOpen(false)}
              >
                {language}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
