import { CarouselHero } from "@/components/layout/heroCarousel";
import HeaderSectionPage from "./compo/headerSection";
import InstructionsPage from "@/components/layout/Instructions";
import FormCalculatorPage from "@/components/layout/CalculatorForm";

export default function Home() {
  return (
    <>
      <section className="mt-1">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-y-3">
          <div className="w-full">
            <HeaderSectionPage
              header="WELCOME TO LFC"
              subHeader="تخمینہ اراضی فیس"
            />
          </div>
          <div className="w-full mx-auto md:px-6 px-9 flex  justify-center">
            <CarouselHero />
          </div>
        </div>
      </section>
      <InstructionsPage />
      <FormCalculatorPage />
    </>
  );
}
