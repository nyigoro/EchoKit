import { fillTemplate } from './fillTemplate.js';
import { TEMPLATE_LIBRARY } from './library.js';
import type { TemplateName } from './library.js';
import type { TemplateVariables } from './fillTemplate.js';

/**
 * Renders one of the built-in templates by name.
 */
export const renderTemplate = (
  name: TemplateName,
  variables: TemplateVariables = {},
): string => {
  return fillTemplate(TEMPLATE_LIBRARY[name], variables);
};
