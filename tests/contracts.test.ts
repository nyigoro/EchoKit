import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as rootExports from '../src/index';
import * as formatExports from '../src/format/index';
import * as analyzeExports from '../src/analyze/index';
import * as parseExports from '../src/parse/index';
import * as sanitizeExports from '../src/sanitize/index';
import { EchoKyt } from '../src/echokyt';

describe('public API contract', () => {
  it('keeps root exports stable for key symbols', () => {
    expect(typeof rootExports.slugify).toBe('function');
    expect(typeof rootExports.smartTruncate).toBe('function');
    expect(typeof rootExports.readingTime).toBe('function');
    expect(typeof rootExports.getReadingEase).toBe('function');
    expect(typeof rootExports.extractMentions).toBe('function');
    expect(typeof rootExports.extractHashtags).toBe('function');
    expect(typeof rootExports.getKeywordDensity).toBe('function');
    expect(typeof rootExports.cleanWhitespace).toBe('function');
    expect(typeof rootExports.stripHtml).toBe('function');
    expect(typeof rootExports.removeScriptsOrStyles).toBe('function');
    expect(typeof rootExports.normalizeQuotes).toBe('function');
    expect(rootExports.EchoKyt).toBe(EchoKyt);
  });

  it('keeps subpath barrel exports stable', () => {
    expect(typeof formatExports.slugify).toBe('function');
    expect(typeof formatExports.smartTruncate).toBe('function');
    expect(typeof analyzeExports.readingTime).toBe('function');
    expect(typeof analyzeExports.getReadingEase).toBe('function');
    expect(typeof parseExports.extractMentions).toBe('function');
    expect(typeof parseExports.extractHashtags).toBe('function');
    expect(typeof parseExports.getKeywordDensity).toBe('function');
    expect(typeof sanitizeExports.cleanWhitespace).toBe('function');
    expect(typeof sanitizeExports.stripHtml).toBe('function');
    expect(typeof sanitizeExports.removeScriptsOrStyles).toBe('function');
    expect(typeof sanitizeExports.normalizeQuotes).toBe('function');
  });

  it('declares root and subpath exports in package metadata', () => {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf8'),
    ) as { exports?: Record<string, unknown> };
    const exportedPaths = Object.keys(packageJson.exports ?? {});
    expect(exportedPaths).toEqual(
      expect.arrayContaining([
        '.',
        './echokyt',
        './format',
        './format/*',
        './analyze',
        './analyze/*',
        './parse',
        './parse/*',
        './sanitize',
        './sanitize/*',
      ]),
    );
  });
});
