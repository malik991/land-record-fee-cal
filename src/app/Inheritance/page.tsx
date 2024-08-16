import ClientInheritancePage from "./ClientInheritance";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inheritance",
};

export default function InheritancePage() {
  return (
    <section className="md:my-8 my:9">
      <ClientInheritancePage />
    </section>
  );
}
