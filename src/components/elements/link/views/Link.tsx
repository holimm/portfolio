"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";

import { useLink, type UseLinkProps } from "../utils/useLink";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Locale } from "../../../../../i18n.config";

export interface LinkData {}

export interface LinkOptions extends UseLinkProps {}

export interface LinkProps
  extends LinkOptions,
    Omit<HTMLAttributes<HTMLAnchorElement>, keyof UseLinkProps>,
    LinkData {
  href: string;
  locale: Locale;
}

export const LinkRoot = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, locale, href, ...props }, ref) => {
    const { ...context } = useLink({ ref, href, ...props });

    const ctx = useMemo(() => context, [context]);

    const path = useMemo(() => {
      return ctx.handleHref(locale, ctx.href ? ctx.href : "/");
    }, [locale, ctx]);

    return (
      <Link
        href={path}
        ref={ctx.linkRef}
        data-comp="link"
        className={`${className} ${ctx.linkStyle()}`}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

LinkRoot.displayName = "LinkRoot";
