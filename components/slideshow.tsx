"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import Icons from "@/components/icons";
import useFullscreen from "@/hooks/use-fullscreen";

interface SlideshowProps {
  deck: {
    directory: string;
    length: number;
  };
}

const Slideshow = ({ deck }: SlideshowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { isFullscreen, enter, exit } = useFullscreen(ref);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div ref={ref}>
      <Carousel
        className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl border transition-colors"
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        {api && (
          <div className="absolute inset-x-0 bottom-0 z-10 hidden h-8 items-center justify-center transition-colors duration-200 group-hover:flex group-hover:bg-black/70 md:h-10">
            <div className="absolute left-2.5 flex items-center space-x-1">
              <Button
                variant="unstyled"
                className="size-6 p-0 text-white hover:bg-black/50 sm:size-8 [&_svg]:size-4 sm:[&_svg]:size-6"
                onClick={() => api.scrollPrev()}
                disabled={!api.canScrollPrev()}
              >
                <Icons.chevronLeft />
              </Button>
              <Button
                variant="unstyled"
                className="size-6 p-0 text-white hover:bg-black/50 sm:size-8 [&_svg]:size-4 sm:[&_svg]:size-6"
                onClick={() => api.scrollNext()}
                disabled={!api.canScrollNext()}
              >
                <Icons.chevronRight />
              </Button>
            </div>
            <div className="text-xs font-semibold text-white sm:text-sm">
              {current} / {count}
            </div>
            <Button
              variant="unstyled"
              className="absolute right-2.5 size-6 p-0 text-white hover:bg-black/50 sm:size-8 [&_svg]:size-3 sm:[&_svg]:size-5"
              onClick={!isFullscreen ? enter : exit}
            >
              {isFullscreen ? <Icons.minimize /> : <Icons.maximize />}
            </Button>
          </div>
        )}

        <CarouselContent>
          {Array.from({ length: deck.length }).map((_, index) => (
            <CarouselItem key={index}>
              <Image
                alt={index.toString()}
                src={`${deck.directory}/${index + 1}.png`}
                width={1920}
                height={1080}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Slideshow;
