import { runCli } from '../src/cli/runCli';

describe('cli runner', () => {
  it('prints help text', () => {
    const result = runCli(['help']);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain('EchoKyt CLI');
  });

  it('runs slug command', () => {
    const result = runCli(['slug', 'Hello World']);
    expect(result.code).toBe(0);
    expect(result.stdout).toBe('hello-world');
  });

  it('runs validate-url command with protocol option', () => {
    const result = runCli(['validate-url', 'example.com', '--allow-no-protocol']);
    expect(result.code).toBe(0);
    expect(result.stdout).toBe('true');
  });

  it('runs transformation and diff commands', () => {
    const camel = runCli(['camel', 'hello_world']);
    expect(camel.code).toBe(0);
    expect(camel.stdout).toBe('helloWorld');

    const diff = runCli(['diff', '--old', 'ship fast', '--new', 'ship faster']);
    expect(diff.code).toBe(0);
    expect(diff.stdout).toContain('"added"');
  });

  it('runs pii and analysis commands', () => {
    const redact = runCli(['redact-pii', 'Email team@example.com']);
    expect(redact.code).toBe(0);
    expect(redact.stdout).toContain('[REDACTED]');

    const analyze = runCli(['analyze', 'Great and clear release']);
    expect(analyze.code).toBe(0);
    expect(analyze.stdout).toContain('"wordCount"');
  });

  it('renders template command', () => {
    const result = runCli([
      'template',
      'socialPost',
      '--vars',
      'headline=EchoKyt 0.2,details=Now with CLI,cta=Try it today',
    ]);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain('EchoKyt 0.2');
    expect(result.stdout).toContain('Try it today');
  });
});
