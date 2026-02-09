import { smartTruncate } from '../src/index';

describe('smartTruncate', () => {
  it('should truncate at the nearest word without cutting mid-word', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    const result = smartTruncate(text, 20);
    expect(result).toBe('The quick brown fox...');
  });

  it('should return the same text if under limit', () => {
    const text = 'Short text';
    const result = smartTruncate(text, 50);
    expect(result).toBe('Short text');
  });

  it('should return the same text if length equals limit', () => {
    const text = 'Exact length';
    expect(smartTruncate(text, text.length)).toBe(text);
  });

  it('should truncate a long single word', () => {
    const text = 'Supercalifragilistic';
    expect(smartTruncate(text, 5)).toBe('Super...');
  });
});
