import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getImageByUrl = async (url: string, name: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    return null;
  }

  const blob = await response.blob();

  const file = new File([blob], `${name}.png`, {
    type: "image/png",
  });

  return file;
};
