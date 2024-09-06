import HeaderSectionPage from "./compo/headerSection";
import InstructionsPage from "@/components/layout/Instructions";
import FormCalculatorPage from "@/components/layout/CalculatorForm";
import Gallery from "@/components/layout/PicCaresoul";
import { IImage } from "@/lib/types";
import { YouTubeCarousel } from "@/components/layout/YoutubeCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ContactPage from "@/components/layout/contact";

const images: IImage[] = [
  { url: "/4.webp" },
  { url: "/1.jpeg" },
  { url: "/3.webp" },
  { url: "/hero-image1.png" },

  // Add more images as needed
];

export default function Home() {
  return (
    <>
      <section className="md:mt-5 mt-2" id="home">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-y-3">
          <div className="w-full">
            <HeaderSectionPage
              header="LAND TRANSFER FEE"
              subHeader="تخمینہ اراضی فیس"
              isVisible={true}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <Gallery images={images} />
            {/* <CarouselHero /> */}
          </div>
        </div>
      </section>
      <section id="calculator">
        <FormCalculatorPage />
      </section>
      <section id="instructions">
        <InstructionsPage />
      </section>
      <section className="lg:mt-10 mt-3" id="videos">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-y-3">
          <div className="w-full">
            <HeaderSectionPage
              header="Land related Videos"
              subHeader=""
              isVisible={true}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <YouTubeCarousel />
          </div>
          <div className="max-w-sm mx-auto">
            <Link
              href="https://www.youtube.com/channel/UCG9OkUvnNpotAUAmSotzrWQ"
              target="_blank"
              className="inline-block px-4 py-2 bg-pehla text-white rounded-md hover:bg-indigo-300 md:text-lg text-sm font-semibold"
            >
              Click For More Videos
            </Link>
          </div>
        </div>
      </section>
      <section className="lg:mt-10 mt-6" id="contact">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-y-3">
          <div className="w-full">
            <HeaderSectionPage
              header="contact us"
              subHeader="مزید معلومات کیلئے رابطہ کریں"
              isVisible={true}
            />
          </div>
          <div className="lg:mt-3 w-full flex items-center justify-center">
            <ContactPage />
          </div>
        </div>
      </section>
    </>
  );
}
