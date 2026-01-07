import { defineMiddleware, sequence } from "astro:middleware";
import { AsyncLocalStorage } from "node:async_hooks";
import {
	baseLocale,
	type Locale,
	overwriteGetLocale,
} from "@/paraglide/runtime";

const asyncStorage = new AsyncLocalStorage<Locale>();
overwriteGetLocale(() => asyncStorage.getStore() ?? baseLocale);

const paraglideMiddleware = defineMiddleware((context, next) => {
	const locale = (context.currentLocale as Locale | undefined) ?? baseLocale;
	return asyncStorage.run(locale, async () => await next());
});

export const onRequest = sequence(paraglideMiddleware);
