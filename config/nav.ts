import { NavConfig } from "@/types";

export const navConfig = {
  contents: [
    {
      label: "top",
      href: "/",
    },
    {
      label: "about",
      href: "/about",
    },
    {
      label: "works",
      href: "/works",
    },
    {
      label: "blog",
      href: "/blog",
    },
    {
      label: "contact",
      href: "/contact",
    },
  ],
  dashboard: [
    {
      label: "post",
      href: "/dashboard",
      icon: "post",
    },
    {
      label: "analytics",
      href: "/dashboard/analytics",
      icon: "chart",
    },
    {
      label: "settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
} satisfies NavConfig;
