const TAG_REGEX = /<\/?([A-Za-z][A-Za-z0-9-]*)\b[^>]*>/g;

/**
 * Removes HTML tags, optionally preserving a whitelist of tag names (attributes are always stripped).
 */
export const stripHtml = (text: string, allowedTags: string[] = []): string => {
  if (!text) return '';

  const allowed = new Set(allowedTags.map((tag) => tag.toLowerCase()));

  const withoutDisallowed = text.replace(TAG_REGEX, (match, tag) => {
    return allowed.has(String(tag).toLowerCase()) ? match : '';
  });

  return withoutDisallowed.replace(TAG_REGEX, (match, tag) => {
    const name = String(tag).toLowerCase();
    if (!allowed.has(name)) return '';
    return match.startsWith('</') ? `</${name}>` : `<${name}>`;
  });
};
