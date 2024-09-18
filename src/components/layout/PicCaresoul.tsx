"use client";
import { useEffect, useState, useMemo } from "react";
import { IImage } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

interface GalleryProps {
  images: IImage[];
}

const Gallery = ({ images }: GalleryProps) => {
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className="relative w-full h-96 md:h-screen flex justify-center items-center"
        >
          <div className="relative w-full h-full">
            <Image
              src={image.url}
              fill
              style={{ objectFit: "cover" }}
              alt={`hero images ${index + 1}`}
              className="rounded-lg"
              priority
            />
          </div>

          {/* <img
            src={image?.url}
            alt={`Carousel Main Image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          /> */}
        </CarouselItem>
      )),
    [images]
  );

  const thumbnailImages = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className="relative aspect-square w-full basis-1/4 cursor-pointer"
          onClick={() => handleClick(index)}
        >
          <Image
            className={`rounded-lg ${index === current ? "border-2" : ""}`}
            src={image.url}
            quality={75}
            //fill
            width={200}
            height={200}
            alt={`Carousel Thumbnail Image ${index + 1}`}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </CarouselItem>
      )),
    [images, current]
  );

  useEffect(() => {
    if (!mainApi || !thumbnailApi) {
      return;
    }

    const handleTopSelect = () => {
      const selected = mainApi.selectedScrollSnap();
      setCurrent(selected);
      thumbnailApi.scrollTo(selected);
    };

    const handleBottomSelect = () => {
      const selected = thumbnailApi.selectedScrollSnap();
      setCurrent(selected);
      mainApi.scrollTo(selected);
    };

    mainApi.on("select", handleTopSelect);
    thumbnailApi.on("select", handleBottomSelect);

    return () => {
      mainApi.off("select", handleTopSelect);
      thumbnailApi.off("select", handleBottomSelect);
    };
  }, [mainApi, thumbnailApi]);

  const handleClick = (index: number) => {
    if (!mainApi || !thumbnailApi) {
      return;
    }
    thumbnailApi.scrollTo(index);
    mainApi.scrollTo(index);
    setCurrent(index);
  };

  return (
    <div className="w-full flex flex-col items-center gap-y-3">
      <div className="w-full rounded-xl border p-2">
        <Carousel
          className="w-full"
          plugins={[plugin.current]}
          setApi={setMainApi}
        >
          <CarouselContent className="">{mainImage}</CarouselContent>
        </Carousel>
      </div>
      <div className="w-96 ">
        <Carousel setApi={setThumbnailApi}>
          <CarouselContent className="m-1 flex justify-center gap-x-0 p-0">
            {thumbnailImages}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Gallery;
