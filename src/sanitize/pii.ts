import { extractEmails } from '../parse/emails.js';

export type PiiType = 'email' | 'phone' | 'ssn';

export type PiiMatch = {
  type: PiiType;
  value: string;
  index: number;
};

export type PiiDetectionOptions = {
  detectEmails?: boolean;
  detectPhones?: boolean;
  detectSSN?: boolean;
};

export type PiiRedactionOptions = PiiDetectionOptions & {
  replacement?: string;
};

const PHONE_REGEX =
  /(^|[^\d])((?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4})(?!\d)/g;
const SSN_REGEX = /(^|[^\d])(\d{3}-?\d{2}-?\d{4})(?!\d)/g;

const dedupeMatches = (matches: PiiMatch[]): PiiMatch[] => {
  const seen = new Set<string>();
  return matches
    .sort((a, b) => a.index - b.index)
    .filter((match) => {
      const key = `${match.type}:${match.index}:${match.value}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const findRegexMatches = (
  text: string,
  type: PiiType,
  regex: RegExp,
): PiiMatch[] => {
  const matches: PiiMatch[] = [];
  let match: RegExpExecArray | null;

  regex.lastIndex = 0;
  while ((match = regex.exec(text)) !== null) {
    const prefix = match[1] ?? '';
    const value = match[2];
    const index = match.index + prefix.length;
    matches.push({ type, value, index });
  }

  return matches;
};

/**
 * Detects common PII entities in text.
 */
export const detectPII = (
  text: string,
  options: PiiDetectionOptions = {},
): PiiMatch[] => {
  const source = text ?? '';
  if (!source) return [];

  const detectEmails = options.detectEmails ?? true;
  const detectPhones = options.detectPhones ?? true;
  const detectSSN = options.detectSSN ?? true;

  const matches: PiiMatch[] = [];

  if (detectEmails) {
    matches.push(
      ...extractEmails(source).map((item) => ({
        type: 'email' as const,
        value: item.value,
        index: item.index,
      })),
    );
  }
  if (detectPhones) {
    matches.push(...findRegexMatches(source, 'phone', PHONE_REGEX));
  }
  if (detectSSN) {
    matches.push(...findRegexMatches(source, 'ssn', SSN_REGEX));
  }

  return dedupeMatches(matches);
};

/**
 * Redacts detected PII entities with a replacement token.
 */
export const redactPII = (
  text: string,
  options: PiiRedactionOptions = {},
): string => {
  const source = text ?? '';
  if (!source) return '';

  const replacement = options.replacement ?? '[REDACTED]';
  const matches = detectPII(source, options).sort((a, b) => b.index - a.index);

  let redacted = source;
  for (const match of matches) {
    redacted =
      redacted.slice(0, match.index) +
      replacement +
      redacted.slice(match.index + match.value.length);
  }

  return redacted;
};
