const WORD_BREAK_BETWEEN_LOWER_AND_UPPER = /([a-z0-9])([A-Z])/g;
const WORD_BREAK_BETWEEN_ACRONYM_AND_WORD = /([A-Z])([A-Z][a-z])/g;
const WORD_SEPARATORS = /[_\-\s]+/g;
const WORD_REGEX = /[\p{L}\p{M}0-9]+/gu;

const splitWords = (value: string): string[] => {
  const normalized = (value ?? '')
    .replace(WORD_BREAK_BETWEEN_ACRONYM_AND_WORD, '$1 $2')
    .replace(WORD_BREAK_BETWEEN_LOWER_AND_UPPER, '$1 $2')
    .replace(WORD_SEPARATORS, ' ')
    .trim();

  return normalized.match(WORD_REGEX) ?? [];
};

const capitalize = (word: string): string => {
  if (!word) return '';
  const [first, ...rest] = Array.from(word);
  return `${first.toUpperCase()}${rest.join('').toLowerCase()}`;
};

/**
 * Converts text to camelCase.
 */
export const toCamelCase = (value: string): string => {
  const words = splitWords(value);
  if (words.length === 0) return '';

  const [first, ...rest] = words;
  return `${first.toLowerCase()}${rest.map((word) => capitalize(word)).join('')}`;
};

/**
 * Converts text to snake_case.
 */
export const toSnakeCase = (value: string): string => {
  return splitWords(value)
    .map((word) => word.toLowerCase())
    .join('_');
};

/**
 * Converts text to kebab-case.
 */
export const toKebabCase = (value: string): string => {
  return splitWords(value)
    .map((word) => word.toLowerCase())
    .join('-');
};

/**
 * Converts text to Title Case.
 */
export const toTitleCase = (value: string): string => {
  return splitWords(value)
    .map((word) => capitalize(word))
    .join(' ');
};
