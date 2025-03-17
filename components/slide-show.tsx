import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface SlideShowProps {
  deck: {
    title: string;
    directory: string;
    length: number;
  };
}

const SlideShow = ({ deck }: SlideShowProps) => {
  return (
    <Carousel className="aspect-[16/9] w-full overflow-hidden rounded-xl border transition-colors">
      <CarouselContent>
        {Array.from({ length: deck.length }).map((_, index) => (
          <CarouselItem key={index}>
            <Image
              alt={index.toString()}
              src={`${deck.directory}/${index + 1}.png`}
              width={1920}
              height={1080}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default SlideShow;
