"use client";

import Link from "next/link";
import { Mountain } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDictionary } from "../lib/i18n/context";
import { SUPPORTED_LANGUAGES } from "../lib/i18n/dictionaries";
import { Pacifico } from "next/font/google";

function getSiblingLocalePath(pathname, lang) {
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return `/${lang}`;
  segments[0] = lang;
  return `/${segments.join("/")}`;
}

const burgerLineVariants = {
  closed: {
    rotate: 0,
    y: 0,
  },
  openTop: {
    rotate: 45,
    y: 6,
  },
  openBottom: {
    rotate: -45,
    y: -6,
  },
};

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
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-2">
          <Mountain className="h-12 w-12 text-amber-700" aria-hidden="true" />
          <Link href={`/${lang}`} className={$`{pacifico.className} text-lg font-light tracking-wide`}>
            Chalet Manager
          </Link>
          
        </div>

        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white shadow-sm transition hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={
            open ? dict.navigation.closeMenu : dict.navigation.openMenu
          }
          type="button"
        >
          <span className="sr-only">
            {open ? dict.navigation.closeMenu : dict.navigation.openMenu}
          </span>
          <span className="relative flex h-5 w-5 flex-col justify-between">
            <motion.span
              className="block h-0.5 w-full rounded bg-neutral-900"
              animate={open ? "openTop" : "closed"}
              variants={burgerLineVariants}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.span
              className="block h-0.5 w-full rounded bg-neutral-900"
              animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-full rounded bg-neutral-900"
              animate={open ? "openBottom" : "closed"}
              variants={burgerLineVariants}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
          </span>
        </button>
        <nav id="main-navigation" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <Link
              href={`/${lang}/signin`}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              {dict.navigation.signin}
            </Link>
            <Link
              href={`/${lang}/signup`}
              className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-neutral-700"
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
              >
                {language}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden"
            aria-label={dict.navigation.menu}
          >
            <motion.div
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="space-y-4 border-b border-neutral-200 bg-white px-4 pb-6 pt-2 shadow-sm"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-neutral-700 hover:text-neutral-900"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3">
                <Link
                  href={`/${lang}/signin`}
                  className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
                  onClick={() => setOpen(false)}
                >
                  {dict.navigation.signin}
                </Link>
                <Link
                  href={`/${lang}/signup`}
                  className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-neutral-700"
                  onClick={() => setOpen(false)}
                >
                  {dict.navigation.signup}
                </Link>
              </div>
              <div className="flex items-center gap-3">
                {SUPPORTED_LANGUAGES.map((language) => (
                  <Link
                    key={language}
                    href={getSiblingLocalePath(pathname, language)}
                    className={`text-xs font-semibold uppercase ${
                      language === lang
                        ? "text-neutral-900"
                        : "text-neutral-500"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {language}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
