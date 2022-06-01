import { convertToIntArray } from '../../../../common/utils/convertToIntArray';

export const calculateDigitableLineFieldVerifier = (digits: string): number => {
  const multipliedDigitsTotal = convertToIntArray(digits).reduceRight(
    (sum, digit, index, array) => {
      const revertedIndex = array.length - index - 1;
      const multiplier = revertedIndex % 2 == 0 ? 2 : 1;

      const multipliedDigit = digit * multiplier;

      if (multipliedDigit.toString().length < 2) return sum + multipliedDigit;

      const reducedMultipliedDigit =
        multipliedDigit === 18 ? 9 : multipliedDigit % 9;

      return sum + reducedMultipliedDigit;
    },
    0,
  );

  const verifier = 10 - (multipliedDigitsTotal % 10);

  if (verifier === 10) return 0;
  return verifier;
};
