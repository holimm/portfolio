import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // Disable the TS rule too
      '@typescript-eslint/no-explicit-any': 'off', // Allow usage of 'any' type
      '@next/next/no-img-element': 'off', // Allow usage of <img> elements
      'react-hooks/exhaustive-deps': 'off', // Disable exhaustive-deps rule for React hooks
      '@typescript-eslint/no-empty-object-types': 'off', // Allow empty object types
    },
  },
];

export default eslintConfig;
