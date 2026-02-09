import { readingTime } from '../src/index';

describe('readingTime', () => {
  it('returns 0 for empty text', () => {
    expect(readingTime('')).toBe(0);
  });

  it('returns 0 for whitespace-only text', () => {
    expect(readingTime('   \n\t  ')).toBe(0);
  });

  it('calculates reading time correctly', () => {
    const text = 'word '.repeat(400); // 400 words
    expect(readingTime(text)).toBe(2);
  });

  it('handles multi-line text', () => {
    const text = 'one two\nthree four\n\nfive';
    expect(readingTime(text, 200)).toBe(1);
  });

  it('respects custom words per minute', () => {
    const text = 'word '.repeat(300);
    expect(readingTime(text, 150)).toBe(2);
  });
});
