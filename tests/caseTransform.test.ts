import {
  pluralize,
  singularize,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
} from '../src/index';

describe('case transformations and inflection', () => {
  it('converts to camel case', () => {
    expect(toCamelCase('hello_world')).toBe('helloWorld');
    expect(toCamelCase('Hello world')).toBe('helloWorld');
  });

  it('converts to snake case', () => {
    expect(toSnakeCase('HelloWorld')).toBe('hello_world');
  });

  it('converts to kebab and title case', () => {
    expect(toKebabCase('hello world')).toBe('hello-world');
    expect(toTitleCase('hello-world')).toBe('Hello World');
  });

  it('pluralizes and singularizes common words', () => {
    expect(pluralize('child')).toBe('children');
    expect(singularize('people')).toBe('person');
    expect(pluralize('category')).toBe('categories');
    expect(singularize('categories')).toBe('category');
  });
});
