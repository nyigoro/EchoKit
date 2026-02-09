import { slugify } from '../src/index';

describe('slugify', () => {
  it('should convert strings to lowercase and replace spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    expect(slugify('Hello World!!!')).toBe('hello-world');
  });

  it('should handle multiple spaces and underscores', () => {
    expect(slugify('User__name  with   spaces')).toBe('user-name-with-spaces');
  });

  it('should return empty string for empty or whitespace-only input', () => {
    expect(slugify('')).toBe('');
    expect(slugify('   \n\t  ')).toBe('');
  });

  it('should drop emoji and trim hyphens', () => {
    expect(slugify('  Hello 😊 World  ')).toBe('hello-world');
    expect(slugify('--Hello--World--')).toBe('hello-world');
  });
});
