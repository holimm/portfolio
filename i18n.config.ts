export const i18n = {
  localeDetection: false,
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix: "as-needed",
} as const;

export type Locale = (typeof i18n)["locales"][number];
