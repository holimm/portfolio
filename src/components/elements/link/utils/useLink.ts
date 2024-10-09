import {
  cloneElement,
  isValidElement,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";

import { linkVariants, type LinkVariantProps } from "../styles/link.config";
import { redirectedPathName } from "@/utils/localization/redirectPathname";
import { i18n, Locale } from "../../../../../i18n.config";

export interface LinkProps extends LinkVariantProps {
  href?: string;
  ref?: React.Ref<HTMLAnchorElement> | undefined;
}
export type UseLinkProps = LinkProps &
  Omit<LinkVariantProps, keyof LinkVariantProps>;

export const useLink = (props: UseLinkProps) => {
  const { ref: linkRef, href, variant = "default" } = props;

  const { root: linkStyle } = useMemo(
    () =>
      linkVariants({
        variant,
      }),
    [variant],
  );

  const handleHref = useCallback((locale: string | string[], href: string) => {
    if (i18n.locales.includes(locale as Locale) && href)
      return redirectedPathName(locale as Locale, href);
    else return redirectedPathName(i18n.defaultLocale, href);
  }, []);

  return {
    variant,
    href,
    handleHref,
    linkStyle,
    linkRef,
  };
};
