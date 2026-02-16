import { getKeywordDensity } from '../parse/keywordDensity.js';
import type { KeywordDensityOptions } from '../parse/keywordDensity.js';

export type SeoKeywordOptions = KeywordDensityOptions & {
  topN?: number;
};

/**
 * Returns the top keyword list for SEO use.
 */
export const extractSeoKeywords = (
  text: string,
  options: SeoKeywordOptions = {},
): string[] => {
  const topN = options.topN ?? 10;
  const density = getKeywordDensity(text ?? '', options);

  return Object.entries(density)
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
    .slice(0, topN)
    .map(([keyword]) => keyword);
};
