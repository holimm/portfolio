import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

export const fontWeight:
  | ResolvableTo<KeyValuePair<string, string>>
  | undefined = {
  light: "300",
  normal: "400",
  "normal-plus": "450",
  medium: "500",
  semibold: "600",
  bold: "700",
};

export const fontSize:
  | ResolvableTo<
      KeyValuePair<
        string,
        | string
        | [fontSize: string, lineHeight: string]
        | [
            fontSize: string,
            configuration: Partial<{
              lineHeight: string;
              letterSpacing: string;
              fontWeight: string | number;
            }>,
          ]
      >
    >
  | undefined = {
  "2xs": ["0.625rem", { lineHeight: "1rem" }], // 0.625rem = 10px
  xs: ["0.75rem", { lineHeight: "1rem" }], // 0.75rem = 12px
  sm: ["0.875rem", { lineHeight: "1.25rem" }], // 0.875rem = 14px
  md: ["1rem", { lineHeight: "1.5rem" }], // 1rem = 16px
  lg: ["1.125rem", { lineHeight: "1.5rem" }], // 1.125rem = 18px
  xl: ["1.25rem", { lineHeight: "1.75rem" }], // 1.25rem = 20px
  "2xl": ["1.5rem", { lineHeight: "2rem" }], // 1.5rem = 24px
  "3xl": ["2rem", { lineHeight: "2.5rem" }], // 2rem = 32px
  "4xl": ["2.75rem", { lineHeight: "3rem" }], // 2.75rem = 44px
  "5xl": ["3.5rem", { lineHeight: "4rem" }], // 3.5rem = 56px
  "6xl": ["4.5rem", { lineHeight: "5rem" }], // 4.5rem = 72px
  // Not in Design Tokens
  "7xl": ["6rem", { lineHeight: "1" }], // 6rem = 96px
  "8xl": ["8rem", { lineHeight: "1" }], // 8rem = 128px
  "9xl": ["9rem", { lineHeight: "1" }], // 9rem = 144px
  "10xl": ["10rem", { lineHeight: "1" }], // 10rem = 160px
};

export const letterSpacing:
  | ResolvableTo<KeyValuePair<string, string>>
  | undefined = {
  caption: "0",
  body: "-2%",
  heading: "-3%",
  display: "-4%",
};
