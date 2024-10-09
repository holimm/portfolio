export const dictionaries: {
  en: () => Promise<any>;
  vi: () => Promise<any>;
} = {
  en: () =>
    import("@/config/localization/en.json").then((module) => module.default),
  vi: () =>
    import("@/config/localization/vi.json").then((module) => module.default),
};
