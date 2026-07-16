import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./lib/localization/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always"
});

export const config = {
  matcher: ["/", "/(ru|en|it)/:path*"]
};
