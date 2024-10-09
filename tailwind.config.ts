import type { Config } from "tailwindcss";
import { radius } from "./src/styles/tokens/radius";
import { shadow } from "./src/styles/tokens/shadow";
import { spacing } from "./src/styles/tokens/spacing";
import {
  fontSize,
  fontWeight,
  letterSpacing,
} from "./src/styles/tokens/typography";
import { colors } from "./src/styles/tokens/colors";
import { maxWidth, screens } from "./src/styles/tokens/sizes";
import { animation, keyframes } from "./src/styles/tokens/animation";

const config: Config = {
  content: ["./src/**/**/**/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: screens,
      maxWidth: maxWidth,
      fontSize: fontSize,
      fontWeight: fontWeight,
      letterSpacing: letterSpacing,
      spacing: spacing,
      padding: spacing,
      borderRadius: radius,
      // boxShadow: shadow,
      gap: spacing,
      colors: colors,
      keyframes: keyframes,
      animation: animation,
    },
  },
  plugins: [
    // require("./src/styles/plugins/theme"),
    // require("./src/styles/plugins/colors"),
  ],
};
export default config;
