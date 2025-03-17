import env from "@/env";
import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description: "Yushin's Portfolio",
  domain: env.NEXT_PUBLIC_APP_DOMAIN,
  url: env.NEXT_PUBLIC_APP_URL,
  links: {
    github: "https://github.com/yushin-ito",
    x: "https://x.com/yushin_ito",
    discord: "https://discord.gg",
  },
};
