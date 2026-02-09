/**
 * Truncates text at the nearest whole word.
 */
export const smartTruncate = (text: string, limit: number): string => {
  if (text.length <= limit) return text;

  const truncated = text.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(' ');

  const cleanCut = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

  return `${cleanCut}...`;
};
