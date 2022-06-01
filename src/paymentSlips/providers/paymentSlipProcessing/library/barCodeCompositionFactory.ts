import { PaymentSlipKind } from '../../../types/PaymentSlip';

export const barCodeCompositionFactory = (slipKind: PaymentSlipKind) => {
  const conventionalSlipBarComposition = [
    [1, 3],
    [4],
    [33],
    [34, 37],
    [38, 47],
    [5, 9],
    [11, 20],
    [22, 31],
  ];

  const collectionSlipBarComposition = [
    [1, 11],
    [13, 23],
    [25, 35],
    [37, 47],
  ];

  const barCodeCompositionOf = {
    conventional: conventionalSlipBarComposition,
    collection: collectionSlipBarComposition,
  };

  return barCodeCompositionOf[slipKind];
};
