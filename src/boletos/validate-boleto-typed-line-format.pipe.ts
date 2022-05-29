import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateBoletoTypedLineFormatPipe implements PipeTransform {
  transform(typedLine: string): string {
    const onlyNumbersRegex = new RegExp('^[0-9]+$');
    if (!onlyNumbersRegex.test(typedLine))
      throw new BadRequestException(
        'Wrong boleto format: must only contain numbers',
      );

    if (typedLine.length !== 47)
      throw new BadRequestException(
        'Wrong boleto format: must contain 47 characters',
      );

    return typedLine;
  }
}
