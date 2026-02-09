import { performance } from 'node:perf_hooks';
import {
  extractHashtags,
  extractMentions,
  getKeywordDensity,
  getReadingEase,
  normalizeQuotes,
  readingTime,
  removeScriptsOrStyles,
  slugify,
  smartTruncate,
  stripHtml,
} from '../dist/index.js';

const run = (name, iterations, fn) => {
  const start = performance.now();
  for (let i = 0; i < iterations; i += 1) {
    fn();
  }
  const end = performance.now();
  const totalMs = end - start;
  const avgMs = totalMs / iterations;
  console.log(`${name}: ${totalMs.toFixed(2)}ms total (${avgMs.toFixed(4)}ms avg)`);
};

const sampleText =
  'Hello world! This is a sample string with @mentions and #hashtags. '.repeat(50);
const sampleHtml =
  '<p>Hello <strong>world</strong> <script>alert(1)</script> #hashtags</p>'.repeat(50);

run('slugify', 5000, () => {
  slugify(sampleText);
});

run('smartTruncate', 5000, () => {
  smartTruncate(sampleText, 120);
});

run('readingTime', 5000, () => {
  readingTime(sampleText);
});

run('getReadingEase', 2000, () => {
  getReadingEase(sampleText);
});

run('extractMentions', 5000, () => {
  extractMentions(sampleText);
});

run('extractHashtags', 5000, () => {
  extractHashtags(sampleText);
});

run('getKeywordDensity', 2000, () => {
  getKeywordDensity(sampleText);
});

run('stripHtml', 5000, () => {
  stripHtml(sampleHtml);
});

run('removeScriptsOrStyles', 5000, () => {
  removeScriptsOrStyles(sampleHtml);
});

run('normalizeQuotes', 5000, () => {
  normalizeQuotes('“Hello” ‘world’'.repeat(50));
});

const runOnce = (name, fn) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name}: ${(end - start).toFixed(2)}ms`);
};

const stressText = 'word '.repeat(10000);
const stressHtml = `<div>${stressText}</div><script>${stressText}</script>`;

runOnce('stress: slugify (10k words)', () => {
  slugify(stressText);
});

runOnce('stress: stripHtml (10k words)', () => {
  stripHtml(stressHtml);
});

runOnce('stress: getKeywordDensity (10k words)', () => {
  getKeywordDensity(stressText);
});
