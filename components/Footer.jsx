"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Pacifico } from "next/font/google";
import { useDictionary } from "../lib/i18n/context";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

function Mountain({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M3 19h18L14 5l-3.5 7L9 10 3 19z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Mail({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Phone({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M8.5 4.5h-2a2 2 0 0 0-2 2c0 7.18 5.82 13 13 13a2 2 0 0 0 2-2v-2a1 1 0 0 0-.88-.99l-3.2-.53a1 1 0 0 0-1 .5l-.9 1.62a1 1 0 0 1-1.28.43 9.05 9.05 0 0 1-4.3-4.3 1 1 0 0 1 .43-1.28l1.62-.9a1 1 0 0 0 .5-1l-.53-3.2A1 1 0 0 0 8.5 4.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPin({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Facebook({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8v3h3v7h3v-7h2.5l.5-3H14V9z"
        fill="currentColor"
      />
    </svg>
  );
}

function Twitter({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M21 5.92a5.44 5.44 0 0 1-1.57.43 2.73 2.73 0 0 0 1.2-1.51 5.47 5.47 0 0 1-1.73.66A2.72 2.72 0 0 0 12.5 8a7.73 7.73 0 0 1-5.61-2.85A2.72 2.72 0 0 0 7.6 9.6 2.7 2.7 0 0 1 6 9.16v.03a2.72 2.72 0 0 0 2.18 2.67 2.72 2.72 0 0 1-1.23.05 2.72 2.72 0 0 0 2.54 1.89A5.46 5.46 0 0 1 4 15.54 7.71 7.71 0 0 0 8.18 17a7.7 7.7 0 0 0 7.77-7.77v-.35A5.52 5.52 0 0 0 21 5.92z"
        fill="currentColor"
      />
    </svg>
  );
}

function Instagram({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function Linkedin({ className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M6.5 9.5h2.5v8H6.5z" fill="currentColor" />
      <path d="M7.75 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor" />
      <path
        d="M11 9.5h2.4v1.1h.03c.33-.62 1.12-1.27 2.32-1.27 2.48 0 2.93 1.63 2.93 3.74V17.5h-2.5v-3.87c0-.92-.02-2.12-1.29-2.12-1.3 0-1.5 1.01-1.5 2.05v3.94H11v-8z"
        fill="currentColor"
      />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
];

function localizeHref(href, locale) {
  if (!href) return "#";
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }
  if (href.startsWith("/")) {
    return `/${locale}${href}`.replace(/\/\/+/, "/");
  }
  return href;
}

export default function Footer() {
  const dict = useDictionary();
  const params = useParams();
  const localeParam = params?.lang;
  const locale = Array.isArray(localeParam) ? localeParam[0] : localeParam || "fr";

  const footerDict = dict.footer || {};
  const {
    brand = {},
    contact = {},
    navigation = {},
    newsletter = {},
    bottomBar = {},
    bottomLinks = [],
    adminLoginLink,
  } = footerDict;

  const brandName = brand.name || "Chalet Manager";
  const currentYear = new Date().getFullYear();

  const localizedNavigation = {
    services: {
      title: navigation.services?.title || "",
      links: (navigation.services?.links || []).map((item) => ({
        ...item,
        href: localizeHref(item.href, locale),
      })),
    },
    company: {
      title: navigation.company?.title || "",
      links: (navigation.company?.links || []).map((item) => ({
        ...item,
        href: localizeHref(item.href, locale),
      })),
    },
  };

  const displayBottomLinks = (Array.isArray(bottomLinks) ? bottomLinks : []).map((item) => ({
    ...item,
    href: localizeHref(item.href, locale),
  }));

  const adminLink = adminLoginLink
    ? { ...adminLoginLink, href: localizeHref(adminLoginLink.href, locale) }
    : {
        name: locale === "fr" ? "Connexion Admin" : "Admin Login",
        href: `/${locale}/signin`,
      };

  return (
    <footer className="bg-neutral-950 text-neutral-300" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <Mountain className="h-6 w-6 text-amber-500" />
              <span className={`${pacifico.className} text-xl text-white`}>{brandName}</span>
            </div>

            {brand.description && (
              <p className="text-sm leading-relaxed text-neutral-400">{brand.description}</p>
            )}

            <div className="space-y-4 text-sm">
              {contact.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-3 w-3 text-amber-500 flex-shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  >
                    {contact.email}
                  </a>
                </div>
              )}

              {contact.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-3 w-3 text-amber-500 flex-shrink-0" />
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}

              {Array.isArray(contact.locationLines) && contact.locationLines.length > 0 && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-3 w-3 text-amber-500 flex-shrink-0" />
                  <span className="text-neutral-400">
                    {contact.locationLines.map((line, index) => (
                      <span key={line}>
                        {line}
                        {index !== contact.locationLines.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-200">
              {localizedNavigation.services.title}
            </h3>
            <ul className="space-y-3 text-sm">
              {localizedNavigation.services.links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:text-white focus-visible:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-200">
              {localizedNavigation.company.title}
            </h3>
            <ul className="space-y-3 text-sm">
              {localizedNavigation.company.links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:text-white focus-visible:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-200">
                {newsletter.title}
              </h3>

              {newsletter.description && (
                <p className="text-sm leading-relaxed text-neutral-400">{newsletter.description}</p>
              )}
            </div>

            {newsletter.placeholder && newsletter.button && (
              <form className="space-y-3" onSubmit={(event) => event.preventDefault()}>
                <input
                  type="email"
                  placeholder={newsletter.placeholder}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors duration-150 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                >
                  {newsletter.button}
                </button>
              </form>
            )}

            {newsletter.followUs && (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                  {newsletter.followUs}
                </p>
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map(({ name, href, icon: IconComponent }) => (
                    <a
                      key={name}
                      href={href}
                      className="group flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 transition-colors duration-150 hover:border-amber-500 hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                      aria-label={name}
                    >
                      <IconComponent className="h-4 w-4 text-neutral-400 transition-colors duration-150 group-hover:text-neutral-900" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              © {currentYear} {brandName}
              {bottomBar.copyright ? `. ${bottomBar.copyright}` : null}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {displayBottomLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:text-white focus-visible:underline"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href={adminLink.href}
                className="font-semibold text-amber-500 transition-colors duration-150 hover:text-amber-400 focus-visible:outline-none focus-visible:text-amber-300 focus-visible:underline"
              >
                {adminLink.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
