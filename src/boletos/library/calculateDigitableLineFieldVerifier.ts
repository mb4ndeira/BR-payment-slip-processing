export const calculateDigitableLineFieldVerifier = (digits: string): number => {
  const multipliedDigitsTotal = digits
    .split('')
    .map((digit) => parseInt(digit))
    .reverse()
    .reduce((sum, digit, index) => {
      const multiplier = index % 2 == 0 ? 2 : 1;

      const multipliedDigit = digit * multiplier;

      if (multipliedDigit.toString().length < 2) return sum + multipliedDigit;

      const reducedMultipliedDigit = multipliedDigit
        .toString()
        .split('')
        .map((digit) => parseInt(digit))
        .reduce((sum, character) => (sum += character), 0);

      return sum + reducedMultipliedDigit;
    }, 0);

  const verifier = 10 - (multipliedDigitsTotal % 10);

  if (verifier === 10) return 0;
  return verifier;
};
