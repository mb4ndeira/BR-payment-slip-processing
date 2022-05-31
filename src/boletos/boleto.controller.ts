import { Controller, Get, Param } from '@nestjs/common';

import { BoletoService } from './providers/boletos.service';

import { ValidateBoletoTypedLineFormatPipe } from './validate-boleto-typed-line-format.pipe';

import { IConsultBoletoResponseDTO } from './DTOs/consultBoleto';

@Controller('boleto')
export class BoletoController {
  constructor(private boletoService: BoletoService) {}

  @Get('/:typed_line')
  consultBoleto(
    @Param('typed_line', new ValidateBoletoTypedLineFormatPipe())
    typedLine: string,
  ): IConsultBoletoResponseDTO {
    const boleto = this.boletoService.getBoleto(typedLine);

    return { ...boleto, amount: boleto.amount.toFixed(2) };
  }
}
