const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Validates whether a string is a lowercase hyphenated slug.
 */
export const isSlug = (value: string): boolean => {
  return SLUG_REGEX.test((value ?? '').trim());
};
