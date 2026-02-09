const INVISIBLE_REGEX = /[\u200B-\u200D\u2060\uFEFF\u180E]/g;

/**
 * Removes zero-width and invisible characters.
 */
export const stripInvisibleChars = (text: string): string => {
  if (!text) return '';
  return text.replace(INVISIBLE_REGEX, '');
};
