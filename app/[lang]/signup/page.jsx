//app/[lang]/signup/page.jsx

"use client";

import { signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import Alert from "../../../components/Alert";
import { CheckboxField, SelectField, TextField } from "../../../components/FormField";
import { useDictionary } from "../../../lib/i18n/context";

export default function SignUpPage() {
  const dict = useDictionary();
  const router = useRouter();
  const { lang } = useParams(); // ✅ au lieu de props.params

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "tenant",
    accepted: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="mx-auto mt-16 max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-neutral-900">{dict.auth.signupTitle}</h1>
      <p className="mt-2 text-sm text-neutral-600">{dict.auth.welcomeNew}</p>

      <form
        className="mt-6 space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          setSuccess("");

          if (!form.accepted) {
            setError(
              lang === "fr"
                ? "Merci d'accepter les conditions pour poursuivre."
                : "Please accept the terms to continue."
            );
            return;
          }

          setLoading(true);
          try {
            const response = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(form),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Unable to sign up");

            setSuccess(
              lang === "fr"
                ? "Inscription réussie ! Connexion en cours..."
                : "Account created! Signing you in..."
            );

            const signinResult = await signIn("credentials", {
              redirect: false,
              email: form.email,
              password: form.password,
            });

            if (signinResult?.error) {
              setSuccess(
                lang === "fr"
                  ? "Inscription réussie. Connectez-vous avec vos identifiants."
                  : "Account created. Please sign in manually."
              );
              // redirige vers la page de login localisée
              router.push(`/${lang}/signin`);
            } else {
              const destination =
                form.role === "owner" ? "/owner" : form.role === "tenant" ? "/tenant" : "/admin";
              router.replace(destination);
            }
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        <Alert type="error" message={error} />
        <Alert type="success" message={success} />

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            id="firstName"
            label={dict.auth.firstName}
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            required
          />
          <TextField
            id="lastName"
            label={dict.auth.lastName}
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            required
          />
        </div>

        <TextField
          id="email"
          label={dict.auth.email}
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          required
        />
        <TextField
          id="password"
          label={dict.auth.password}
          type="password"
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          minLength={8}
          required
        />

        <SelectField
          id="role"
          label={dict.auth.roleQuestion}
          value={form.role}
          onChange={(e) => updateField("role", e.target.value)}
          required
        >
          <option value="tenant">{dict.auth.tenant}</option>
          <option value="owner">{dict.auth.owner}</option>
        </SelectField>

        <CheckboxField
          id="accepted"
          label={dict.auth.accept}
          checked={form.accepted}
          onChange={(e) => updateField("accepted", e.target.checked)}
          required
        />

        <button
          type="submit"
          className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-neutral-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "..." : dict.auth.submit}
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-600">
        {dict.auth.alreadyAccount}{" "}
        <Link className="font-semibold text-neutral-900 hover:underline" href={`/${lang}/signin`}>
          {dict.navigation.signin}
        </Link>
      </p>
    </div>
  );
}
