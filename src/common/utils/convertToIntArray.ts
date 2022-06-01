/**
 * Split a string and parse the resulting substrings, returns an integer array.
 * @param numbericString The original string.
 */
export const convertToIntArray = (numbericString: string): number[] => {
  return numbericString.split('').map((character) => parseInt(character));
};
