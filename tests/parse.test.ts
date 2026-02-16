import {
  extractEmails,
  extractHashtags,
  extractMentions,
  extractUrls,
  parseTextEntities,
} from '../src/index';

describe('parse utilities', () => {
  it('extracts mentions and ignores emails', () => {
    const text = '@alice hello @bob! Email alice@example.com';
    const mentions = extractMentions(text);
    expect(mentions.map((m) => m.value)).toEqual(['alice', 'bob']);
    expect(mentions[0]?.index).toBe(0);
    expect(mentions[1]?.index).toBe(13);
  });

  it('extracts hashtags with unicode and underscores', () => {
    const text = 'Loving #TypeScript_5 and #café today';
    const hashtags = extractHashtags(text);
    expect(hashtags.map((h) => h.value)).toEqual(['TypeScript_5', 'café']);
  });

  it('parses both mentions and hashtags together', () => {
    const text = 'Hi @devs, ship #release at https://example.com and mail team@example.com';
    const parsed = parseTextEntities(text);
    expect(parsed.mentions.map((m) => m.value)).toEqual(['devs']);
    expect(parsed.hashtags.map((h) => h.value)).toEqual(['release']);
    expect(parsed.urls.map((u) => u.value)).toEqual(['https://example.com']);
    expect(parsed.emails.map((e) => e.value)).toEqual(['team@example.com']);
  });

  it('extracts emails and urls as standalone utilities', () => {
    const text = 'Contact: support@example.com or visit www.example.com.';
    expect(extractEmails(text).map((item) => item.value)).toEqual(['support@example.com']);
    expect(extractUrls(text).map((item) => item.value)).toEqual(['www.example.com']);
  });
});
