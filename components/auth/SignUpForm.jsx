//components/auth/SignupForm.jsx
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import Alert from "../Alert";
import { CheckboxField, SelectField, TextField } from "../FormField";
import { useDictionary } from "../../lib/i18n/context";

export default function SignUpForm({ compact = false, lang: langProp }) {
  const dict = useDictionary();
  const router = useRouter();
  const routeParams = useParams();
  const lang =
    typeof langProp === "string" && langProp
      ? langProp
      : routeParams?.lang ?? "fr";

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "",
    role: "tenant", accepted: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!form.accepted) {
      setError(lang === "fr" ? "Merci d'accepter les conditions pour poursuivre." : "Please accept the terms to continue.");
      return;
    }
    if (!form.email || !form.password || form.password.length < 8) {
      setError(lang === "fr"
        ? "Veuillez saisir un email valide et un mot de passe d'au moins 8 caractères."
        : "Please enter a valid email and a password of at least 8 characters."
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || (lang === "fr" ? "Inscription impossible" : "Unable to sign up"));

      setSuccess(lang === "fr" ? "Inscription réussie ! Connexion en cours..." : "Account created! Signing you in...");

      const signinResult = await signIn("credentials", { redirect: false, email: form.email, password: form.password });
      if (signinResult?.error) {
        setSuccess(lang === "fr" ? "Inscription réussie. Connectez-vous avec vos identifiants." : "Account created. Please sign in manually.");
        setTimeout(() => router.push(`/${lang}/signin`), 1200);
        return;
      }

      const session = await waitForSession();
      const role = session?.user?.role ?? form.role;
      const dest = role === "owner" ? "/owner" : role === "admin" ? "/admin" : "/tenant";
      router.replace(dest);
    } catch (err) {
      setError(err?.message || (lang === "fr" ? "Erreur inconnue" : "Unknown error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={compact ? "" : "mx-auto mt-16 max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"}>
      {!compact && (
        <>
          <h1 className="text-3xl font-semibold text-neutral-900">{dict.auth.signupTitle}</h1>
          <p className="mt-2 text-sm text-neutral-600">{dict.auth.welcomeNew}</p>
        </>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {error ? <Alert type="error" message={error} /> : null}
        {success ? <Alert type="success" message={success} /> : null}

        <div className="grid gap-4 md:grid-cols-2">
          <TextField id="firstName" label={dict.auth.firstName} value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} required />
          <TextField id="lastName" label={dict.auth.lastName} value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} required />
        </div>

        <TextField id="email" label={dict.auth.email} type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} autoComplete="email" required />
        <TextField id="password" label={dict.auth.password} type="password" value={form.password} onChange={(e) => updateField("password", e.target.value)} autoComplete="new-password" minLength={8} required />

        <SelectField id="role" label={dict.auth.roleQuestion} value={form.role} onChange={(e) => updateField("role", e.target.value)} required>
          <option value="tenant">{dict.auth.tenant}</option>
          <option value="owner">{dict.auth.owner}</option>
        </SelectField>

        <CheckboxField id="accepted" label={dict.auth.accept} checked={form.accepted} onChange={(e) => updateField("accepted", e.target.checked)} required />

        <button type="submit" className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-neutral-700 disabled:opacity-50" disabled={loading} aria-disabled={loading}>
          {loading ? "…" : dict.auth.submit}
        </button>
      </form>

      {!compact && (
        <p className="mt-6 text-sm text-neutral-600">
          {dict.auth.alreadyAccount}{" "}
          <Link className="font-semibold text-neutral-900 hover:underline" href={`/${lang}/signin`}>
            {dict.navigation.signin}
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
