/**
 * Estimates reading time in minutes.
 * Assumes an average reading speed of 200 WPM.
 */
export const readingTime = (text: string, wordsPerMinute: number = 200): number => {
  if (!text.trim()) return 0;

  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};
