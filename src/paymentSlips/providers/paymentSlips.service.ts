import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

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

    const { type, barcode } =
      this.paymentSlipProcessingProvider.retrieveDataFromDigitableLine(
        digitableLine,
      );

    if (
      type === 'collection' &&
      this.paymentSlipProcessingProvider.validateCollectionSlipAmountIdentifier(
        barcode,
      ) === false
    )
      throw new ConsultedPaymentSlipIsNotValid(
        'dígito identificador de valor efetivo ou referência inválido',
      );

    if (
      this.paymentSlipProcessingProvider.validateBarcode(barcode, type) ===
      false
    )
      throw new ConsultedPaymentSlipIsNotValid(
        'dígito verificador do código de barras não corresponde',
      );

    const { amount, expirationDate } =
      this.paymentSlipProcessingProvider.retrieveDataFromBarcode(barcode, type);

    return {
      type,
      barcode,
      ...(amount && { amount: amount.toFixed(2) }),
      ...(expirationDate && {
        expirationDate: dayjs(expirationDate)
          .locale('pt-br')
          .format('YYYY-MM-DD'),
      }),
    };
  }
}
