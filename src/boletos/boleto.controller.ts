import { Controller, Get, Param } from '@nestjs/common';

import { IConsultBoletoResponseDTO } from './DTOs/consultBoleto';

@Controller('boleto')
export class BoletoController {
  @Get('/:typed-line')
  consultBoleto(
    @Param('typed-line') typedLine: string,
  ): IConsultBoletoResponseDTO {
    return {
      barCode: '21299758700000020000001121100012100447561740',
      amount: 20.0,
      expirationDate: '2018-07-16',
    };
  }
}
