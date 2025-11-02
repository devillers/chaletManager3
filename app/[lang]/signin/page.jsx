import SignInForm from "../../../components/auth/SignInForm";

export default async function SignInPage({ params }) {
  const { lang } = await params;
  return <SignInForm lang={lang} />;
}
