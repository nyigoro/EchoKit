/**
 * Normalizes smart quotes to straight quotes.
 */
export const normalizeQuotes = (text: string): string => {
  if (!text) return '';
  return text.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
};
