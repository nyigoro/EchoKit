import { readingTime } from './analyze/readingTime.js';
import { getReadingEase } from './analyze/readingEase.js';
import { slugify } from './format/slugify.js';
import { smartTruncate } from './format/truncate.js';
import {
  extractHashtags,
  extractMentions,
  getKeywordDensity,
  parseMentionsAndHashtags,
} from './parse/index.js';
import type { KeywordDensityOptions, ParseResult } from './parse/index.js';
import {
  cleanWhitespace,
  normalizeQuotes,
  removeScriptsOrStyles,
  stripInvisibleChars,
  stripHtml,
  stripPromptPatterns,
} from './sanitize/index.js';

export class EchoKyt {
  private constructor(private readonly text: string) {}

  static from(text: string): EchoKyt {
    return new EchoKyt(text ?? '');
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

  stripPromptPatterns(patterns?: RegExp[]): EchoKyt {
    return new EchoKyt(stripPromptPatterns(this.text, patterns));
  }

  truncate(limit: number): EchoKyt {
    return new EchoKyt(smartTruncate(this.text, limit));
  }

  slug(): EchoKyt {
    return new EchoKyt(slugify(this.text));
  }

  mentions() {
    return extractMentions(this.text);
  }

  hashtags() {
    return extractHashtags(this.text);
  }

  parse(): ParseResult {
    return parseMentionsAndHashtags(this.text);
  }

  keywordDensity(options?: KeywordDensityOptions) {
    return getKeywordDensity(this.text, options);
  }

  readingTime(wordsPerMinute?: number): number {
    return readingTime(this.text, wordsPerMinute);
  }

  getReadingEase(): number {
    return getReadingEase(this.text);
  }
}
