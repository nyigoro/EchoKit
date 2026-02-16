const levenshteinDistance = (left: string, right: string): number => {
  const rows = left.length + 1;
  const cols = right.length + 1;
  const table = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) table[i][0] = i;
  for (let j = 0; j < cols; j += 1) table[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      table[i][j] = Math.min(
        table[i - 1][j] + 1,
        table[i][j - 1] + 1,
        table[i - 1][j - 1] + cost,
      );
    }
  }

  return table[left.length][right.length];
};

/**
 * Computes normalized Levenshtein similarity from 0 to 1.
 */
export const similarityScore = (left: string, right: string): number => {
  const normalizedLeft = (left ?? '').trim();
  const normalizedRight = (right ?? '').trim();

  if (!normalizedLeft && !normalizedRight) return 1;
  if (!normalizedLeft || !normalizedRight) return 0;

  const maxLen = Math.max(normalizedLeft.length, normalizedRight.length);
  if (maxLen === 0) return 1;

  const distance = levenshteinDistance(normalizedLeft, normalizedRight);
  return Number((1 - distance / maxLen).toFixed(4));
};
