"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Modal({ title, children }) {
  const router = useRouter();
  const { lang = "fr" } = useParams() ?? {};

  function close() {
    if (window.history.length > 1) router.back();
    else router.push(`/${lang}`);
  }

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-100 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={close} />
      <div className="relative z-101 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={close}
            aria-label="Close"
            className="rounded-md px-2 py-1 text-sm hover:bg-neutral-100"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
