import { DEFAULT_STOP_WORDS } from '../parse/stopWords.js';
import { getReadingEase } from './readingEase.js';
import { readingTime } from './readingTime.js';
import { getSentiment } from './sentiment.js';
import type { SentimentResult } from './sentiment.js';

export type RankedItem = {
  value: string;
  count: number;
};

export type TextAnalysis = {
  wordCount: number;
  charCount: number;
  sentenceCount: number;
  avgWordLength: number;
  avgSentenceLength: number;
  readingTime: number;
  readingEase: number;
  lexicalDiversity: number;
  sentiment: SentimentResult;
  mostCommonWords: RankedItem[];
  topBigrams: RankedItem[];
};

const WORD_REGEX = /[\p{L}\p{M}0-9']+/gu;
const SENTENCE_REGEX = /[.!?]+/g;

const rankMap = (map: Map<string, number>, topN: number): RankedItem[] => {
  return [...map.entries()]
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
    .slice(0, topN)
    .map(([value, count]) => ({ value, count }));
};

/**
 * Computes advanced text metrics for analysis dashboards and QA.
 */
export const analyzeText = (text: string): TextAnalysis => {
  const source = text ?? '';
  const words = source.match(WORD_REGEX) ?? [];
  const normalizedWords = words.map((word) => word.toLowerCase());
  const sentenceCount = Math.max((source.match(SENTENCE_REGEX) ?? []).length, source.trim() ? 1 : 0);

  const totalWordChars = normalizedWords.reduce((sum, word) => sum + word.length, 0);
  const uniqueWordCount = new Set(normalizedWords).size;

  const commonWordCounts = new Map<string, number>();
  const stopWords = new Set<string>(DEFAULT_STOP_WORDS as readonly string[]);

  for (const word of normalizedWords) {
    if (word.length < 3) continue;
    if (stopWords.has(word)) continue;
    commonWordCounts.set(word, (commonWordCounts.get(word) ?? 0) + 1);
  }

  const bigramCounts = new Map<string, number>();
  for (let i = 0; i < normalizedWords.length - 1; i += 1) {
    const first = normalizedWords[i];
    const second = normalizedWords[i + 1];
    if (!first || !second) continue;
    const bigram = `${first} ${second}`;
    bigramCounts.set(bigram, (bigramCounts.get(bigram) ?? 0) + 1);
  }

  const wordCount = normalizedWords.length;
  const avgWordLength = wordCount > 0 ? Number((totalWordChars / wordCount).toFixed(2)) : 0;
  const avgSentenceLength =
    sentenceCount > 0 ? Number((wordCount / sentenceCount).toFixed(2)) : 0;
  const lexicalDiversity = wordCount > 0 ? Number((uniqueWordCount / wordCount).toFixed(4)) : 0;

  return {
    wordCount,
    charCount: source.length,
    sentenceCount,
    avgWordLength,
    avgSentenceLength,
    readingTime: readingTime(source),
    readingEase: Number(getReadingEase(source).toFixed(2)),
    lexicalDiversity,
    sentiment: getSentiment(source),
    mostCommonWords: rankMap(commonWordCounts, 10),
    topBigrams: rankMap(bigramCounts, 10),
  };
};
