import { Injectable, PipeTransform } from '@nestjs/common';

import { ConsultedBoletoIsAtWrongFormat } from './exceptions/ConsultedBoletoIsAtWrongFormat';

@Injectable()
export class ValidateBoletoDigitableLineFormatPipe implements PipeTransform {
  transform(digitableLine: string): string {
    const onlyNumbersRegex = new RegExp('^[0-9]+$');
    if (!onlyNumbersRegex.test(digitableLine))
      throw new ConsultedBoletoIsAtWrongFormat('deve conter apenas números');

    if (digitableLine.length !== 47)
      throw new ConsultedBoletoIsAtWrongFormat('deve conter 47 caracteres');

    return digitableLine;
  }
}
