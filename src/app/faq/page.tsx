import FaqSection from "@/components/layout/FaqSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};
export default function FAQPage() {
  return (
    <main className="min-h-screen py-12 px-4 bg-gray-100 dark:bg-black">
      <FaqSection />
    </main>
  );
}
