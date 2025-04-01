import { Search } from "lucide-react";
import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";

interface MockupProps {
  title: string;
  src: string;
}

const Mockup = ({ title, src }: MockupProps) => {
  return (
    <div className="mx-auto overflow-hidden rounded-xl border shadow">
      <div className="relative flex h-10 items-center justify-center border-b bg-muted sm:h-12">
        <div className="absolute left-4 flex space-x-2">
          <div className="size-2.5 rounded-full bg-red-500 sm:size-3" />
          <div className="size-2.5 rounded-full bg-yellow-500 sm:size-3" />
          <div className="size-2.5 rounded-full bg-green-500 sm:size-3" />
        </div>
        <div className="relative flex w-1/2 items-center justify-center rounded-md border bg-background py-1 text-center text-muted-foreground">
          <Search className="absolute left-2 size-3 sm:size-4" />
          <p className="text-xs sm:text-sm">{title}</p>
        </div>
      </div>
      <ScrollArea className="aspect-video w-full">
        <Image src={src} alt={title} width="1920" height="0" />
      </ScrollArea>
    </div>
  );
};

export default Mockup;
