# Changelog
All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog,
and this project adheres to Semantic Versioning.

## [Unreleased]
- Added email and URL extraction utilities.
- Added validation utilities (`isEmail`, `isUrl`, `isSlug`, `isMention`, `isHashtag`).
- Added SEO utilities (`extractSeoKeywords`, `createSeoTitle`, `createMetaDescription`).
- Added template library helpers (`fillTemplate`, `renderTemplate`, `listTemplates`).
- Added CLI tool (`echokyt`) for parse/validate/seo/template commands.
- Added case transformation utilities and noun inflection (`toCamelCase`, `toSnakeCase`, `toKebabCase`, `toTitleCase`, `pluralize`, `singularize`).
- Added diff and similarity utilities (`diffText`, `similarityScore`) with EchoKyt static/instance wrappers.
- Added PII detection and redaction (`detectPII`, `redactPII`).
- Added advanced metrics (`analyzeText`, `getSentiment`).
- Added browser bundle build for CDN distribution (`dist/browser.min.js`).

## [0.1.0] - 2026-02-16
- Added fluent `EchoKyt.from()` API for chainable text pipelines.
- Added mention/hashtag parsing utilities and keyword density analysis.
- Added sanitization utilities for whitespace, invisible chars, prompt markers, HTML, scripts/styles, and quote normalization.
- Added Flesch Reading Ease metric (approximate) alongside reading time.
- Added dual ESM/CJS outputs with subpath exports and type mappings.
- Added CI quality gates (`lint`, `test`, `build`) and benchmark workflow.
- Added API contract tests and regex safety tests for long/malformed inputs.
- Added linting/formatting tooling and benchmark/stress scripts.

## [0.0.1] - 2026-02-09
- Initial release.
