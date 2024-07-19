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

export const metadata = {
  title: "Land Transfer Fee Calculator - Punjab",
  description:
    "Welcome to the Land Transfer Fee calculator for Punjab. Easily calculate the government tax fee for land mutations and deeds.",
  keywords:
    "land transfer fee 2024, land transfer fee 2025, FBR tax, registry fee, deed fee calculate, fbr tax on land, fbr tax on land transfer, fbr 236c, fbr 236k, Punjab land taxes, mutation, deed, land transfer costs",
  openGraph: {
    title: "Land Transfer Fee Calculator - Punjab",
    description:
      "Welcome to the Land Transfer Fee calculator for Punjab. Easily calculate the government tax fee for land mutations and deeds.",
    url: "https://alrehmanai-land-transfer-fee.vercel.app/",
    type: "website",
    images: [
      {
        url: "/hero-image1.png",
        width: 800,
        height: 600,
        alt: "Land Transfer Fee Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@malik991",
    title: "Land Transfer Fee Calculator - Punjab",
    description:
      "Welcome to the Land Transfer Fee calculator for Punjab. Easily calculate the government tax fee for land mutations and deeds.",
    image: "/hero-image1.png",
  },
  structuredData: {
    "@context": "https://alrehmanai-land-transfer-fee.vercel.app/",
    "@type": "WebSite",
    name: "Land Transfer Fee Calculator - Punjab",
    url: "https://yourwebsite.com",
  },
  metadataBase: new URL("https://alrehmanai-land-transfer-fee.vercel.app/"),
};

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
            <ContactPage />
          </div>
        </div>
      </section>
    </>
  );
}
