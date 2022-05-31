import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { PaymentSlipProcessingProvider } from './paymentSlips/providers/PaymentSlipProcessingProvider';
import { PaymentSlipService } from './paymentSlips/providers/paymentSlips.service';

import { PaymentSlipController } from './paymentSlips/paymentSlip.controller';

import { HttpExceptionFilter } from './common/http-exception.filter';

@Module({
  controllers: [PaymentSlipController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    PaymentSlipService,
    PaymentSlipProcessingProvider,
  ],
})
export class AppModule {}
