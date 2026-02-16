export type TemplateVariables = Record<string, string | number | boolean>;

const VARIABLE_REGEX = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;

/**
 * Replaces {{variable}} placeholders in a template string.
 */
export const fillTemplate = (
  template: string,
  variables: TemplateVariables = {},
): string => {
  return (template ?? '').replace(VARIABLE_REGEX, (fullMatch, key) => {
    if (!(key in variables)) return fullMatch;
    return String(variables[key]);
  });
};
