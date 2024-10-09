import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

export const spacing: ResolvableTo<KeyValuePair<string, string>> | undefined = {
  "3xs": "0.125rem", // 2px
  "2xs": "0.25rem", // 4px
  xs: "0.5rem", // 8px
  sm: "0.75rem", // 12px
  md: "1rem", // 16px
  lg: "1.25rem", // 20px
  xl: "1.5rem", // 24px
  "2xl": "1.75rem", // 28px
  "3xl": "2rem", // 32px
  "4xl": "2.5rem", // 40px
  "5xl": "3rem", // 48px
  "6xl": "4rem", // 64px
  "7xl": "5rem", // 80px
  "8xl": "6rem", // 96px
  "9xl": "7rem", // 112px
  "10xl": "8rem", // 128px
  "11xl": "9rem", // 144px
  "12xl": "10rem", // 160px
  "13xl": "12rem", // 192px
  "14xl": "14rem", // 224px
  "15xl": "16rem", // 256px
};
