import { detectPII, redactPII } from '../src/index';

describe('pii detection and redaction', () => {
  it('detects emails, phones, and ssn', () => {
    const text = 'Email me at team@example.com, call 555-123-4567, SSN 123-45-6789.';
    const matches = detectPII(text);

    expect(matches.map((match) => match.type)).toEqual(['email', 'phone', 'ssn']);
  });

  it('redacts selected pii types', () => {
    const text = 'Contact team@example.com or 555-123-4567.';
    const redacted = redactPII(text, {
      detectEmails: true,
      detectPhones: true,
      detectSSN: false,
      replacement: '[MASKED]',
    });

    expect(redacted).toContain('[MASKED]');
    expect(redacted).not.toContain('team@example.com');
    expect(redacted).not.toContain('555-123-4567');
  });
});
