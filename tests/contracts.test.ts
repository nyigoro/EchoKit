import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as rootExports from '../src/index';
import * as formatExports from '../src/format/index';
import * as analyzeExports from '../src/analyze/index';
import * as parseExports from '../src/parse/index';
import * as sanitizeExports from '../src/sanitize/index';
import * as validateExports from '../src/validate/index';
import * as seoExports from '../src/seo/index';
import * as templateExports from '../src/templates/index';
import { EchoKyt } from '../src/echokyt';

describe('public API contract', () => {
  it('keeps root exports stable for key symbols', () => {
    expect(typeof rootExports.slugify).toBe('function');
    expect(typeof rootExports.smartTruncate).toBe('function');
    expect(typeof rootExports.readingTime).toBe('function');
    expect(typeof rootExports.getReadingEase).toBe('function');
    expect(typeof rootExports.analyzeText).toBe('function');
    expect(typeof rootExports.getSentiment).toBe('function');
    expect(typeof rootExports.diffText).toBe('function');
    expect(typeof rootExports.similarityScore).toBe('function');
    expect(typeof rootExports.toCamelCase).toBe('function');
    expect(typeof rootExports.toSnakeCase).toBe('function');
    expect(typeof rootExports.toKebabCase).toBe('function');
    expect(typeof rootExports.toTitleCase).toBe('function');
    expect(typeof rootExports.pluralize).toBe('function');
    expect(typeof rootExports.singularize).toBe('function');
    expect(typeof rootExports.extractMentions).toBe('function');
    expect(typeof rootExports.extractHashtags).toBe('function');
    expect(typeof rootExports.extractEmails).toBe('function');
    expect(typeof rootExports.extractUrls).toBe('function');
    expect(typeof rootExports.getKeywordDensity).toBe('function');
    expect(typeof rootExports.cleanWhitespace).toBe('function');
    expect(typeof rootExports.stripHtml).toBe('function');
    expect(typeof rootExports.removeScriptsOrStyles).toBe('function');
    expect(typeof rootExports.normalizeQuotes).toBe('function');
    expect(typeof rootExports.detectPII).toBe('function');
    expect(typeof rootExports.redactPII).toBe('function');
    expect(typeof rootExports.isEmail).toBe('function');
    expect(typeof rootExports.isUrl).toBe('function');
    expect(typeof rootExports.isSlug).toBe('function');
    expect(typeof rootExports.extractSeoKeywords).toBe('function');
    expect(typeof rootExports.createSeoTitle).toBe('function');
    expect(typeof rootExports.createMetaDescription).toBe('function');
    expect(typeof rootExports.fillTemplate).toBe('function');
    expect(typeof rootExports.renderTemplate).toBe('function');
    expect(typeof rootExports.listTemplates).toBe('function');
    expect(rootExports.EchoKyt).toBe(EchoKyt);
  });

  it('keeps subpath barrel exports stable', () => {
    expect(typeof formatExports.slugify).toBe('function');
    expect(typeof formatExports.smartTruncate).toBe('function');
    expect(typeof formatExports.toCamelCase).toBe('function');
    expect(typeof formatExports.toSnakeCase).toBe('function');
    expect(typeof formatExports.toKebabCase).toBe('function');
    expect(typeof formatExports.toTitleCase).toBe('function');
    expect(typeof formatExports.pluralize).toBe('function');
    expect(typeof formatExports.singularize).toBe('function');
    expect(typeof analyzeExports.readingTime).toBe('function');
    expect(typeof analyzeExports.getReadingEase).toBe('function');
    expect(typeof analyzeExports.analyzeText).toBe('function');
    expect(typeof analyzeExports.getSentiment).toBe('function');
    expect(typeof analyzeExports.diffText).toBe('function');
    expect(typeof analyzeExports.similarityScore).toBe('function');
    expect(typeof parseExports.extractMentions).toBe('function');
    expect(typeof parseExports.extractHashtags).toBe('function');
    expect(typeof parseExports.extractEmails).toBe('function');
    expect(typeof parseExports.extractUrls).toBe('function');
    expect(typeof parseExports.getKeywordDensity).toBe('function');
    expect(typeof sanitizeExports.cleanWhitespace).toBe('function');
    expect(typeof sanitizeExports.stripHtml).toBe('function');
    expect(typeof sanitizeExports.removeScriptsOrStyles).toBe('function');
    expect(typeof sanitizeExports.normalizeQuotes).toBe('function');
    expect(typeof sanitizeExports.detectPII).toBe('function');
    expect(typeof sanitizeExports.redactPII).toBe('function');
    expect(typeof validateExports.isEmail).toBe('function');
    expect(typeof validateExports.isUrl).toBe('function');
    expect(typeof validateExports.isSlug).toBe('function');
    expect(typeof seoExports.createSeoTitle).toBe('function');
    expect(typeof seoExports.createMetaDescription).toBe('function');
    expect(typeof seoExports.extractSeoKeywords).toBe('function');
    expect(typeof templateExports.fillTemplate).toBe('function');
    expect(typeof templateExports.renderTemplate).toBe('function');
    expect(typeof templateExports.listTemplates).toBe('function');
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
        './validate',
        './validate/*',
        './seo',
        './seo/*',
        './templates',
        './templates/*',
        './browser',
      ]),
    );
  });
});
