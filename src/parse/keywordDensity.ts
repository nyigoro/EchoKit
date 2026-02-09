import { DEFAULT_STOP_WORDS } from './stopWords.js';

export type KeywordDensityOptions = {
  minLength?: number;
  stopWords?: string[];
  normalize?: boolean;
};

const WORD_REGEX = /[\p{L}\p{M}0-9_']+/gu;

/**
 * Returns keyword frequency (0-1) for filtered tokens in the text.
 */
export const getKeywordDensity = (
  text: string,
  options: KeywordDensityOptions = {},
): Record<string, number> => {
  if (!text || !text.trim()) return {};

  const minLength = options.minLength ?? 3;
  const normalize = options.normalize ?? true;
  const stopWords = options.stopWords ?? [...DEFAULT_STOP_WORDS];
  const stopSet = new Set(
    normalize ? stopWords.map((word) => word.toLowerCase()) : stopWords,
  );

  const tokens = text.match(WORD_REGEX) ?? [];
  const counts: Record<string, number> = {};
  let total = 0;

  for (const raw of tokens) {
    const token = normalize ? raw.toLowerCase() : raw;
    if (token.length < minLength) continue;
    if (stopSet.has(token)) continue;
    counts[token] = (counts[token] ?? 0) + 1;
    total += 1;
  }

  if (total === 0) return {};

  for (const key of Object.keys(counts)) {
    counts[key] = counts[key] / total;
  }

  return counts;
};
