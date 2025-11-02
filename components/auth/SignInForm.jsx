//componens/auth/SignInForm.jsx
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import Alert from "../../components/Alert";
import { TextField } from "../../components/FormField";
import { useDictionary } from "../../lib/i18n/context";

export default function SignInForm({ compact = false, lang: langProp }) {
  const dict = useDictionary();
  const router = useRouter();
  const routeParams = useParams();
  const lang =
    typeof langProp === "string" && langProp
      ? langProp
      : routeParams?.lang ?? "fr";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", { redirect: false, email, password });
      if (result?.error) throw new Error(result.error);

      const session = await waitForSession();
      const role = session?.user?.role;
      const dest = role === "admin" ? "/admin" : role === "owner" ? "/owner" : "/tenant";
      router.replace(dest);
    } catch (err) {
      setError(err?.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={compact ? "" : "mx-auto mt-16 max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"}>
      {!compact && (
        <>
          <h1 className="text-3xl font-semibold text-neutral-900">{dict.auth.signinTitle}</h1>
          <p className="mt-2 text-sm text-neutral-600">{dict.auth.welcomeBack}</p>
        </>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {error ? <Alert type="error" message={error} /> : null}

        <TextField
          id="email" label={dict.auth.email} type="email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          autoComplete="email" required
        />
        <TextField
          id="password" label={dict.auth.password} type="password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password" required
        />

        <button
          type="submit"
          className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-neutral-700 disabled:opacity-50"
          disabled={loading} aria-disabled={loading}
        >
          {loading ? "…" : dict.auth.submit}
        </button>
      </form>

      {!compact && (
        <p className="mt-6 text-sm text-neutral-600">
          {dict.auth.needAccount}{" "}
          <Link className="font-semibold text-neutral-900 hover:underline" href={`/${lang}/signup`}>
            {dict.navigation.signup}
          </Link>
        </p>
      )}
    </div>
  );
}

async function waitForSession(timeoutMs = 2000, intervalMs = 120) {
  const start = Date.now();
  let session = await getSession();
  while (!session && Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, intervalMs));
    session = await getSession();
  }
  return session;
}
