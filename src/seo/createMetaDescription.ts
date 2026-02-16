import { smartTruncate } from '../format/truncate.js';
import { cleanWhitespace } from '../sanitize/cleanWhitespace.js';
import { removeScriptsOrStyles } from '../sanitize/removeScriptsOrStyles.js';
import { stripHtml } from '../sanitize/stripHtml.js';

/**
 * Generates a cleaned meta description and keeps it near the given max length.
 */
export const createMetaDescription = (
  text: string,
  maxLength: number = 160,
): string => {
  const normalized = cleanWhitespace(stripHtml(removeScriptsOrStyles(text ?? '')));
  if (normalized.length <= maxLength) return normalized;
  return smartTruncate(normalized, maxLength);
};
