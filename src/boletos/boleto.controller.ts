import { Controller, Get, Param } from '@nestjs/common';

import { BoletoService } from './providers/boletos.service';

import { ValidateBoletoDigitableLineFormatPipe } from './validate-boleto-typed-line-format.pipe';

import { IConsultBoletoResponseDTO } from './DTOs/consultBoleto';

@Controller('boleto')
export class BoletoController {
  constructor(private boletoService: BoletoService) {}

  @Get('/:digitable_line')
  consultBoleto(
    @Param('digitable_line', new ValidateBoletoDigitableLineFormatPipe())
    digitableLine: string,
  ): IConsultBoletoResponseDTO {
    const boleto = this.boletoService.getBoleto(digitableLine);

    return { ...boleto, amount: boleto.amount.toFixed(2) };
  }
}
