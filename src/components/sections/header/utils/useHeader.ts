"use client";
import { useMemo } from "react";

import {
  headerVariants,
  type HeaderVariantProps,
} from "../styles/header.config";
import { Locale } from "../../../../../i18n.config";
import { usePathname } from "next/navigation";
import { getCurrentPage } from "@/utils/localization/redirectPathname";

export interface UseHeaderProps extends HeaderVariantProps {
  locale: Locale;
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useHeader = (props: UseHeaderProps) => {
  const { ref: headerRef, locale, variant } = props;
  const pathName = usePathname();

  const currentPage = getCurrentPage(pathName);

  const { root: headerStyle } = useMemo(
    () => headerVariants({ variant }),
    [variant],
  );

  return {
    variant,
    headerRef,
    currentPage,
    headerStyle,
  };
};

export type UseHeaderReturn = ReturnType<typeof useHeader>;
