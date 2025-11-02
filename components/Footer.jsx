"use client";

import Link from "next/link";
import { Mountain } from "lucide-react";

import { useParams } from "next/navigation";
import { Pacifico } from "next/font/google";
import { useDictionary } from "../lib/i18n/context";

import { GiMountains } from "react-icons/gi";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

const SOCIAL_LINKS = [
  { name: "Facebook", href: "#", icon: FaFacebookF },
  { name: "Twitter", href: "#", icon: FaTwitter },
  { name: "Instagram", href: "#", icon: FaInstagram },
  { name: "LinkedIn", href: "#", icon: FaLinkedinIn },
];

function localizeHref(href, locale) {
  if (!href) return "#";
  if (
    href.startsWith("http") ||
    href.startsWith("mailto") ||
    href.startsWith("tel")
  )
    return href;
  return `/${locale}${href}`.replace(/\/\/+/, "/");
}

export default function Footer() {
  const dict = useDictionary();
  const params = useParams();
  const locale = Array.isArray(params?.lang)
    ? params.lang[0]
    : params?.lang || "fr";

  const footer = dict.footer ?? {};
  const brand = footer.brand ?? {};
  const contact = footer.contact ?? {};
  const navigation = footer.navigation ?? {};
  const newsletter = footer.newsletter ?? {};
  const bottom = footer.bottomBar ?? {};

  const brandName = brand.name || "Chalet Manager";
  const year = new Date().getFullYear();

  const services =
    navigation.services?.links?.map((l) => ({
      ...l,
      href: localizeHref(l.href, locale),
    })) || [];
  const company =
    navigation.company?.links?.map((l) => ({
      ...l,
      href: localizeHref(l.href, locale),
    })) || [];

  const bottomLinks =
    bottom.links?.map((l) => ({ ...l, href: localizeHref(l.href, locale) })) ||
    [];

  const adminLink = {
    name: locale === "fr" ? "Connexion Admin" : "Admin login",
    href: localizeHref("/signin", locale),
  };

  const displayBottomLinks = bottomLinks.some((b) => b.href === adminLink.href)
    ? bottomLinks
    : [...bottomLinks, adminLink];

  return (
    <footer className="bg-neutral-900 text-neutral-500 text-sm">
      {/* 4 colonnes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Colonne 1 - Logo / texte / contact */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Mountain
                className="h-20 w-20 text-amber-700"
                aria-hidden="true"
              />
              <span className={`${pacifico.className} text-xl text-neutral-100`}>
                {brandName}
              </span>
            </div>
            {brand.description && (
              <p className="text-neutral-500 leading-relaxed mb-6">
                {brand.description}
              </p>
            )}
            <div className="space-y-3 text-neutral-400">
              {contact.email && (
                <div className="flex items-center space-x-3">
                  <FiMail className="text-amber-700 shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-white transition"
                  >
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center space-x-3">
                  <FiPhone className="text-amber-700" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="hover:text-white transition"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.locationLines && (
                <div className="flex items-start space-x-3">
                  <FiMapPin className="text-amber-700 mt-1" />
                  <span>
                    {contact.locationLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i !== contact.locationLines.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Colonne 2 - Services */}
          <div>
            <h3 className="text-white uppercase tracking-wide text-sm mb-6">
              {navigation.services?.title}
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Entreprise */}
          <div>
            <h3 className="text-white uppercase tracking-wide text-sm mb-6">
              {navigation.company?.title}
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Newsletter */}
          <div>
            <h3 className="text-white uppercase tracking-wide text-sm mb-6">
              {newsletter.title}
            </h3>
            {newsletter.description && (
              <p className="text-neutral-500 text-xs mb-3">
                {newsletter.description}
              </p>
            )}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder={newsletter.placeholder}
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-500"
              />
              <button className="w-full py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition">
                {newsletter.button}
              </button>
            </form>

            {newsletter.followUs && (
              <>
                <p className="text-neutral-500 text-xs mt-6 mb-3">
                  {newsletter.followUs}
                </p>
                <div className="flex space-x-3">
                  {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                    <a
                      key={name}
                      href={href}
                      className="p-2 bg-neutral-800 rounded-md hover:bg-amber-700 transition group"
                    >
                      <Icon className="h-5 w-5 text-neutral-500 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bas du footer */}


      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[10px] text-neutral-600 uppercase">
              © {year} {brandName}. {bottom?.copyright}
            </div>
            <div className="flex items-center space-x-6">
              {displayBottomLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[11px] uppercase hover:text-white transition-colors duration-200 ${
                    item.href === adminLink.href
                      ? "text-amber-700"
                      : "text-neutral-500"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
