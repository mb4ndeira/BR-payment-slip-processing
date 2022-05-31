import { Module } from '@nestjs/common';

import { PaymentSlipProcessingProvider } from './providers/PaymentSlipProcessingProvider';
import { PaymentSlipService } from './providers/paymentSlips.service';

import { PaymentSlipController } from './controllers/paymentSlip.controller';

@Module({
  controllers: [PaymentSlipController],
  providers: [PaymentSlipService, PaymentSlipProcessingProvider],
})
export class PaymentSlipsModule {}
