import { readingTime } from '../src/index';

describe('readingTime', () => {
  it('returns 0 for empty text', () => {
    expect(readingTime('')).toBe(0);
  });

  it('calculates reading time correctly', () => {
    const text = 'word '.repeat(400); // 400 words
    expect(readingTime(text)).toBe(2);
  });

  it('respects custom words per minute', () => {
    const text = 'word '.repeat(300);
    expect(readingTime(text, 150)).toBe(2);
  });
});
