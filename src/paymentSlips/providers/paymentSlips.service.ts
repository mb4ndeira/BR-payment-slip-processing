import { Injectable } from '@nestjs/common';

import { PaymentSlipProcessing } from './paymentSlipProcessing';

import { ConsultedPaymentSlipIsNotValid } from '../exceptions/ConsultedSlipIsNotValid';

import { PaymentSlip } from '../types/PaymentSlip';

import { IPaymentSlipsService } from './interfaces/IPaymentSlipsService';

@Injectable()
export class PaymentSlipsService implements IPaymentSlipsService {
  constructor(private paymentSlipProcessingProvider: PaymentSlipProcessing) {}
  getPaymentSlip(digitableLine: string): PaymentSlip {
    if (
      this.paymentSlipProcessingProvider.validateDigitableLine(
        digitableLine,
      ) === false
    )
      throw new ConsultedPaymentSlipIsNotValid(
        'dígito verificador de campo da linha digitável não corresponde',
      );

    const { type, barCode } =
      this.paymentSlipProcessingProvider.retrieveDataFromDigitableLine(
        digitableLine,
      );

    if (
      type === 'collection' &&
      this.paymentSlipProcessingProvider.validateCollectionSlipAmountIdentifier(
        barCode,
      ) === false
    )
      throw new ConsultedPaymentSlipIsNotValid(
        'dígito identificador de valor efetivo ou referência inválido',
      );

    if (
      this.paymentSlipProcessingProvider.validateBarCode(barCode, type) ===
      false
    )
      throw new ConsultedPaymentSlipIsNotValid(
        'dígito verificador do código de barras não corresponde',
      );

    const { amount, expirationDate } =
      this.paymentSlipProcessingProvider.retrieveDataFromBarCode(barCode, type);

    return {
      type,
      barCode,
      amount,
      expirationDate,
    };
  }
}
