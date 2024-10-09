import { chain } from "@/middlewares/chain";
import { i18nMiddleware } from "@/middlewares/i18nMiddleware";

export default chain([i18nMiddleware]);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|favicons|robots.txt|sitemap-0.xml|sitemap.xml).*)",
  ],
};
