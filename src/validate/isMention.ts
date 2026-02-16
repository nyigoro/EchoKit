const MENTION_REGEX = /^@[\p{L}\p{M}0-9_]{1,32}$/u;

/**
 * Validates whether a string is a mention token.
 */
export const isMention = (value: string): boolean => {
  return MENTION_REGEX.test((value ?? '').trim());
};
