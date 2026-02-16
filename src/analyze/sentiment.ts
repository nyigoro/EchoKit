export type SentimentLabel = 'positive' | 'neutral' | 'negative';

export type SentimentResult = {
  score: number;
  label: SentimentLabel;
};

const POSITIVE_WORDS = new Set([
  'good',
  'great',
  'excellent',
  'awesome',
  'love',
  'helpful',
  'clear',
  'fast',
  'easy',
  'happy',
  'amazing',
  'improved',
  'success',
  'clean',
  'strong',
  'win',
]);

const NEGATIVE_WORDS = new Set([
  'bad',
  'poor',
  'terrible',
  'awful',
  'hate',
  'broken',
  'slow',
  'hard',
  'confusing',
  'bug',
  'failure',
  'error',
  'messy',
  'weak',
  'risk',
  'loss',
]);

const WORD_REGEX = /[\p{L}\p{M}0-9']+/gu;

/**
 * Computes lightweight rule-based sentiment.
 */
export const getSentiment = (text: string): SentimentResult => {
  const words = ((text ?? '').toLowerCase().match(WORD_REGEX) ?? []).map((word) =>
    word.replace(/[^a-z0-9']/g, ''),
  );

  if (words.length === 0) {
    return { score: 0, label: 'neutral' };
  }

  let positive = 0;
  let negative = 0;

  for (const word of words) {
    if (POSITIVE_WORDS.has(word)) positive += 1;
    if (NEGATIVE_WORDS.has(word)) negative += 1;
  }

  if (positive === 0 && negative === 0) {
    return { score: 0, label: 'neutral' };
  }

  const score = Number(((positive - negative) / (positive + negative)).toFixed(4));
  if (score > 0.15) return { score, label: 'positive' };
  if (score < -0.15) return { score, label: 'negative' };
  return { score, label: 'neutral' };
};
