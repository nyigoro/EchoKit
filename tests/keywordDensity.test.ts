import { getKeywordDensity } from '../src/index';

describe('getKeywordDensity', () => {
  it('returns normalized keyword frequencies', () => {
    const text = 'The quick brown fox jumps over the lazy dog and the quick cat';
    const density = getKeywordDensity(text);

    expect(density.quick).toBeCloseTo(0.25, 5);
    expect(density.brown).toBeCloseTo(0.125, 5);
    expect(density.fox).toBeCloseTo(0.125, 5);
  });

  it('respects minLength and custom stopWords', () => {
    const text = 'AI is a big deal in AI labs';
    const density = getKeywordDensity(text, {
      minLength: 3,
      stopWords: ['ai'],
    });

    expect(density.ai).toBeUndefined();
    expect(density.big).toBeCloseTo(1 / 3, 5);
    expect(density.deal).toBeCloseTo(1 / 3, 5);
  });
});
