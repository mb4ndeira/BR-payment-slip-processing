import { Injectable } from '@nestjs/common';

import { sliceXFromYtoZ } from '../../../common/utils/sliceXFromYtoZ';

import { barcodeCompositionFactory } from './library/barcodeCompositionFactory';
import { getDigitableLineFieldsIntervals } from './library/getDigitableLineFieldsIntervals';
import { calculateFieldVerifier } from './library/calculateDigitableLineFieldVerifier';
import { calculateGeneralVerifier } from './library/calculateBarCodeVerifier';

import { PaymentSlipKind } from '../../types/PaymentSlip';

import { IPaymentSlipProcessingProvider } from '../interfaces/IPaymentSlipProcessingProvider';
import { calculateExpirationDateFromFactor } from './library/calculateExpirationDateFromFactor';

@Injectable()
export class PaymentSlipProcessing implements IPaymentSlipProcessingProvider {
  retrieveDataFromDigitableLine(digitableLine: string): {
    type: PaymentSlipKind;
    barcode: string;
  } {
    const type = digitableLine.length === 47 ? 'conventional' : 'collection';

    const barcodeComposition = barcodeCompositionFactory(type);

    const barcode = barcodeComposition
      .map((interval) =>
        sliceXFromYtoZ(digitableLine, interval[0], interval[1]),
      )
      .join('');

    return { type, barcode };
  }

  retrieveDataFromBarcode(
    barcode: string,
    slipType: PaymentSlipKind,
  ): {
    amount: number;
    expirationDate: Date;
  } {
    const slipIsConventional = slipType === 'conventional';

    if (!slipIsConventional) {
      const amountIdentifier = sliceXFromYtoZ(barcode, 3);

      if (amountIdentifier !== '6' && amountIdentifier !== '8')
        return {
          amount: null,
          expirationDate: null,
        };
    }

    const amountDigits = slipIsConventional
      ? sliceXFromYtoZ(barcode, 10, 19)
      : sliceXFromYtoZ(barcode, 5, 15);

    const amount = parseFloat(
      `${amountDigits.slice(0, amountDigits.length - 2)}.${amountDigits.slice(
        amountDigits.length - 2,
      )}
    `,
    );

    if (!slipIsConventional) return { amount, expirationDate: null };

    const expirationDate = calculateExpirationDateFromFactor(
      sliceXFromYtoZ(barcode, 6, 9),
    );

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

  validateBarcode(barcode: string, slipType: PaymentSlipKind): boolean {
    const slipIsConventional = slipType === 'conventional';

    const digits =
      sliceXFromYtoZ(barcode, 1, slipIsConventional ? 4 : 3) +
      sliceXFromYtoZ(barcode, slipIsConventional ? 6 : 5, 'end');
    const verifier = sliceXFromYtoZ(barcode, slipIsConventional ? 5 : 4);

    const calculatedVerifier = slipIsConventional
      ? calculateGeneralVerifier(digits)
      : calculateFieldVerifier(digits);

    const figuredVerifier =
      calculatedVerifier === 0 || calculatedVerifier === 1
        ? '0'
        : calculatedVerifier === 10
        ? '1'
        : calculatedVerifier.toString();

    return figuredVerifier === verifier;
  }

  validateCollectionSlipAmountIdentifier(barcode: string): boolean {
    const identifier = sliceXFromYtoZ(barcode, 3);

    const identifierIsValid =
      identifier === '6' ||
      identifier === '7' ||
      identifier === '8' ||
      identifier === '9';

    return identifierIsValid;
  }
}
