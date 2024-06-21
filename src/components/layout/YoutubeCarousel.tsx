"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function YouTubeCarousel() {
  const videos = [
    { url: "https://www.youtube.com/embed/_Z002CTc4mU?si=0VjtohBj8U9uU-Io" },
    { url: "https://www.youtube.com/embed/n3swIie56Ac?si=GhuPdXPaspOQFDmf" },
    { url: "https://www.youtube.com/embed/Lht9nyaJIu0?si=p3E0mOBSa9LwOz8Q" },
    { url: "https://www.youtube.com/embed/RTB9DIeaNLA?si=eYZXfO7ddTka6xYY" },
    { url: "https://www.youtube.com/embed/JzDgrAl1di8?si=TFHVvTlKEAQgrVwD" },
  ];

  // if (!isMounted) {
  //   return null; // Render nothing on the server
  // }
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full md:max-w-4xl max-w-xs relative"
    >
      <CarouselContent>
        {videos.map((video, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-0">
                  <div className="w-full h-full overflow-hidden rounded-lg">
                    <iframe
                      src={video.url}
                      width="100%"
                      height="100%"
                      title={`youtube video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="md:hidden absolute top-1/2 transform -translate-y-1/2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer z-10 hover:bg-opacity-75" />
      <CarouselNext className="md:hidden absolute top-1/2 transform -translate-y-1/2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer z-10 hover:bg-opacity-75" />
      <CarouselPrevious className="hidden md:flex md:items-center md:justify-center" />
      <CarouselNext className="hidden md:flex md:items-center md:justify-center" />
    </Carousel>
  );
}
