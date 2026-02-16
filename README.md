# 📦 EchoKyt

A lightweight, zero-runtime-dependency utility library for smart text manipulation in TypeScript.

[![Tests](https://github.com/nyigoro/EchoKit/actions/workflows/ci.yml/badge.svg)](https://github.com/nyigoro/EchoKit/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **Fluent API**: Chainable, readable text pipelines.
- **Parser Utilities**: Mentions, hashtags, emails, URLs, keyword density.
- **Validation Utilities**: Email, URL, slug, mention, hashtag checks.
- **SEO Utilities**: Meta description, SEO title, keyword extraction.
- **Template Library**: Built-in templates with variable rendering.
- **CLI Tool**: Run extraction, validation, and SEO commands from terminal.
- **Case Transformations**: Camel, snake, kebab, and title case conversions.
- **Diff & Comparison**: Word-level diffs and similarity scoring.
- **PII Safety**: Detect and redact common sensitive entities.
- **Advanced Metrics**: Sentiment and full text analysis summaries.
- **Sanitization & Safety**: Strip HTML, scripts/styles, normalize quotes.
- **Prompt Hygiene**: Clean whitespace, invisible chars, and common markers.
- **Smart Truncate**: Cuts text at word boundaries, not mid-word.
- **Reading Metrics**: Reading time + Flesch Reading Ease score.
- **TypeScript Ready**: Full type definitions included.

## 🚀 Installation

```bash
npm install echokyt
```

## ✅ Quick Example (Fluent)

```ts
import { EchoKyt } from 'echokyt';

const score = EchoKyt.from('<p>“Hello” <strong>world</strong><script>alert(1)</script></p>')
  .removeScriptsOrStyles()
  .stripHtml(['strong', 'em'])
  .normalizeQuotes()
  .getReadingEase();

// Flesch Reading Ease score (approx.)
```

## ✅ Quick Example (Functional)

```ts
import {
  toCamelCase,
  toSnakeCase,
  diffText,
  similarityScore,
  redactPII,
  analyzeText,
  extractMentions,
  extractHashtags,
  extractEmails,
  extractUrls,
  isEmail,
  isUrl,
  extractSeoKeywords,
  createMetaDescription,
  renderTemplate,
  getKeywordDensity,
  stripHtml,
  normalizeQuotes,
  cleanWhitespace,
} from 'echokyt';

const text = 'Hello @alice, welcome to #EchoKyt!';

toCamelCase('hello_world'); // "helloWorld"
toSnakeCase('HelloWorld'); // "hello_world"
diffText('ship fast', 'ship faster'); // { added: ['faster'], removed: ['fast'], unchanged: ['ship'] }
similarityScore('hello world', 'hello'); // 0.4545
redactPII('Email me at team@example.com'); // "Email me at [REDACTED]"
analyzeText('Great release. Very clear docs.'); // { wordCount, sentiment, ... }
extractMentions(text); // [{ value: 'alice', index: 6, raw: '@alice' }]
extractHashtags(text); // [{ value: 'EchoKyt', index: 29, raw: '#EchoKyt' }]
extractEmails('Ping team@example.com'); // [{ value: 'team@example.com', ... }]
extractUrls('https://echokyt.dev/docs'); // [{ value: 'https://echokyt.dev/docs', ... }]
isEmail('team@example.com'); // true
isUrl('echokyt.dev', { allowNoProtocol: true }); // true
extractSeoKeywords(text, { topN: 3 }); // ['hello', 'alice', 'echokyt']
createMetaDescription('<p>Hello <strong>World</strong></p>', 80); // "Hello World"
renderTemplate('socialPost', { headline: 'EchoKyt 0.1.0', details: 'Now with CLI', cta: 'Try it' });
getKeywordDensity(text); // { hello: 0.25, alice: 0.25, welcome: 0.25, echokyt: 0.25 }
stripHtml('<p>Hello <strong>World</strong></p>'); // "Hello World"
normalizeQuotes('“Hello”'); // "\"Hello\""
cleanWhitespace('  hi   there  '); // "hi there"
```

## 🧰 CLI

After install, run:

```bash
echokyt help
echokyt slug "Hello World"
echokyt emails "Contact us at team@example.com"
echokyt validate-url "echokyt.dev" --allow-no-protocol
echokyt keywords "text parsing and text sanitization" --top 3
echokyt analyze "This release is great and fast."
echokyt redact-pii "Call me at 555-123-4567"
```

## 🌐 CDN

```html
<script src="https://cdn.jsdelivr.net/npm/echokyt@latest/dist/browser.min.js"></script>
<script>
  const result = EchoKyt.from('<p>Hello</p>').stripHtml().toString();
  console.log(result);
</script>
```

## 📊 Reading Ease Guide (Flesch)

- 90–100: Very Easy
- 60–70: Standard / Plain English
- 30–50: Academic
- 0–30: Very Difficult
