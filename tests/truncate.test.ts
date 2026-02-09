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
});
