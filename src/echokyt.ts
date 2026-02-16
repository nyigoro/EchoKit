import { readingTime } from './analyze/readingTime.js';
import { getReadingEase } from './analyze/readingEase.js';
import { analyzeText } from './analyze/textAnalysis.js';
import { diffText } from './analyze/diff.js';
import { getSentiment } from './analyze/sentiment.js';
import { similarityScore } from './analyze/similarity.js';
import { slugify } from './format/slugify.js';
import { smartTruncate } from './format/truncate.js';
import { pluralize, singularize } from './format/inflect.js';
import { toCamelCase, toKebabCase, toSnakeCase, toTitleCase } from './format/case.js';
import {
  extractHashtags,
  extractEmails,
  extractMentions,
  extractUrls,
  parseTextEntities,
  getKeywordDensity,
} from './parse/index.js';
import type { KeywordDensityOptions, ParseResult } from './parse/index.js';
import { createMetaDescription, createSeoTitle, extractSeoKeywords } from './seo/index.js';
import type { SeoKeywordOptions, SeoTitleOptions } from './seo/index.js';
import {
  cleanWhitespace,
  detectPII,
  normalizeQuotes,
  redactPII,
  removeScriptsOrStyles,
  stripInvisibleChars,
  stripHtml,
  stripPromptPatterns,
} from './sanitize/index.js';
import { isEmail, isSlug, isUrl } from './validate/index.js';
import type { UrlValidationOptions } from './validate/index.js';
import type { DiffResult } from './analyze/diff.js';
import type { SentimentResult } from './analyze/sentiment.js';
import type { TextAnalysis } from './analyze/textAnalysis.js';
import type { PiiDetectionOptions, PiiMatch, PiiRedactionOptions } from './sanitize/index.js';

export class EchoKyt {
  private constructor(private readonly text: string) {}

  static from(text: string): EchoKyt {
    return new EchoKyt(text ?? '');
  }

  static diff(oldText: string, newText: string): DiffResult {
    return diffText(oldText, newText);
  }

  static similarityScore(left: string, right: string): number {
    return similarityScore(left, right);
  }

  value(): string {
    return this.text;
  }

  toString(): string {
    return this.text;
  }

  cleanWhitespace(): EchoKyt {
    return new EchoKyt(cleanWhitespace(this.text));
  }

  stripInvisible(): EchoKyt {
    return new EchoKyt(stripInvisibleChars(this.text));
  }

  removeScriptsOrStyles(): EchoKyt {
    return new EchoKyt(removeScriptsOrStyles(this.text));
  }

  stripHtml(allowedTags?: string[]): EchoKyt {
    return new EchoKyt(stripHtml(this.text, allowedTags));
  }

  normalizeQuotes(): EchoKyt {
    return new EchoKyt(normalizeQuotes(this.text));
  }

  redactPII(options?: PiiRedactionOptions): EchoKyt {
    return new EchoKyt(redactPII(this.text, options));
  }

  stripPromptPatterns(patterns?: RegExp[]): EchoKyt {
    return new EchoKyt(stripPromptPatterns(this.text, patterns));
  }

  truncate(limit: number): EchoKyt {
    return new EchoKyt(smartTruncate(this.text, limit));
  }

  slug(): EchoKyt {
    return new EchoKyt(slugify(this.text));
  }

  toCamelCase(): EchoKyt {
    return new EchoKyt(toCamelCase(this.text));
  }

  toSnakeCase(): EchoKyt {
    return new EchoKyt(toSnakeCase(this.text));
  }

  toKebabCase(): EchoKyt {
    return new EchoKyt(toKebabCase(this.text));
  }

  toTitleCase(): EchoKyt {
    return new EchoKyt(toTitleCase(this.text));
  }

  pluralize(): EchoKyt {
    return new EchoKyt(pluralize(this.text));
  }

  singularize(): EchoKyt {
    return new EchoKyt(singularize(this.text));
  }

  mentions() {
    return extractMentions(this.text);
  }

  hashtags() {
    return extractHashtags(this.text);
  }

  emails() {
    return extractEmails(this.text);
  }

  urls() {
    return extractUrls(this.text);
  }

  parse(): ParseResult {
    return parseTextEntities(this.text);
  }

  detectPII(options?: PiiDetectionOptions): PiiMatch[] {
    return detectPII(this.text, options);
  }

  keywordDensity(options?: KeywordDensityOptions) {
    return getKeywordDensity(this.text, options);
  }

  seoKeywords(options?: SeoKeywordOptions): string[] {
    return extractSeoKeywords(this.text, options);
  }

  metaDescription(maxLength?: number): string {
    return createMetaDescription(this.text, maxLength);
  }

  seoTitle(options?: SeoTitleOptions): string {
    return createSeoTitle(this.text, options);
  }

  readingTime(wordsPerMinute?: number): number {
    return readingTime(this.text, wordsPerMinute);
  }

  getReadingEase(): number {
    return getReadingEase(this.text);
  }

  getSentiment(): SentimentResult {
    return getSentiment(this.text);
  }

  analyzeText(): TextAnalysis {
    return analyzeText(this.text);
  }

  similarityScore(otherText: string): number {
    return similarityScore(this.text, otherText);
  }

  diff(otherText: string): DiffResult {
    return diffText(this.text, otherText);
  }

  validateEmail(): boolean {
    return isEmail(this.text);
  }

  validateUrl(options?: UrlValidationOptions): boolean {
    return isUrl(this.text, options);
  }

  validateSlug(): boolean {
    return isSlug(this.text);
  }
}
