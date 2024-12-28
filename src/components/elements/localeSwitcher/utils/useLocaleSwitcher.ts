import {
  cloneElement,
  isValidElement,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";

import {
  localeSwitcherVariants,
  type LocaleSwitcherVariantProps,
} from "../styles/localeSwitcher.config";
import { Locale } from "../../../../../i18n.config";
import { useRouter } from "next/navigation";
import { redirectedLocalePathname } from "@/utils/localization/redirectPathname";

export interface LocaleSwitcherProps extends LocaleSwitcherVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  locale?: Locale | string | string[];
}
export type UseLocaleSwitcherProps = LocaleSwitcherProps &
  Omit<LocaleSwitcherVariantProps, keyof LocaleSwitcherVariantProps>;

export const useLocaleSwitcher = (props: UseLocaleSwitcherProps) => {
  const { ref: localeSwitcherRef, variant = "default" } = props;
  const router = useRouter();

  const handleLocale = useCallback(
    (locale: Locale, pathName: string) => {
      router.push(redirectedLocalePathname(locale, pathName));
    },
    [router],
  );

  const { root: localeSwitcherStyle, option: localeSwitcherOptionStyle } =
    useMemo(
      () =>
        localeSwitcherVariants({
          variant,
        }),
      [variant],
    );

  return {
    variant,
    handleLocale,
    localeSwitcherStyle,
    localeSwitcherOptionStyle,
    localeSwitcherRef,
  };
};
