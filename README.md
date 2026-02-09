# 📦 EchoKyt

A lightweight, zero-runtime-dependency utility library for smart text manipulation in TypeScript.

[![Tests](https://github.com/nyigoro/EchoKit/actions/workflows/ci.yml/badge.svg)](https://github.com/nyigoro/EchoKit/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **Fluent API**: Chainable, readable text pipelines.
- **Parser Utilities**: Mentions, hashtags, keyword density.
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
  extractMentions,
  extractHashtags,
  getKeywordDensity,
  stripHtml,
  normalizeQuotes,
  cleanWhitespace,
} from 'echokyt';

const text = 'Hello @alice, welcome to #EchoKyt!';

extractMentions(text); // [{ value: 'alice', index: 6, raw: '@alice' }]
extractHashtags(text); // [{ value: 'EchoKyt', index: 29, raw: '#EchoKyt' }]
getKeywordDensity(text); // { hello: 0.25, alice: 0.25, welcome: 0.25, echokyt: 0.25 }
stripHtml('<p>Hello <strong>World</strong></p>'); // "Hello World"
normalizeQuotes('“Hello”'); // "\"Hello\""
cleanWhitespace('  hi   there  '); // "hi there"
```

## 📊 Reading Ease Guide (Flesch)

- 90–100: Very Easy
- 60–70: Standard / Plain English
- 30–50: Academic
- 0–30: Very Difficult
