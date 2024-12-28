"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";

import {
  useLocaleSwitcher,
  type UseLocaleSwitcherProps,
} from "../utils/useLocaleSwitcher";
import { i18n, Locale } from "../../../../../i18n.config";
import { useParams, usePathname } from "next/navigation";

export interface LocaleSwitcherData {}

export interface LocaleSwitcherOptions extends UseLocaleSwitcherProps {}

export interface LocaleSwitcherProps
  extends LocaleSwitcherOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseLocaleSwitcherProps>,
    LocaleSwitcherData {}

export const LocaleSwitcher = forwardRef<HTMLDivElement, LocaleSwitcherProps>(
  ({ className, children, ...props }, ref) => {
    const { locale } = useParams();
    const { ...context } = useLocaleSwitcher({ ref, locale, ...props });
    const pathName = usePathname();

    const ctx = useMemo(() => context, [context]);
    const Component = "div";

    return (
      <Component
        ref={ctx.localeSwitcherRef}
        data-comp="localeSwitcher"
        className={`${className} ${ctx.localeSwitcherStyle()}`}
        {...props}
      >
        <select
          defaultValue={locale}
          onChange={(e) => {
            if (i18n.locales.includes(e.target.value as Locale))
              ctx.handleLocale(e.target.value as Locale, pathName);
          }}
        >
          {i18n.locales.map((locale) => {
            return (
              <option
                className={`${ctx.localeSwitcherOptionStyle()}`}
                value={locale}
                key={locale}
              >
                {locale}
              </option>
            );
          })}
        </select>
      </Component>
    );
  },
);

LocaleSwitcher.displayName = "LocaleSwitcher";
