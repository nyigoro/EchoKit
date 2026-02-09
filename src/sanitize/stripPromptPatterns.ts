export const DEFAULT_PROMPT_PATTERNS: RegExp[] = [
  /<<\s*SYS\s*>>/gi,
  /<<\s*\/\s*SYS\s*>>/gi,
  /<<\s*USER\s*>>/gi,
  /<<\s*\/\s*USER\s*>>/gi,
  /<<\s*ASSISTANT\s*>>/gi,
  /<<\s*\/\s*ASSISTANT\s*>>/gi,
  /#{3,}/g,
];

/**
 * Removes common prompt marker patterns.
 */
export const stripPromptPatterns = (
  text: string,
  patterns: RegExp[] = DEFAULT_PROMPT_PATTERNS,
): string => {
  if (!text) return '';

  return patterns.reduce((acc, pattern) => acc.replace(pattern, ''), text);
};
