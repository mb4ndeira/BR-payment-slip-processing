import { PaymentSlipKind } from '../../types/PaymentSlip';

export interface IPaymentSlipProcessingProvider {
  retrieveDataFromDigitableLine(digitableLine: string): {
    type: PaymentSlipKind;
    barCode: string;
  };
  retrieveDataFromBarCode(
    barCode: string,
    slipType: PaymentSlipKind,
  ): {
    amount: number;
    expirationDate: Date;
  };
  validateDigitableLine(digitableLine: string): boolean;
  validateBarCode(barCode: string, slipType: PaymentSlipKind): boolean;
  validateCollectionSlipAmountIdentifier(barCode: string): boolean;
}
