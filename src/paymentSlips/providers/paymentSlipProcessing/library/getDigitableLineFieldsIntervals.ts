export const getDigitableLineFieldsIntervals = (digitableLine: string) => {
  const shorterDigitableLine = [
    [1, 10],
    [11, 21],
    [22, 32],
  ];

  const lengthierDigitableLine = [
    [1, 12],
    [13, 24],
    [25, 36],
    [37, 48],
  ];

  return digitableLine.length === 47
    ? shorterDigitableLine
    : lengthierDigitableLine;
};
