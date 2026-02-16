import {
  extractHashtags,
  extractMentions,
  removeScriptsOrStyles,
  stripHtml,
} from '../src/index';

describe('regex safety and long-input behavior', () => {
  it('extractMentions handles long and noisy input without throwing', () => {
    const longText = `${'word '.repeat(4000)} @alpha ${'x'.repeat(10000)} @beta`;
    const mentions = extractMentions(longText);

    expect(mentions.map((item) => item.value)).toEqual(['alpha', 'beta']);
  });

  it('extractHashtags handles long and noisy input without throwing', () => {
    const longText = `${'#tag '.repeat(3000)} ${'noise_'.repeat(2000)} #release`;
    const hashtags = extractHashtags(longText);

    expect(hashtags.length).toBeGreaterThan(0);
    expect(hashtags[hashtags.length - 1]?.value).toBe('release');
  });

  it('stripHtml handles malformed or unclosed tags safely', () => {
    const malformed =
      '<div class="x"><p>hello<script not-closed <strong>world</div><span data-a="1">ok';
    const output = stripHtml(malformed, ['strong']);

    expect(output).toContain('hello');
    expect(output).toContain('ok');
  });

  it('removeScriptsOrStyles removes very large script/style blocks', () => {
    const scriptPayload = 'var a = 1;'.repeat(5000);
    const stylePayload = '.x{color:red;}'.repeat(5000);
    const html = `A<script>${scriptPayload}</script>B<style>${stylePayload}</style>C<noscript>n</noscript>`;
    const cleaned = removeScriptsOrStyles(html);

    expect(cleaned).toBe('ABC<noscript>n</noscript>');
  });
});
