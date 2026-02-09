export type HashtagToken = {
  value: string;
  index: number;
  raw: string;
};

const HASHTAG_REGEX = /(^|[^\w])#([\p{L}\p{M}0-9_]{1,64})/gu;

/**
 * Extracts #hashtags from text.
 */
export const extractHashtags = (text: string): HashtagToken[] => {
  if (!text) return [];

  const results: HashtagToken[] = [];
  let match: RegExpExecArray | null;

  HASHTAG_REGEX.lastIndex = 0;
  while ((match = HASHTAG_REGEX.exec(text)) !== null) {
    const prefix = match[1];
    const value = match[2];
    const index = match.index + prefix.length;
    results.push({ value, index, raw: `#${value}` });
  }

  return results;
};
