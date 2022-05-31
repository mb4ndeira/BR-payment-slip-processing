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

    if (digitableLine.length !== 47)
      throw new ConsultedPaymentSlipIsAtWrongFormat(
        'deve conter 47 caracteres',
      );

    return digitableLine;
  }
}
