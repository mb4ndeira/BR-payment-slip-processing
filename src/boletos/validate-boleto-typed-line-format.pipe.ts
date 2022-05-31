import { Injectable, PipeTransform } from '@nestjs/common';

import { ConsultedBoletoIsAtWrongFormat } from './exceptions/ConsultedBoletoIsAtWrongFormat';

@Injectable()
export class ValidateBoletoTypedLineFormatPipe implements PipeTransform {
  transform(typedLine: string): string {
    const onlyNumbersRegex = new RegExp('^[0-9]+$');
    if (!onlyNumbersRegex.test(typedLine))
      throw new ConsultedBoletoIsAtWrongFormat('deve conter apenas números');

    if (typedLine.length !== 47)
      throw new ConsultedBoletoIsAtWrongFormat('deve conter 47 caracteres');

    return typedLine;
  }
}
