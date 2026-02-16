import {
  TEMPLATE_LIBRARY,
  fillTemplate,
  listTemplates,
  renderTemplate,
} from '../src/index';

describe('template library', () => {
  it('fills template variables', () => {
    const output = fillTemplate('Hello {{name}}!', { name: 'Ada' });
    expect(output).toBe('Hello Ada!');
  });

  it('renders built-in templates by name', () => {
    const text = renderTemplate('releaseNote', {
      version: '0.2.0',
      highlights: 'CLI improvements',
      upgradeGuide: 'docs.example.com/upgrade',
    });
    expect(text).toContain('Release 0.2.0 is live.');
  });

  it('lists all available templates', () => {
    const names = listTemplates();
    expect(names).toEqual(expect.arrayContaining(Object.keys(TEMPLATE_LIBRARY)));
  });
});
