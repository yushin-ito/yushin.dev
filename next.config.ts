import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { createContentlayerPlugin } from "next-contentlayer2";

import "@/env";

const withContentlayer = createContentlayerPlugin();
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default withContentlayer(withNextIntl(nextConfig));
