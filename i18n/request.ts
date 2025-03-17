import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "ja";

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
