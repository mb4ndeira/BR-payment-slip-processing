import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { sliceXFromYtoZ } from '../../../common/utils/sliceXFromYtoZ';

import { barCodeCompositionFactory } from './library/barCodeCompositionFactory';
import { getDigitableLineFieldsIntervals } from './library/getDigitableLineFieldsIntervals';
import { calculateDigitableLineFieldVerifier as calculateFieldVerifier } from './library/calculateDigitableLineFieldVerifier';

import { PaymentSlip, PaymentSlipKind } from '../../types/PaymentSlip';

import { IPaymentSlipProcessingProvider } from '../interfaces/IPaymentSlipProcessingProvider';

@Injectable()
export class PaymentSlipProcessing implements IPaymentSlipProcessingProvider {
  retrieveDataFromDigitableLine(digitableLine: string): Partial<PaymentSlip> {
    const type = digitableLine.length === 47 ? 'conventional' : 'collection';

    const barCodeComposition = barCodeCompositionFactory(type);

    const barCode = barCodeComposition
      .map((interval) =>
        sliceXFromYtoZ(digitableLine, interval[0], interval[1]),
      )
      .join('');

    return { type, barCode };
  }

  retrieveDataFromBarCode(barCode: string): Partial<PaymentSlip> {
    const amountDigits = sliceXFromYtoZ(barCode, 10, 19);
    const expirationDateDigits = sliceXFromYtoZ(barCode, 6, 9);

    const amount = parseFloat(
      `${amountDigits.slice(0, amountDigits.length - 2)}.${amountDigits.slice(
        amountDigits.length - 2,
      )}
    `,
    );

    const referenceDateTimestampOnDays =
      new Date('07/03/2000').getTime() / (1000 * 60 * 60 * 24);

    const expirationDateTimestampOnDays =
      referenceDateTimestampOnDays + parseInt(expirationDateDigits) - 1000;

    const expirationDate = dayjs(
      expirationDateTimestampOnDays * (1000 * 60 * 60 * 24),
    )
      .locale('pt-br')
      .format('DD-MM-YYYY');

    return {
      amount,
      expirationDate,
    };
  }

  validateDigitableLine(digitableLine: string): boolean {
    const fieldsIntervals = getDigitableLineFieldsIntervals(digitableLine);

    const fieldsValidity = fieldsIntervals.map((interval) => {
      const field = digitableLine.slice(interval[0] - 1, interval[1]);
      const verifier = field.charAt(field.length - 1);

      return calculateFieldVerifier(
        field.slice(0, field.length - 1),
      ).toString() !== verifier
        ? false
        : true;
    });

    if (fieldsValidity.some((fieldValidity) => fieldValidity === false))
      return false;

    return true;
  }

  validateBarCode(barCode: string, slipType: PaymentSlipKind): boolean {
    const slipIsConventional = slipType === 'conventional';

    const digits =
      sliceXFromYtoZ(barCode, 1, slipIsConventional ? 4 : 3) +
      sliceXFromYtoZ(barCode, slipIsConventional ? 6 : 5, 'end');

    const verifier = sliceXFromYtoZ(barCode, slipIsConventional ? 5 : 4);

    const multipliedDigitsTotal = digits
      .split('')
      .map((digit) => parseInt(digit))
      .reduceRight((sum, digit, index, array) => {
        const revertedIndex = array.length - index - 1;
        const multiplier = (revertedIndex % 8) + 2;

        return sum + digit * multiplier;
      }, 0);

    const calculatedVerifier = slipIsConventional
      ? 11 - (multipliedDigitsTotal % 11)
      : multipliedDigitsTotal % 11;

    const figuredVerifier =
      calculatedVerifier === 0 || calculatedVerifier === 1
        ? '0'
        : calculatedVerifier === 10
        ? '1'
        : calculatedVerifier.toString();

    return figuredVerifier === verifier;
  }
}
