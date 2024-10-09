import { dictionaries } from "@/config/localization/dictionary";
import type { Locale } from "../../../i18n.config";

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
