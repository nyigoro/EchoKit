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
    const result = EchoKyt.from('Hi @alice and @bob #launch').parse();
    expect(result.mentions.map((m) => m.value)).toEqual(['alice', 'bob']);
    expect(result.hashtags.map((h) => h.value)).toEqual(['launch']);
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
});
