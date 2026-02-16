export type UrlValidationOptions = {
  allowNoProtocol?: boolean;
};

const PROTOCOL_REGEX = /^[a-z][a-z0-9+.-]*:\/\//i;

/**
 * Validates whether a string is an HTTP(S) URL.
 */
export const isUrl = (value: string, options: UrlValidationOptions = {}): boolean => {
  const raw = (value ?? '').trim();
  if (!raw) return false;

  const allowNoProtocol = options.allowNoProtocol ?? false;
  const candidate =
    allowNoProtocol && !PROTOCOL_REGEX.test(raw) ? `https://${raw}` : raw;

  try {
    const parsed = new URL(candidate);
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    if (!parsed.hostname || /\s/.test(parsed.hostname)) return false;
    return true;
  } catch {
    return false;
  }
};
