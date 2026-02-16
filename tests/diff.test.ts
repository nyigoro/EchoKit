import { EchoKyt, diffText, similarityScore } from '../src/index';

describe('diff and similarity', () => {
  it('computes word-level diffs', () => {
    const result = diffText('ship fast and safe', 'ship faster and safer');
    expect(result.unchanged).toEqual(['ship', 'and']);
    expect(result.removed).toEqual(['fast', 'safe']);
    expect(result.added).toEqual(['faster', 'safer']);
  });

  it('computes similarity scores', () => {
    expect(similarityScore('hello world', 'hello world')).toBe(1);
    expect(similarityScore('hello world', 'goodbye')).toBeLessThan(0.5);
  });

  it('exposes static and instance wrappers', () => {
    const staticDiff = EchoKyt.diff('one two', 'one three');
    expect(staticDiff.added).toEqual(['three']);
    expect(staticDiff.removed).toEqual(['two']);

    const instanceScore = EchoKyt.from('hello world').similarityScore('hello');
    expect(instanceScore).toBeGreaterThan(0);
  });
});
