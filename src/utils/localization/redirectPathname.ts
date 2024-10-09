import { Locale } from "../../../i18n.config";

export const redirectedPathName = (locale: Locale, pathName: string) => {
  if (!pathName) return "/";
  const segments = pathName.split("/").filter(Boolean);

  if (segments[0] === locale) {
    return `/${segments.join("/")}`;
  }

  return `/${locale}/${segments.join("/")}`;
};

export const redirectedLocalePathname = (locale: Locale, pathName: string) => {
  if (!pathName) return "/";
  const segments = pathName.split("/");
  segments[1] = locale;
  return segments.join("/");
};

export function getCurrentPage(pathName: string) {
  const segments = pathName.split("/").filter(Boolean);
  return segments.length > 1 ? segments[1] : null;
}
