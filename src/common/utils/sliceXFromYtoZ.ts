/**
 * Returns a section of a string, using intuitive positions (Starting from 1) instead of indexes.
 * @param x The original string.
 * @param y The start position of the desidered portion of x.
 * @param z The end position of the desidered portion of x (The final substring will include the character indicated by z).
 * If this value is equals "end" the substring continues to the end of x (Behavior of 'String.slice()' without 'end' param).
 * If this value is not specified, the substring will contain only the position of y.
 */
export const sliceXFromYtoZ = (
  x: string,
  y: number,
  z?: number | 'end',
): string => {
  if (z === undefined) return x.slice(y - 1, y);

  if (z === 'end') return x.slice(y - 1);

  return x.slice(y - 1, z);
};
