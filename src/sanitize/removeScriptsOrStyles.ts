const SCRIPT_REGEX = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
const STYLE_REGEX = /<style\b[^>]*>[\s\S]*?<\/style>/gi;

/**
 * Removes <script> and <style> blocks entirely. Preserves <noscript>.
 */
export const removeScriptsOrStyles = (text: string): string => {
  if (!text) return '';
  return text.replace(SCRIPT_REGEX, '').replace(STYLE_REGEX, '');
};
