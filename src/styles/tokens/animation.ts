import { KeyValuePair, ResolvableTo } from "tailwindcss/types/config";

export const keyframes:
  | ResolvableTo<
      KeyValuePair<string, KeyValuePair<string, KeyValuePair<string, string>>>
    >
  | undefined = {
  sequence: {
    "0%": { transform: "rotate(0deg)" },
    "50%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(90deg)" },
  },
};

export const animation: ResolvableTo<KeyValuePair<string, string>> | undefined =
  {
    "spin-sequence": "sequence 1s linear infinite",
  };
