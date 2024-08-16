import SigninClientPage from "./ClientComponenet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function SigninPage() {
  return (
    <section className="md:mt-8 my:9">
      <SigninClientPage />
    </section>
  );
}
