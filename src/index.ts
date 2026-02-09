/**
 * Truncates text at the nearest whole word.
 */
export const smartTruncate = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  
  const lastSpace = text.lastIndexOf('', limit);
  return `${text.substring(0, lastSpace > 0 ? lastSpace : limit)}...`;
};