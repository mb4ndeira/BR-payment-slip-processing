import { Module } from '@nestjs/common';

import { PaymentSlipProcessing } from './providers/paymentSlipProcessing';
import { PaymentSlipService } from './providers/paymentSlips.service';

import { PaymentSlipController } from './controllers/paymentSlip.controller';

@Module({
  controllers: [PaymentSlipController],
  providers: [PaymentSlipService, PaymentSlipProcessing],
})
export class PaymentSlipsModule {}
