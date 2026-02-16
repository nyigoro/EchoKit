export const TEMPLATE_LIBRARY = {
  releaseNote:
    'Release {{version}} is live. Highlights: {{highlights}}. Upgrade guide: {{upgradeGuide}}.',
  productUpdate:
    'Product update: {{title}}. What changed: {{changes}}. Next steps: {{nextSteps}}.',
  socialPost:
    '{{headline}} {{details}} {{cta}}',
} as const;

export type TemplateName = keyof typeof TEMPLATE_LIBRARY;
