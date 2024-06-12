"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselHero() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const myArray = [
    { name: "تمام ٹیکسز لینڈ ریونیو ایکٹ 1967 کے مطابق " },
    { name: "ایف بی آر فیس بمطابق فئینانس آرڈینینس 2001" },
    { name: "ضلع کونسل یا ٹی ایم اے فیس" },
    { name: "اندرون حدود کمیٹی یا زرعی رقبہ کے ٹیکس" },
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {myArray.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center md:p-6 p-2 h-[50vh]">
                  <span className="text-nafees md:text-5xl text-sm md:font-semibold font-bold leading-3">
                    {item.name}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
