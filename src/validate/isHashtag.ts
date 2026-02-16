const HASHTAG_REGEX = /^#[\p{L}\p{M}0-9_]{1,64}$/u;

/**
 * Validates whether a string is a hashtag token.
 */
export const isHashtag = (value: string): boolean => {
  return HASHTAG_REGEX.test((value ?? '').trim());
};
