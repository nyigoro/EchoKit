/**
 * Collapses whitespace and trims the ends.
 */
export const cleanWhitespace = (text: string): string => {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
};
