import Modal from "../../../../components/Modal";
import SignUpForm from "../../../../components/auth/SignUpForm";
import { getDictionary } from "../../../../lib/i18n/dictionaries";

export default async function SignUpModal({ params }) {
  const { lang } = await params;
  const dict = await Promise.resolve(getDictionary(lang));
  return (
    <Modal title={dict?.auth?.signupTitle ?? "Sign up"}>
      <SignUpForm compact />
    </Modal>
  );
}
