import { TEMPLATE_LIBRARY } from './library.js';
import type { TemplateName } from './library.js';

/**
 * Lists the available built-in template names.
 */
export const listTemplates = (): TemplateName[] => {
  return Object.keys(TEMPLATE_LIBRARY) as TemplateName[];
};
