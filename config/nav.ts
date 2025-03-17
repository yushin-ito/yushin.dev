import { NavConfig } from "@/types";

export const navConfig: NavConfig = {
  content: [
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
      label: "posts",
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
};
