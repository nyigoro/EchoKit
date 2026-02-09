import { getReadingEase } from '../src/index';

describe('getReadingEase', () => {
  it('returns higher score for simpler text', () => {
    const simple = 'The cat sat on the mat.';
    const complex =
      'The implementation of computational linguistics presents considerable complexity.';

    const simpleScore = getReadingEase(simple);
    const complexScore = getReadingEase(complex);

    expect(simpleScore).toBeGreaterThan(complexScore);
  });

  it('returns 0 for empty text', () => {
    expect(getReadingEase('')).toBe(0);
  });
});
