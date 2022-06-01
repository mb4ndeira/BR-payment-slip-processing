export type PaymentSlipKind = 'conventional' | 'collection';

export type PaymentSlip = {
  type: PaymentSlipKind;
  barCode: string;
  amount: number;
  expirationDate: string;
};
