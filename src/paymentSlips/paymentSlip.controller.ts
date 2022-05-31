import { Controller, Get, Param } from '@nestjs/common';

import { PaymentSlipService } from './providers/paymentSlips.service';

import { ValidatePaymentSlipDigitableLineFormatPipe } from './providers/validate-slip-digitable-line-format.pipe';

import { IConsultPaymentSlipResponseDTO } from './DTOs/consultPaymentSlip';

@Controller('boleto')
export class PaymentSlipController {
  constructor(private paymentSlipService: PaymentSlipService) {}

  @Get('/:digitable_line')
  consultPaymentSlip(
    @Param('digitable_line', new ValidatePaymentSlipDigitableLineFormatPipe())
    digitableLine: string,
  ): IConsultPaymentSlipResponseDTO {
    const paymentSlip = this.paymentSlipService.getPaymentSlip(digitableLine);

    return { ...paymentSlip, amount: paymentSlip.amount.toFixed(2) };
  }
}
