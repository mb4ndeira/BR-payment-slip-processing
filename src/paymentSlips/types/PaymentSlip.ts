export type PaymentSlipKind = 'conventional' | 'collection';

export type PaymentSlip = {
  type: PaymentSlipKind;
  barcode: string;
  amount: string;
  expirationDate: string;
};
