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
});