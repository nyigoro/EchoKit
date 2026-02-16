export type EmailToken = {
  value: string;
  index: number;
  raw: string;
};

const EMAIL_REGEX = /(^|[^A-Za-z0-9._%+-])([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63})(?![A-Za-z0-9._%+-])/g;

/**
 * Extracts email addresses from text.
 */
export const extractEmails = (text: string): EmailToken[] => {
  if (!text) return [];

  const results: EmailToken[] = [];
  let match: RegExpExecArray | null;

  EMAIL_REGEX.lastIndex = 0;
  while ((match = EMAIL_REGEX.exec(text)) !== null) {
    const prefix = match[1];
    const value = match[2];
    const index = match.index + prefix.length;
    results.push({ value, index, raw: value });
  }

  return results;
};
