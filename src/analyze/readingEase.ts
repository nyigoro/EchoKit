const WORD_REGEX = /[A-Za-z]+(?:'[A-Za-z]+)*/g;
const SENTENCE_REGEX = /[.!?]+/g;

const countSyllables = (raw: string): number => {
  const word = raw.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;

  const groups = word.match(/[aeiouy]+/g);
  let syllables = groups ? groups.length : 0;

  if (word.endsWith('e') && !word.endsWith('le') && !word.endsWith('ye')) {
    syllables -= 1;
  }

  return syllables > 0 ? syllables : 1;
};

/**
 * Computes the Flesch Reading Ease score (approximate, English heuristic).
 */
export const getReadingEase = (text: string): number => {
  if (!text || !text.trim()) return 0;

  const sanitized = text.replace(/<[^>]*>/g, ' ');
  const words = sanitized.match(WORD_REGEX) ?? [];
  if (words.length === 0) return 0;

  const sentences = (sanitized.match(SENTENCE_REGEX) ?? []).length || 1;
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);

  const wordsPerSentence = words.length / sentences;
  const syllablesPerWord = syllables / words.length;

  return 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
};
