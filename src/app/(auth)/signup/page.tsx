import SignupClientPage from "./ClientCompoSignup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp",
};

export default function SignupPage() {
  return (
    <section className="md:mt-8 mt:9">
      <SignupClientPage />
    </section>
  );
}
