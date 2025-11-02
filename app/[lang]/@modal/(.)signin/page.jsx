import Modal from "../../../../components/Modal";
import SignInForm from "../../../../components/auth/SignInForm";
import { getDictionary } from "../../../../lib/i18n/dictionaries";

export default async function SignInModal({ params }) {
  const { lang } = await params;
  const dict = await Promise.resolve(getDictionary(lang));
  return (
    <Modal title={dict?.auth?.signinTitle ?? "Sign in"}>
      <SignInForm compact />
    </Modal>
  );
}
