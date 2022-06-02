import { Controller, Get, Param } from '@nestjs/common';

import { PaymentSlipService } from '../providers/paymentSlips.service';

import { ValidatePaymentSlipDigitableLineFormatPipe } from '../providers/validate-slip-digitable-line-format.pipe';

import { ConsultPaymentSlipResponseDTO } from '../DTOs/consultPaymentSlip';

@Controller('boleto')
export class PaymentSlipController {
  constructor(private paymentSlipService: PaymentSlipService) {}

  @Get('/:digitable_line')
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

    return {
      ...paymentSlip,
      ...(paymentSlip.amount && { amount: paymentSlip.amount.toFixed(2) }),
    };
  }
}
