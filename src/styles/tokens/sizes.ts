import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

export const screens: ResolvableTo<KeyValuePair<string, string>> | undefined = {
  xs: "0rem",
  sm: "30rem",
  md: "48rem",
  lg: "62rem",
  xl: "80rem",
  "2xl": "96rem",
  "3xl": "120rem",
};

export const maxWidth: ResolvableTo<KeyValuePair<string, string>> | undefined =
  {
    xs: "0rem",
    sm: "30rem",
    md: "48rem",
    lg: "62rem",
    xl: "80rem",
    "2xl": "96rem",
    "3xl": "120rem",
  };
