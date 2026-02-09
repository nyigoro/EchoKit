/**
 * Converts a string into a URL-friendly slug.
 * Example: "Hello World!" -> "hello-world"
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
