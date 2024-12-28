const generateSpacing = (prefix: string) => ({
  none: { root: `${prefix}-0` },
  '3xs': { root: `${prefix}-3xs` },
  '2xs': { root: `${prefix}-2xs` },
  xs: { root: `${prefix}-xs` },
  sm: { root: `${prefix}-sm` },
  md: { root: `${prefix}-md` },
  lg: { root: `${prefix}-lg` },
  xl: { root: `${prefix}-xl` },
  '2xl': { root: `${prefix}-2xl` },
  '3xl': { root: `${prefix}-3xl` },
  '4xl': { root: `${prefix}-4xl` },
  '5xl': { root: `${prefix}-5xl` },
  '6xl': { root: `${prefix}-6xl` },
  '7xl': { root: `${prefix}-7xl` },
  '8xl': { root: `${prefix}-8xl` },
  '9xl': { root: `${prefix}-9xl` },
  '10xl': { root: `${prefix}-10xl` },
  '11xl': { root: `${prefix}-11xl` },
  '12xl': { root: `${prefix}-12xl` },
  '13xl': { root: `${prefix}-13xl` },
  '14xl': { root: `${prefix}-14xl` },
  '15xl': { root: `${prefix}-15xl` },
});

export const horizontalSpacing = generateSpacing('px');
export const verticalSpacing = generateSpacing('py');
export const paddingSpacing = generateSpacing('p');
export const gapSpacing = generateSpacing('gap');
