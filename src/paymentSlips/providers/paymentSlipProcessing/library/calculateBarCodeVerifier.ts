import { convertToIntArray } from '../../../../common/utils/convertToIntArray';

export const calculateGeneralVerifier = (digits: string) => {
  const multipliedDigitsTotal = convertToIntArray(digits).reduceRight(
    (sum, digit, index, array) => {
      const revertedIndex = array.length - index - 1;
      const multiplier = (revertedIndex % 8) + 2;

      return sum + digit * multiplier;
    },
    0,
  );

  const calculatedVerifier = 11 - (multipliedDigitsTotal % 11);

  return calculatedVerifier;
};
