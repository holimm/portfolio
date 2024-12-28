import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

export const screens: ResolvableTo<KeyValuePair<string, string>> | undefined = {
  xs: '0px',
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
};

export const maxWidth: ResolvableTo<KeyValuePair<string, string>> | undefined =
  {
    xs: '0px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
  };
