import { smartTruncate } from '../format/truncate.js';
import { cleanWhitespace } from '../sanitize/cleanWhitespace.js';
import { normalizeQuotes } from '../sanitize/normalizeQuotes.js';

export type SeoTitleOptions = {
  brand?: string;
  maxLength?: number;
};

/**
 * Builds a cleaned SEO title and optionally appends a brand suffix.
 */
export const createSeoTitle = (
  title: string,
  options: SeoTitleOptions = {},
): string => {
  const maxLength = options.maxLength ?? 60;
  const base = cleanWhitespace(normalizeQuotes(title ?? ''));
  if (!options.brand) {
    return base.length <= maxLength ? base : smartTruncate(base, maxLength);
  }

  const brand = cleanWhitespace(normalizeQuotes(options.brand));
  const suffix = ` | ${brand}`;
  if (suffix.length >= maxLength) {
    return smartTruncate(brand, maxLength);
  }

  const available = maxLength - suffix.length;
  const trimmedBase = base.length <= available ? base : smartTruncate(base, available);
  return `${trimmedBase}${suffix}`;
};
