import { EchoKyt } from '../src/index';

describe('EchoKyt fluent API', () => {
  it('chains string transforms', () => {
    const result = EchoKyt.from('  Hello @devs - ship #release  ### ')
      .stripPromptPatterns()
      .cleanWhitespace()
      .slug()
      .value();

    expect(result).toBe('hello-devs-ship-release');
  });

  it('exposes terminal parse methods', () => {
    const result = EchoKyt.from(
      'Hi @alice and @bob #launch at https://example.com via hello@example.com',
    ).parse();
    expect(result.mentions.map((m) => m.value)).toEqual(['alice', 'bob']);
    expect(result.hashtags.map((h) => h.value)).toEqual(['launch']);
    expect(result.urls.map((u) => u.value)).toEqual(['https://example.com']);
    expect(result.emails.map((e) => e.value)).toEqual(['hello@example.com']);
  });

  it('computes keyword density', () => {
    const density = EchoKyt.from('Build better build tools')
      .keywordDensity({ stopWords: [], minLength: 3 });
    expect(density.build).toBeCloseTo(0.5, 5);
  });

  it('supports sanitize pipeline with reading ease', () => {
    const score = EchoKyt.from('<p>“Hello” <script>alert(1)</script>world.</p>')
      .removeScriptsOrStyles()
      .stripHtml(['p'])
      .normalizeQuotes()
      .getReadingEase();

    expect(score).toBeGreaterThan(0);
  });

  it('supports validation and seo helpers', () => {
    expect(EchoKyt.from('team@example.com').validateEmail()).toBe(true);
    expect(EchoKyt.from('example.com').validateUrl({ allowNoProtocol: true })).toBe(true);
    expect(EchoKyt.from('hello-world').validateSlug()).toBe(true);

    const title = EchoKyt.from('A practical guide to text parsing').seoTitle({
      brand: 'EchoKyt',
      maxLength: 50,
    });
    expect(title.endsWith('| EchoKyt')).toBe(true);
    expect(EchoKyt.from('text text parsing parsing tools').seoKeywords({ topN: 2, stopWords: [] }))
      .toHaveLength(2);
  });

  it('supports case transforms and pii redaction in chain', () => {
    const result = EchoKyt.from('hello_world')
      .toCamelCase()
      .toTitleCase()
      .value();
    expect(result).toBe('Hello World');

    const redacted = EchoKyt.from('Reach me at team@example.com')
      .redactPII({ detectEmails: true, detectPhones: false, detectSSN: false })
      .value();
    expect(redacted).toContain('[REDACTED]');
  });

  it('supports advanced metrics terminals', () => {
    const sentiment = EchoKyt.from('Great and clear release').getSentiment();
    const analysis = EchoKyt.from('EchoKyt is great. EchoKyt is clear.').analyzeText();

    expect(sentiment.label).toBe('positive');
    expect(analysis.wordCount).toBeGreaterThan(0);
  });
});
