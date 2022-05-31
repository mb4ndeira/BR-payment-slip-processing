import { Injectable, PipeTransform } from '@nestjs/common';

import { ConsultedPaymentSlipIsAtWrongFormat } from '../exceptions/ConsultedSlipIsAtWrongFormat';

@Injectable()
export class ValidatePaymentSlipDigitableLineFormatPipe
  implements PipeTransform
{
  transform(digitableLine: string): string {
    const onlyNumbersRegex = new RegExp('^[0-9]+$');
    if (!onlyNumbersRegex.test(digitableLine))
      throw new ConsultedPaymentSlipIsAtWrongFormat(
        'deve conter apenas números',
      );

    if (digitableLine.length !== 47 && digitableLine.length !== 48)
      throw new ConsultedPaymentSlipIsAtWrongFormat(
        'deve conter de 47 a 48 dígitos',
      );

    return digitableLine;
  }
}
