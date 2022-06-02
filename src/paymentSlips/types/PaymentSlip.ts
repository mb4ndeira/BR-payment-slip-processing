export type PaymentSlipKind = 'conventional' | 'collection';

export type PaymentSlip = {
  type: PaymentSlipKind;
  barCode: string;
  amount: string;
  expirationDate: string;
};
