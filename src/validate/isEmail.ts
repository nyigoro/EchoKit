const EMAIL_VALIDATION_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;

/**
 * Validates whether a string is an email address.
 */
export const isEmail = (value: string): boolean => {
  return EMAIL_VALIDATION_REGEX.test((value ?? '').trim());
};
