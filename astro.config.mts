// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";
import { siteConfig } from "./src/lib/config";

// https://astro.build/config
export default defineConfig({
	site: siteConfig.url,
	i18n: {
		locales: ["en", "ja"],
		defaultLocale: "ja",
	},
	vite: {
		plugins: [
			paraglideVitePlugin({
				project: "./project.inlang",
				outdir: "./src/paraglide",
			}),
			tailwindcss(),
		],
	},
	integrations: [
		react(),
		mdx({
			syntaxHighlight: false,
			rehypePlugins: [
				[
					rehypePrettyCode,
					{
						theme: {
							dark: "github-dark",
							light: "github-light-default",
						},
						transformers: [
							transformerCopyButton({
								visibility: "always",
								feedbackDuration: 2_000,
								copyIcon:
									"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvcHktaWNvbiBsdWNpZGUtY29weSI+PHJlY3Qgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiB4PSI4IiB5PSI4IiByeD0iMiIgcnk9IjIiLz48cGF0aCBkPSJNNCAxNmMtMS4xIDAtMi0uOS0yLTJWNGMwLTEuMS45LTIgMi0yaDEwYzEuMSAwIDIgLjkgMiAyIi8+PC9zdmc+",
								successIcon:
									"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZWNrLWljb24gbHVjaWRlLWNoZWNrIj48cGF0aCBkPSJNMjAgNiA5IDE3bC01LTUiLz48L3N2Zz4=",
							}),
						],
					},
				],
			],
		}),
		sitemap(),
	],
	experimental: {
		fonts: [
			{
				provider: fontProviders.google(),
				name: "Roboto",
				cssVariable: "--font-roboto",
				weights: [400, 500, 600, 700],
				fallbacks: [],
			},
			{
				provider: fontProviders.google(),
				name: "Noto Sans JP",
				cssVariable: "--font-noto-sans-jp",
				weights: [400, 500, 600, 700],
				fallbacks: [],
			},
		],
	},
});
