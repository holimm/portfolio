import Filter from 'leo-profanity';
import { ALLOWED_WORDS } from '@/config';

export const isProfane = (text: string): boolean => {
  if (!text || typeof text !== 'string') return false;
  const normalized = text.trim().replace(/\s+/g, ' ').toLowerCase();
  const words = normalized.split(' ');

  for (const word of words) {
    const lettersOnly = word.replace(/[^a-z]/g, '');
    if (
      !ALLOWED_WORDS.includes(lettersOnly) &&
      (Filter.check(word) || Filter.check(lettersOnly))
    ) {
      return true;
    }
  }

  for (const word of words) {
    const lettersOnly = word.replace(/[^a-z]/g, '');
    if (ALLOWED_WORDS.includes(lettersOnly)) continue;
    const substrings = Array.from({ length: lettersOnly.length }, (_, i) =>
      Array.from(
        { length: Math.min(10, lettersOnly.length - i) - 2 },
        (_, len) => lettersOnly.slice(i, i + len + 3)
      )
    ).flat();
    if (substrings.some((substr) => Filter.check(substr))) {
      return true;
    }
  }

  return false;
};
