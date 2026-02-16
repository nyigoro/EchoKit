import {
  isEmail,
  isHashtag,
  isMention,
  isSlug,
  isUrl,
} from '../src/index';

describe('validation utilities', () => {
  it('validates email addresses', () => {
    expect(isEmail('team@example.com')).toBe(true);
    expect(isEmail('not-an-email')).toBe(false);
  });

  it('validates urls with and without protocol', () => {
    expect(isUrl('https://example.com')).toBe(true);
    expect(isUrl('example.com')).toBe(false);
    expect(isUrl('example.com', { allowNoProtocol: true })).toBe(true);
  });

  it('validates slugs', () => {
    expect(isSlug('hello-world')).toBe(true);
    expect(isSlug('Hello World')).toBe(false);
  });

  it('validates mention and hashtag tokens', () => {
    expect(isMention('@dev_team')).toBe(true);
    expect(isMention('dev_team')).toBe(false);
    expect(isHashtag('#release2026')).toBe(true);
    expect(isHashtag('release2026')).toBe(false);
  });
});
