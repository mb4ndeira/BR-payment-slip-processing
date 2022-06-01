export const calculateExpirationDateFromFactor = (
  expirationFactor: string,
): Date => {
  const referenceDateTimestampOnDays =
    new Date('07/03/2000').getTime() / (1000 * 60 * 60 * 24);

  const expirationDateTimestampOnDays =
    referenceDateTimestampOnDays + parseInt(expirationFactor) - 1000;

  const expirationDate = new Date(
    expirationDateTimestampOnDays * (1000 * 60 * 60 * 24),
  );

  return expirationDate;
};
