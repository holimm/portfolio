import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/utils';

const PILL =
  'group border-contrast-lower text-contrast-highest hover:bg-contrast-highest hover:text-invert-highest inline-flex cursor-pointer items-center gap-2 rounded-full border py-1.5 pr-1.5 pl-4 text-sm tracking-wide uppercase transition-colors duration-300 disabled:cursor-wait disabled:opacity-60';

type ArrowPillProps = { className?: string; children: React.ReactNode } & (
  | ({ href: string } & Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      'href' | 'className' | 'children'
    >)
  | ({ href?: undefined } & Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'children'
    >)
);

/** The outlined call-to-action pill with a filled arrow disc, as a link or a button. */
export const ArrowPill = ({
  className,
  children,
  ...props
}: ArrowPillProps) => {
  const content = (
    <>
      {children}
      <span className="bg-contrast-highest text-invert-highest flex size-8 items-center justify-center rounded-full">
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </>
  );

  if (props.href !== undefined) {
    return (
      <a
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={cn(PILL, className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={cn(PILL, className)}
    >
      {content}
    </button>
  );
};
