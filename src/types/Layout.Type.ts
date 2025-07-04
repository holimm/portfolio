import { ReactNode } from 'react';
import { ThemeTypes } from './Theme.Type';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | undefined;

export type ResponsiveSpan = { breakpoint?: Breakpoint; span: string | number };

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  theme?: ThemeTypes;
}
