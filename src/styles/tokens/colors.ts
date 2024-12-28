import { RecursiveKeyValuePair, ResolvableTo } from "tailwindcss/types/config";

export const colorsConfig:
  | ResolvableTo<RecursiveKeyValuePair<string, string>>
  | undefined = {
  transparent: "transparent",
  current: "currentColor",
  white: "#ffffff",
  black: "rgba(7, 7, 7, 1)",

  // Black Alpha Colors
  "black-alpha": {
    50: "var(--color-black-alpha-50)",
    100: "var(--color-black-alpha-100)",
    200: "var(--color-black-alpha-200)",
    300: "var(--color-black-alpha-300)",
    400: "var(--color-black-alpha-400)",
    500: "var(--color-black-alpha-500)",
    600: "var(--color-black-alpha-600)",
    700: "var(--color-black-alpha-700)",
    800: "var(--color-black-alpha-800)",
    900: "var(--color-black-alpha-900)",
    950: "var(--color-black-alpha-950)",
  },

  // White Alpha Colors
  "white-alpha": {
    50: "var(--color-white-alpha-50)",
    100: "var(--color-white-alpha-100)",
    200: "var(--color-white-alpha-200)",
    300: "var(--color-white-alpha-300)",
    400: "var(--color-white-alpha-400)",
    500: "var(--color-white-alpha-500)",
    600: "var(--color-white-alpha-600)",
    700: "var(--color-white-alpha-700)",
    800: "var(--color-white-alpha-800)",
    900: "var(--color-white-alpha-900)",
    950: "var(--color-white-alpha-950)",
  },

  // Gray Colors
  gray: {
    50: "var(--color-gray-50)",
    100: "var(--color-gray-100)",
    200: "var(--color-gray-200)",
    300: "var(--color-gray-300)",
    400: "var(--color-gray-400)",
    500: "var(--color-gray-500)",
    600: "var(--color-gray-600)",
    700: "var(--color-gray-700)",
    800: "var(--color-gray-800)",
    900: "var(--color-gray-900)",
    950: "var(--color-gray-950)",
  },

  // Raven Colors
  raven: {
    50: "var(--color-raven-50)",
    100: "var(--color-raven-100)",
    200: "var(--color-raven-200)",
    300: "var(--color-raven-300)",
    400: "var(--color-raven-400)",
    500: "var(--color-raven-500)",
    600: "var(--color-raven-600)",
    700: "var(--color-raven-700)",
    800: "var(--color-raven-800)",
    900: "var(--color-raven-900)",
    950: "var(--color-raven-950)",
  },

  // Red Colors
  red: {
    50: "var(--color-red-50)",
    100: "var(--color-red-100)",
    200: "var(--color-red-200)",
    300: "var(--color-red-300)",
    400: "var(--color-red-400)",
    500: "var(--color-red-500)",
    600: "var(--color-red-600)",
    700: "var(--color-red-700)",
    800: "var(--color-red-800)",
    900: "var(--color-red-900)",
    950: "var(--color-red-950)",
  },

  // Ruby Colors
  ruby: {
    50: "var(--color-ruby-50)",
    100: "var(--color-ruby-100)",
    200: "var(--color-ruby-200)",
    300: "var(--color-ruby-300)",
    400: "var(--color-ruby-400)",
    500: "var(--color-ruby-500)",
    600: "var(--color-ruby-600)",
    700: "var(--color-ruby-700)",
    800: "var(--color-ruby-800)",
    900: "var(--color-ruby-900)",
    950: "var(--color-ruby-950)",
  },

  // Yellow Colors
  yellow: {
    50: "var(--color-yellow-50)",
    100: "var(--color-yellow-100)",
    200: "var(--color-yellow-200)",
    300: "var(--color-yellow-300)",
    400: "var(--color-yellow-400)",
    500: "var(--color-yellow-500)",
    600: "var(--color-yellow-600)",
    700: "var(--color-yellow-700)",
    800: "var(--color-yellow-800)",
    900: "var(--color-yellow-900)",
    950: "var(--color-yellow-950)",
  },

  // Green Colors
  leaf: {
    50: "var(--color-leaf-50)",
    100: "var(--color-leaf-100)",
    200: "var(--color-leaf-200)",
    300: "var(--color-leaf-300)",
    400: "var(--color-leaf-400)",
    500: "var(--color-leaf-500)",
    600: "var(--color-leaf-600)",
    700: "var(--color-leaf-700)",
    800: "var(--color-leaf-800)",
    900: "var(--color-leaf-900)",
    950: "var(--color-leaf-950)",
  },

  // Azure Colors
  azure: {
    50: "var(--color-azure-50)",
    100: "var(--color-azure-100)",
    200: "var(--color-azure-200)",
    300: "var(--color-azure-300)",
    400: "var(--color-azure-400)",
    500: "var(--color-azure-500)",
    600: "var(--color-azure-600)",
    700: "var(--color-azure-700)",
    800: "var(--color-azure-800)",
    900: "var(--color-azure-900)",
    950: "var(--color-azure-950)",
  },

  // Sky Colors
  sky: {
    50: "var(--color-sky-50)",
    100: "var(--color-sky-100)",
    200: "var(--color-sky-200)",
    300: "var(--color-sky-300)",
    400: "var(--color-sky-400)",
    500: "var(--color-sky-500)",
    600: "var(--color-sky-600)",
    700: "var(--color-sky-700)",
    800: "var(--color-sky-800)",
    900: "var(--color-sky-900)",
    950: "var(--color-sky-950)",
  },

  // Indigo Colors
  indigo: {
    50: "var(--color-indigo-50)",
    100: "var(--color-indigo-100)",
    200: "var(--color-indigo-200)",
    300: "var(--color-indigo-300)",
    400: "var(--color-indigo-400)",
    500: "var(--color-indigo-500)",
    600: "var(--color-indigo-600)",
    700: "var(--color-indigo-700)",
    800: "var(--color-indigo-800)",
    900: "var(--color-indigo-900)",
    950: "var(--color-indigo-950)",
  },
};

export const colorMain = {
  // Primary
  "primary-darkest": "var(--color-azure-950)",
  "primary-darker": "var(--color-azure-900)",
  "primary-dark": "var(--color-azure-800)",
  primary: "var(--color-azure-500)",
  "primary-light": "var(--color-azure-400)",
  "primary-lighter": "var(--color-azure-200)",
  "primary-lightest": "var(--color-azure-100)",

  // Secondary
  "secondary-darkest": "var(--color-sky-900)",
  "secondary-darker": "var(--color-sky-800)",
  "secondary-dark": "var(--color-sky-700)",
  secondary: "var(--color-sky-500)",
  "secondary-light": "var(--color-sky-300)",
  "secondary-lighter": "var(--color-sky-100)",
  "secondary-lightest": "var(--color-sky-50)",
};

export const colorContrast = {
  // Warning
  "warning-darkest": "var(--color-yellow-900)",
  "warning-darker": "var(--color-yellow-800)",
  "warning-dark": "var(--color-yellow-700)",
  warning: "var(--color-yellow-500)",
  "warning-light": "var(--color-yellow-300)",
  "warning-lighter": "var(--color-yellow-200)",
  "warning-lightest": "var(--color-yellow-100)",

  // Success
  "success-darkest": "var(--color-leaf-900)",
  "success-darker": "var(--color-leaf-800)",
  "success-dark": "var(--color-leaf-700)",
  success: "var(--color-leaf-500)",
  "success-light": "var(--color-leaf-300)",
  "success-lighter": "var(--color-leaf-200)",
  "success-lightest": "var(--color-leaf-100)",

  // Error
  "error-darkest": "var(--color-ruby-900)",
  "error-darker": "var(--color-ruby-800)",
  "error-dark": "var(--color-ruby-700)",
  error: "var(--color-ruby-500)",
  "error-light": "var(--color-ruby-300)",
  "error-lighter": "var(--color-ruby-200)",
  "error-lightest": "var(--color-ruby-100)",

  // Background
  "background-darkest": "var(--color-background-darkest)",
  "background-darker": "var(--color-background-darker)",
  "background-dark": "var(--color-background-dark)",
  "background-base": "var(--color-background-base)",
  "background-light": "var(--color-background-light)",
  "background-lighter": "var(--color-background-lighter)",
  "background-lightest": "var(--color-background-lightest)",

  // Contrast
  "contrast-highest": "var(--color-contrast-highest)",
  "contrast-higher": "var(--color-contrast-higher)",
  "contrast-high": "var(--color-contrast-high)",
  "contrast-medium": "var(--color-contrast-medium)",
  "contrast-low": "var(--color-contrast-low)",
  "contrast-lower": "var(--color-contrast-lower)",
  "contrast-lowest": "var(--color-contrast-lowest)",

  // Invert
  "invert-highest": "var(--color-invert-highest)",
  "invert-higher": "var(--color-invert-higher)",
  "invert-high": "var(--color-invert-high)",
  "invert-medium": "var(--color-invert-medium)",
  "invert-low": "var(--color-invert-low)",
  "invert-lower": "var(--color-invert-lower)",
  "invert-lowest": "var(--color-invert-lowest)",
};

export const colors = {
  ...colorsConfig,
  ...colorMain,
  ...colorContrast,
};
