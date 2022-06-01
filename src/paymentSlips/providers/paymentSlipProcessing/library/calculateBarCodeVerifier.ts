import { sliceXFromYtoZ } from '../../../../common/utils/sliceXFromYtoZ';

export const calculateBarCodeVerifier = (barCode: string, slipType: string) => {
  const slipIsConventional = slipType === 'conventional';

  const digits =
    sliceXFromYtoZ(barCode, 1, slipIsConventional ? 4 : 3) +
    sliceXFromYtoZ(barCode, slipIsConventional ? 6 : 5, 'end');

  const multipliedDigitsTotal = digits
    .split('')
    .map((digit) => parseInt(digit))
    .reduceRight((sum, digit, index, array) => {
      const revertedIndex = array.length - index - 1;
      const multiplier = (revertedIndex % 8) + 2;

      return sum + digit * multiplier;
    }, 0);

  const calculatedVerifier = slipIsConventional
    ? 11 - (multipliedDigitsTotal % 11)
    : multipliedDigitsTotal % 11;

  return calculatedVerifier;
};
