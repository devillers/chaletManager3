import SignUpForm from "../../../components/auth/SignUpForm";

export default async function SignUpPage({ params }) {
  const { lang } = await params;
  return <SignUpForm lang={lang} />;
}
