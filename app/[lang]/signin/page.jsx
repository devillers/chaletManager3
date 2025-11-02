"use client";

import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Alert from "../../../components/Alert";
import { TextField } from "../../../components/FormField";
import { useDictionary } from "../../../lib/i18n/context";

export default function SignInPage({ params }) {
  const dict = useDictionary();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { lang } = params;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", { redirect: false, email, password });
      if (result?.error) {
        throw new Error(result.error);
      }
      const session = await getSession();
      const role = session?.user?.role;
      const destination = role === "admin" ? "/admin" : role === "owner" ? "/owner" : "/tenant";
      router.replace(destination);
    } catch (err) {
      setError(err.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-neutral-900">{dict.auth.signinTitle}</h1>
      <p className="mt-2 text-sm text-neutral-600">{dict.auth.welcomeBack}</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Alert type="error" message={error} />
        <TextField
          id="email"
          label={dict.auth.email}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextField
          id="password"
          label={dict.auth.password}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
        {dict.auth.needAccount}
        {" "}
        <a className="font-semibold text-neutral-900 hover:underline" href={`/${lang}/signup`}>
          {dict.navigation.signup}
        </a>
      </p>
    </div>
  );
}
