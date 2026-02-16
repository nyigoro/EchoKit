import {
  createMetaDescription,
  createSeoTitle,
  extractSeoKeywords,
} from '../src/index';

describe('seo utilities', () => {
  it('creates cleaned meta descriptions', () => {
    const description = createMetaDescription(
      '<p>Hello <strong>world</strong> <script>alert(1)</script>from EchoKyt.</p>',
      60,
    );
    expect(description).toContain('Hello world from EchoKyt.');
    expect(description).not.toContain('<script>');
  });

  it('creates seo title with brand and max length', () => {
    const title = createSeoTitle('A practical guide to text parsing', {
      brand: 'EchoKyt',
      maxLength: 40,
    });
    expect(title.endsWith('| EchoKyt')).toBe(true);
    expect(title.length).toBeLessThanOrEqual(40);
  });

  it('extracts top seo keywords', () => {
    const keywords = extractSeoKeywords(
      'EchoKyt ships fast text parsing and text sanitization utilities',
      { topN: 3, stopWords: [], minLength: 4 },
    );
    expect(keywords.length).toBe(3);
    expect(keywords[0]).toBe('text');
  });
});
