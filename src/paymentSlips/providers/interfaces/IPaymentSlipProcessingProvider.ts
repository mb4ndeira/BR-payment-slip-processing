import { PaymentSlipKind } from '../../types/PaymentSlip';

export interface IPaymentSlipProcessingProvider {
  retrieveDataFromDigitableLine(digitableLine: string): {
    type: PaymentSlipKind;
    barCode: string;
  };
  retrieveDataFromBarCode(barCode: string): {
    amount: number;
    expirationDate: string;
  };
  validateDigitableLine(digitableLine: string): boolean;
  validateBarCode(barCode: string, slipType: PaymentSlipKind): boolean;
}
