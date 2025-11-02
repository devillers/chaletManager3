"use client";

import Link from "next/link";
import { useDictionary } from "../lib/i18n/context";

export default function Footer() {
  const dict = useDictionary();
  return (
    <footer className="border-t border-neutral-200 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p>{dict.footer.notice}</p>
        <div className="flex gap-4">
          <Link className="hover:text-neutral-800" href="/fr/terms">
            CGV
          </Link>
          <Link className="hover:text-neutral-800" href="/fr/privacy">
            Confidentialité
          </Link>
          <Link className="hover:text-neutral-800" href="/en/terms">
            Terms
          </Link>
          <Link className="hover:text-neutral-800" href="/en/privacy">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
