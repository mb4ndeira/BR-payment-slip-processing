import { Controller, Get, Param } from '@nestjs/common';

import { ValidateBoletoTypedLineFormatPipe } from './validate-boleto-typed-line-format.pipe';

import { IConsultBoletoResponseDTO } from './DTOs/consultBoleto';

@Controller('boleto')
export class BoletoController {
  @Get('/:typed_line')
  consultBoleto(
    @Param('typed_line', new ValidateBoletoTypedLineFormatPipe())
    typedLine: string,
  ): IConsultBoletoResponseDTO {
    return {
      barCode: '21299758700000020000001121100012100447561740',
      amount: 20.0,
      expirationDate: '2018-07-16',
    };
  }
}
