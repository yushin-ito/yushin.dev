import Image from "next/image";

import { Card, CardContent } from "@/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/carousel";

const WorksPage = () => {
  return (
    <section className="py-6 md:py-8 lg:py-12">
      <div className="container max-w-5xl">
        <div className="space-y-1">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Works</h1>
          <p className="text-sm text-muted-foreground">
            私の作品について紹介するページです。
          </p>
        </div>
        <hr className="mb-8 mt-4 w-full" />
      </div>
      <div className="container flex max-w-5xl items-center justify-center gap-12">
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({ length: 24 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden">
                  <CardContent className="relative aspect-[16/9]">
                    <Image
                      alt={index.toString()}
                      src={`/images/works/farmlink/slides/${index + 1}.png`}
                      fill
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute" />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default WorksPage;
