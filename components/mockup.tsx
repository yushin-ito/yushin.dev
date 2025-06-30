import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import Icons from "@/components/icons";

interface MockupProps {
  title: string;
  src: string;
}

const Mockup = ({ title, src }: MockupProps) => {
  return (
    <div className="mx-auto w-full overflow-hidden rounded-xl border shadow">
      <div className="relative flex h-10 items-center justify-center border-b bg-muted sm:h-10">
        <div className="absolute left-4 flex space-x-2">
          <div className="size-2 rounded-full bg-red-500 sm:size-2.5" />
          <div className="size-2 rounded-full bg-yellow-500 sm:size-2.5" />
          <div className="size-2 rounded-full bg-green-500 sm:size-2.5" />
        </div>
        <div className="relative flex w-1/2 items-center justify-center rounded-md border bg-background py-0.5 text-center text-muted-foreground">
          <Icons.search className="absolute left-2 size-3" />
          <p className="text-xs">{title}</p>
        </div>
      </div>
      <ScrollArea className="aspect-video w-full">
        <Image src={src} alt={title} width="1920" height="0" />
      </ScrollArea>
    </div>
  );
};

export default Mockup;
