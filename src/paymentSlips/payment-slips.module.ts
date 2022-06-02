import { Module } from '@nestjs/common';

import { PaymentSlipProcessing } from './providers/paymentSlipProcessing';
import { PaymentSlipsService } from './providers/paymentSlips.service';

import { PaymentSlipController } from './controllers/paymentSlip.controller';

@Module({
  controllers: [PaymentSlipController],
  providers: [PaymentSlipsService, PaymentSlipProcessing],
})
export class PaymentSlipsModule {}
