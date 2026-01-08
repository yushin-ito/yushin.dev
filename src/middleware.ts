import { defineMiddleware } from "astro:middleware";
import { baseLocale, type Locale, setLocale } from "@/paraglide/runtime";

export const onRequest = defineMiddleware((context, next) => {
	const locale = (context.currentLocale as Locale | undefined) ?? baseLocale;
	setLocale(locale, { reload: false });

	return next();
});
