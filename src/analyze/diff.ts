export type DiffResult = {
  added: string[];
  removed: string[];
  unchanged: string[];
};

const tokenize = (text: string): string[] => {
  const trimmed = (text ?? '').trim();
  if (!trimmed) return [];
  return trimmed.split(/\s+/);
};

const buildLcsTable = (left: string[], right: string[]): number[][] => {
  const rows = left.length + 1;
  const cols = right.length + 1;
  const table = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      if (left[i - 1] === right[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
      }
    }
  }

  return table;
};

/**
 * Computes a word-level diff using LCS.
 */
export const diffText = (oldText: string, newText: string): DiffResult => {
  const left = tokenize(oldText);
  const right = tokenize(newText);
  const table = buildLcsTable(left, right);

  const unchanged: string[] = [];
  const added: string[] = [];
  const removed: string[] = [];

  let i = left.length;
  let j = right.length;

  while (i > 0 && j > 0) {
    if (left[i - 1] === right[j - 1]) {
      unchanged.push(left[i - 1]);
      i -= 1;
      j -= 1;
      continue;
    }

    if (table[i - 1][j] >= table[i][j - 1]) {
      removed.push(left[i - 1]);
      i -= 1;
    } else {
      added.push(right[j - 1]);
      j -= 1;
    }
  }

  while (i > 0) {
    removed.push(left[i - 1]);
    i -= 1;
  }

  while (j > 0) {
    added.push(right[j - 1]);
    j -= 1;
  }

  return {
    added: added.reverse(),
    removed: removed.reverse(),
    unchanged: unchanged.reverse(),
  };
};
