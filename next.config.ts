import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { createContentlayerPlugin } from "next-contentlayer2";

import "@/env";

const withContentlayer = createContentlayerPlugin();
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "yushin.dev"],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default withContentlayer(withNextIntl(nextConfig));
