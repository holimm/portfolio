import { ThemeTypes } from "@/types/styles/theme";
import { ReactNode } from "react";

export interface UserHomepageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode; // Content of the Typography component
  theme?: ThemeTypes;
}
