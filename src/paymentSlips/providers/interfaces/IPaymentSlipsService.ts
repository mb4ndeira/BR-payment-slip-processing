import { PaymentSlip } from '../../types/PaymentSlip';

export interface IPaymentSlipsService {
  getPaymentSlip(digitableLine: string): PaymentSlip;
}
