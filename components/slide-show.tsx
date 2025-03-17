"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import Icons from "./icons";

interface SlideShowProps {
  deck: {
    directory: string;
    length: number;
  };
}

const SlideShow = ({ deck }: SlideShowProps) => {
  const slideShowRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const onFullScreen = () => {
    if (!slideShowRef.current) return;

    if (!document.fullscreenElement) {
      slideShowRef.current.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      });
    }
  };

  return (
    <div ref={slideShowRef} className="relative">
      <Carousel
        className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl border transition-colors"
        setApi={setApi}
      >
        {api && (
          <div className="absolute inset-x-0 bottom-0 z-10 flex h-[42px] items-center justify-center transition-colors duration-200 group-hover:bg-black/70">
            <div className="absolute left-2.5 flex items-center space-x-1">
              <Button
                variant="unstyled"
                className="size-8 p-0 text-white hover:bg-black/50 [&_svg]:size-6"
                onClick={() => api.scrollPrev()}
                disabled={!api.canScrollPrev()}
              >
                <Icons.chevronLeft />
              </Button>
              <Button
                variant="unstyled"
                className="size-8 p-0 text-white hover:bg-black/50 [&_svg]:size-6"
                onClick={() => api.scrollNext()}
                disabled={!api.canScrollNext()}
              >
                <Icons.chevronRight />
              </Button>
            </div>
            <div className="text-sm font-semibold text-white">
              {current} / {count}
            </div>
            <Button
              variant="unstyled"
              className="absolute right-2.5 size-8 p-0 text-white hover:bg-black/50 [&_svg]:size-5"
              onClick={onFullScreen}
            >
              {isFullScreen ? <Icons.minimize /> : <Icons.maximize />}
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

export default SlideShow;
