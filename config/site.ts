import env from "@/env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description: "Yushin's Portfolio",
  domain: env.NEXT_PUBLIC_APP_DOMAIN,
  url: env.NEXT_PUBLIC_APP_URL,
  links: {
    github: "https://github.com/yushin-ito",
    x: "https://x.com/yushin_ito",
    instagram: "https://instagram.com/yushin_505",
  },
};
