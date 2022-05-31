import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { PaymentSlipsModule } from './paymentSlips/payment-slips.module';

import { HttpExceptionFilter } from './common/http-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  imports: [PaymentSlipsModule],
})
export class AppModule {}
