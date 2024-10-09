import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

export const radius: ResolvableTo<KeyValuePair<string, string>> | undefined = {
  none: "0",
  "3xs": "0.125rem", // 2px
  "2xs": "0.25rem", // 4px
  xs: "0.5rem", // 8px
  sm: "0.75rem", // 12px
  base: "1rem", // 16px
  md: "1.25rem", // 20px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "2.5rem", // 40px
  "3xl": "3rem", // 48px
  "4xl": "4rem", // 64px
  "5xl": "5rem", // 80px
  "6xl": "6rem", // 96px
  full: "9999px",
};
