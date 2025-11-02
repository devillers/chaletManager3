import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chalet Manager",
  description:
    "Chalet Manager is a bilingual platform to manage luxury chalet rentals with dedicated dashboards for tenants, owners and administrators.",
  applicationName: "Chalet Manager",
};

export const viewport = {
  themeColor: "#111111",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-full" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-neutral-50 text-neutral-900`}>
        {children}
      </body>
    </html>
  );
}
