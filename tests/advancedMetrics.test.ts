import { analyzeText, getSentiment } from '../src/index';

describe('advanced metrics', () => {
  it('returns sentiment labels and score', () => {
    const positive = getSentiment('Great release with excellent docs and fast setup');
    const negative = getSentiment('Terrible bug and awful experience');

    expect(positive.label).toBe('positive');
    expect(negative.label).toBe('negative');
  });

  it('returns comprehensive analysis', () => {
    const analysis = analyzeText('EchoKyt is great. EchoKyt is fast and clear.');

    expect(analysis.wordCount).toBeGreaterThan(0);
    expect(analysis.sentenceCount).toBe(2);
    expect(analysis.readingTime).toBeGreaterThan(0);
    expect(analysis.mostCommonWords.length).toBeGreaterThan(0);
    expect(analysis.topBigrams.length).toBeGreaterThan(0);
  });
});
