const IRREGULAR_SINGULAR_TO_PLURAL: Record<string, string> = {
  child: 'children',
  person: 'people',
  man: 'men',
  woman: 'women',
  mouse: 'mice',
  goose: 'geese',
  tooth: 'teeth',
  foot: 'feet',
};

const IRREGULAR_PLURAL_TO_SINGULAR = Object.fromEntries(
  Object.entries(IRREGULAR_SINGULAR_TO_PLURAL).map(([singular, plural]) => [plural, singular]),
);

const UNCOUNTABLE = new Set([
  'news',
  'series',
  'species',
  'information',
  'equipment',
]);

/**
 * Pluralizes a single English noun using lightweight rules.
 */
export const pluralize = (value: string): string => {
  const word = (value ?? '').trim();
  if (!word) return '';

  const lower = word.toLowerCase();
  if (UNCOUNTABLE.has(lower)) return word;
  if (lower in IRREGULAR_SINGULAR_TO_PLURAL) {
    return IRREGULAR_SINGULAR_TO_PLURAL[lower];
  }
  if (/[sxz]$/i.test(word) || /(ch|sh)$/i.test(word)) {
    return `${word}es`;
  }
  if (/[^aeiou]y$/i.test(word)) {
    return `${word.slice(0, -1)}ies`;
  }
  if (/(?:fe|f)$/i.test(word)) {
    return word.endsWith('fe') ? `${word.slice(0, -2)}ves` : `${word.slice(0, -1)}ves`;
  }
  return `${word}s`;
};

/**
 * Singularizes a single English noun using lightweight rules.
 */
export const singularize = (value: string): string => {
  const word = (value ?? '').trim();
  if (!word) return '';

  const lower = word.toLowerCase();
  if (UNCOUNTABLE.has(lower)) return word;
  if (lower in IRREGULAR_PLURAL_TO_SINGULAR) {
    return IRREGULAR_PLURAL_TO_SINGULAR[lower];
  }
  if (/(ch|sh|[sxz])es$/i.test(word)) {
    return word.slice(0, -2);
  }
  if (/ies$/i.test(word) && word.length > 3) {
    return `${word.slice(0, -3)}y`;
  }
  if (/ves$/i.test(word) && word.length > 3) {
    return `${word.slice(0, -3)}f`;
  }
  if (/s$/i.test(word) && word.length > 1) {
    return word.slice(0, -1);
  }
  return word;
};
