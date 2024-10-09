import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

export const shadow: ResolvableTo<KeyValuePair<string, string>> | undefined = {
  "bottom-100": `0px 0px 24px -4px #0000000F`,
  "bottom-200": `0px 4px 20px -8px #0000001C`,
  "bottom-300": `0px 20px 32px -24px #0000000F`,
  "bottom-400": `0px 16px 44px 0px #0000001C`,
  "top-100": `0px -1px 24px -4px #0000000F`,
  "top-200": `0px -4px 20px -8px #0000001C`,
  "top-300": `0px -20px 32px -24px #0000000F`,
  "top-400": `0px -16px 44px -8px #0000001C`,
};
