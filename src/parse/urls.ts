export type UrlToken = {
  value: string;
  index: number;
  raw: string;
};

const URL_REGEX = /(?:https?:\/\/|www\.)[^\s<>"'`]+/gi;
const TRAILING_PUNCTUATION_REGEX = /[),.!?;:]+$/;

/**
 * Extracts URLs from text.
 */
export const extractUrls = (text: string): UrlToken[] => {
  if (!text) return [];

  const results: UrlToken[] = [];
  let match: RegExpExecArray | null;

  URL_REGEX.lastIndex = 0;
  while ((match = URL_REGEX.exec(text)) !== null) {
    const raw = match[0];
    const value = raw.replace(TRAILING_PUNCTUATION_REGEX, '');
    if (!value) continue;
    results.push({ value, index: match.index, raw });
  }

  return results;
};
