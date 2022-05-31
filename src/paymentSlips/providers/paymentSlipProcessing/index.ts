import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { sliceXFromYtoZ } from '../../../common/utils/sliceXFromYtoZ';

import { calculateDigitableLineFieldVerifier as calculateFieldVerifier } from './library/calculateDigitableLineFieldVerifier';

import { PaymentSlip } from '../../types/PaymentSlip';

import { IPaymentSlipProcessingProvider } from '../interfaces/IPaymentSlipProcessingProvider';
import { getDigitableLineFieldsIntervals } from './library/getDigitableLineFieldsIntervals';

@Injectable()
export class PaymentSlipProcessing implements IPaymentSlipProcessingProvider {
  getBarCodeFromDigitableLine(digitableLine: string): string {
    const barCode =
      sliceXFromYtoZ(digitableLine, 1, 3) +
      sliceXFromYtoZ(digitableLine, 4) +
      sliceXFromYtoZ(digitableLine, 33) +
      sliceXFromYtoZ(digitableLine, 34, 37) +
      sliceXFromYtoZ(digitableLine, 38, 47) +
      sliceXFromYtoZ(digitableLine, 5, 9) +
      sliceXFromYtoZ(digitableLine, 11, 20) +
      sliceXFromYtoZ(digitableLine, 22, 31);

    return barCode;
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

  validateBarCode(barCode: string): boolean {
    const digits =
      sliceXFromYtoZ(barCode, 1, 4) + sliceXFromYtoZ(barCode, 6, 'end');
    const verifier = sliceXFromYtoZ(barCode, 5);

    const multipliedDigitsTotal = digits
      .split('')
      .map((digit) => parseInt(digit))
      .reverse()
      .reduce((sum, digit, index) => {
        const multiplier = (index % 8) + 2;

        return sum + digit * multiplier;
      }, 0);

    const calculatedVerifier = 11 - (multipliedDigitsTotal % 11);

    return calculatedVerifier.toString() == verifier;
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
}
