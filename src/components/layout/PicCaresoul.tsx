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
          className="relative aspect-square w-full h-96"
        >
          <Image
            src={image.url}
            //className="p-6 rounded-lg"
            alt={`Carousel Main Image ${index + 1}`}
            quality={75}
            fill
            //width={500}
            //height={500}

            style={{
              objectFit: "cover",
              borderRadius: "1%",
            }}
            priority={true}
          />
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
    <div className="w-full max-w-full mx-auto">
      <Carousel plugins={[plugin.current]} setApi={setMainApi}>
        <CarouselContent className="m-1">{mainImage}</CarouselContent>
      </Carousel>
      <Carousel setApi={setThumbnailApi}>
        <CarouselContent className="m-1 flex justify-center">
          {thumbnailImages}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Gallery;
