import { performance } from 'node:perf_hooks';
import { slugify, smartTruncate, readingTime, extractMentions, extractHashtags } from '../dist/index.js';

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

run('slugify', 5000, () => {
  slugify(sampleText);
});

run('smartTruncate', 5000, () => {
  smartTruncate(sampleText, 120);
});

run('readingTime', 5000, () => {
  readingTime(sampleText);
});

run('extractMentions', 5000, () => {
  extractMentions(sampleText);
});

run('extractHashtags', 5000, () => {
  extractHashtags(sampleText);
});
