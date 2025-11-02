import "./globals.css";

export const metadata = {
  title: "Chalet Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
