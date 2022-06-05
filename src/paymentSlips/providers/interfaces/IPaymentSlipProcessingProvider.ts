import { PaymentSlipKind } from '../../types/PaymentSlip';

export interface IPaymentSlipProcessingProvider {
  retrieveDataFromDigitableLine(digitableLine: string): {
    type: PaymentSlipKind;
    barcode: string;
  };
  retrieveDataFromBarcode(
    barcode: string,
    slipType: PaymentSlipKind,
  ): {
    amount: number;
    expirationDate: Date;
  };
  validateDigitableLine(digitableLine: string): boolean;
  validateBarcode(barcode: string, slipType: PaymentSlipKind): boolean;
  validateCollectionSlipAmountIdentifier(barcode: string): boolean;
}
