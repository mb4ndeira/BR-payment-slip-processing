import { PaymentSlip } from '../../types/PaymentSlip';

export interface IPaymentSlipProcessingProvider {
  retrieveDataFromDigitableLine(digitableLine: string): Partial<PaymentSlip>;
  retrieveDataFromBarCode(barCode: string): Partial<PaymentSlip>;
  validateDigitableLine(digitableLine: string): boolean;
  validateBarCode(barCode: string): boolean;
}
