import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { PaymentSlipsService } from '../providers/paymentSlips.service';

import { ValidatePaymentSlipDigitableLineFormatPipe } from '../providers/validate-slip-digitable-line-format.pipe';

import { ErrorResponse } from '../../common/Types/ErrorResponseObject';

import { ConsultPaymentSlipResponseDTO } from '../DTOs/consultPaymentSlip';

@Controller('boleto')
@ApiTags('Boletos')
export class PaymentSlipController {
  constructor(private paymentSlipService: PaymentSlipsService) {}

  @Get('/:digitable_line')
  @ApiOperation({
    summary: 'Consultar boleto',
    description:
      'Valida boleto a partir de linha digitável e retorna as suas respectivas informações disponíveis.',
  })
  @ApiBadRequestResponse({
    type: ErrorResponse,
    description:
      'Bad Request: Linha digitável inválida ou em formato incorreto.',
  })
  @ApiOkResponse({
    type: ConsultPaymentSlipResponseDTO,
    description: 'OK: Informações disponíveis do boleto processado.',
  })
  consultPaymentSlip(
    @Param('digitable_line', new ValidatePaymentSlipDigitableLineFormatPipe())
    digitableLine: string,
  ): ConsultPaymentSlipResponseDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...paymentSlip } =
      this.paymentSlipService.getPaymentSlip(digitableLine);

    Object.keys(paymentSlip).forEach((key) => {
      if (paymentSlip[key] === null) delete paymentSlip[key];
    });

    return paymentSlip;
  }
}
