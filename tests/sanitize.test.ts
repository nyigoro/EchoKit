import {
  cleanWhitespace,
  normalizeQuotes,
  removeScriptsOrStyles,
  stripHtml,
  stripInvisibleChars,
  stripPromptPatterns,
} from '../src/index';

describe('sanitize utilities', () => {
  it('cleanWhitespace collapses and trims whitespace', () => {
    expect(cleanWhitespace('  hello   world \n\t ')).toBe('hello world');
  });

  it('stripInvisibleChars removes zero-width characters', () => {
    const input = `a\u200Bb\u200D\uFEFFc\u2060`;
    expect(stripInvisibleChars(input)).toBe('abc');
  });

  it('stripPromptPatterns removes obvious markers', () => {
    const input = 'Hello <<SYS>>system<</SYS>> ###\nWorld';
    expect(stripPromptPatterns(input)).toBe('Hello system \nWorld');
  });

  it('stripHtml removes all tags by default', () => {
    const input = '<p>Hello <strong>World</strong></p>';
    expect(stripHtml(input)).toBe('Hello World');
  });

  it('stripHtml preserves allowed tags and strips attributes', () => {
    const input = '<a href="javascript:alert(1)" style="color:red">Link</a>';
    expect(stripHtml(input, ['a'])).toBe('<a>Link</a>');
  });

  it('removeScriptsOrStyles removes script/style blocks but keeps noscript', () => {
    const input = 'Hi<script>alert(1)</script>There<style>body{}</style><noscript>OK</noscript>';
    expect(removeScriptsOrStyles(input)).toBe('HiThere<noscript>OK</noscript>');
  });

  it('normalizeQuotes converts smart quotes to straight quotes', () => {
    const input = '“Hello” ‘world’';
    expect(normalizeQuotes(input)).toBe('"Hello" \'world\'');
  });
});
