import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { sliceXFromYtoZ } from '../../../common/utils/sliceXFromYtoZ';

import { barCodeCompositionFactory } from './library/barCodeCompositionFactory';
import { getDigitableLineFieldsIntervals } from './library/getDigitableLineFieldsIntervals';
import { calculateDigitableLineFieldVerifier as calculateFieldVerifier } from './library/calculateDigitableLineFieldVerifier';
import { calculateBarCodeVerifier } from './library/calculateBarCodeVerifier';

import { PaymentSlipKind } from '../../types/PaymentSlip';

import { IPaymentSlipProcessingProvider } from '../interfaces/IPaymentSlipProcessingProvider';
import { calculateExpirationDateFromFactor } from './library/calculateExpirationDateFromFactor';

@Injectable()
export class PaymentSlipProcessing implements IPaymentSlipProcessingProvider {
  retrieveDataFromDigitableLine(digitableLine: string): {
    type: PaymentSlipKind;
    barCode: string;
  } {
    const type = digitableLine.length === 47 ? 'conventional' : 'collection';

    const barCodeComposition = barCodeCompositionFactory(type);

    const barCode = barCodeComposition
      .map((interval) =>
        sliceXFromYtoZ(digitableLine, interval[0], interval[1]),
      )
      .join('');

    return { type, barCode };
  }

  retrieveDataFromBarCode(
    barCode: string,
    slipType: PaymentSlipKind,
  ): {
    amount: number;
    expirationDate: string;
  } {
    const slipIsConventional = slipType === 'conventional';

    if (!slipIsConventional) {
      const amountIdentifier = sliceXFromYtoZ(barCode, 3);

      if (amountIdentifier !== '6' && amountIdentifier !== '8')
        return {
          amount: null,
          expirationDate: null,
        };
    }

    const amountDigits = slipIsConventional
      ? sliceXFromYtoZ(barCode, 10, 19)
      : sliceXFromYtoZ(barCode, 5, 15);

    const amount = parseFloat(
      `${amountDigits.slice(0, amountDigits.length - 2)}.${amountDigits.slice(
        amountDigits.length - 2,
      )}
    `,
    );

    if (!slipIsConventional) return { amount, expirationDate: null };

    const calculatedExpirationDate = calculateExpirationDateFromFactor(
      sliceXFromYtoZ(barCode, 6, 9),
    );

    const expirationDate = dayjs(calculatedExpirationDate)
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
    const verifier = sliceXFromYtoZ(
      barCode,
      slipType === 'conventional' ? 5 : 4,
    );

    const calculatedVerifier = calculateBarCodeVerifier(barCode, slipType);

    const figuredVerifier =
      calculatedVerifier === 0 || calculatedVerifier === 1
        ? '0'
        : calculatedVerifier === 10
        ? '1'
        : calculatedVerifier.toString();

    return figuredVerifier === verifier;
  }
}
