import HeaderSectionPage from "./compo/headerSection";
import InstructionsPage from "@/components/layout/Instructions";
import FormCalculatorPage from "@/components/layout/CalculatorForm";
import Head from "next/head";
import Gallery from "@/components/layout/PicCaresoul";
import { IImage } from "@/lib/types";
import { YouTubeCarousel } from "@/components/layout/YoutubeCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const images: IImage[] = [
  { url: "/3.webp" },
  { url: "/4.webp" },
  { url: "/1.jpeg" },
  { url: "/hero-image1.png" },

  // Add more images as needed
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Land Transfer Fee Calculator - Punjab</title>
        <meta
          name="description"
          content="Welcome to the Land Transfer Fee calculator for Punjab. Easily calculate the government tax fee for land mutations and deeds."
        />
        <meta
          name="keywords"
          content="land transfer fee, registry fee, deed fee calculate, fbr tax on land, fbr tax on land transfer, fbr 236c, fbr 236k, Punjab land taxes, mutation, deed, land transfer costs"
        />
      </Head>
      <section className="md:mt-5 mt-2" id="home">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-y-3">
          <div className="w-full">
            <HeaderSectionPage
              header="LAND TRANSFER FEE"
              subHeader="تخمینہ اراضی فیس"
              isVisible={true}
            />
          </div>
          {/* <div className="w-full mx-auto md:px-6 px-9 flex  justify-center"> */}
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
      <section className="mt-5" id="videos">
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
            <Button>
              <Link
                href={
                  "https://www.youtube.com/channel/UCG9OkUvnNpotAUAmSotzrWQ"
                }
                target="_blank"
              >
                <span className="md:text-lg text-sm font-semibold">
                  click for more videos
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mt-8" id="contact">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-y-3">
          <div className="w-full">
            <HeaderSectionPage
              header="contact us"
              subHeader="مزید معلومات کیلئے رابطہ کریں"
              isVisible={true}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="flex items-center gap-x-2">
              <span>
                <Image
                  src={"/whatsapp.png"}
                  alt="whatsapp icon"
                  width={40}
                  height={40}
                />
              </span>
              <span className="text-lg font-semibold underline">
                +92 315 7473 743
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
