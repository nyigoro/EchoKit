export type MentionToken = {
  value: string;
  index: number;
  raw: string;
};

const MENTION_REGEX = /(^|[^\w])@([\p{L}\p{M}0-9_]{1,32})/gu;

/**
 * Extracts @mentions from text.
 */
export const extractMentions = (text: string): MentionToken[] => {
  if (!text) return [];

  const results: MentionToken[] = [];
  let match: RegExpExecArray | null;

  MENTION_REGEX.lastIndex = 0;
  while ((match = MENTION_REGEX.exec(text)) !== null) {
    const prefix = match[1];
    const value = match[2];
    const index = match.index + prefix.length;
    results.push({ value, index, raw: `@${value}` });
  }

  return results;
};
