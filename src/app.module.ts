import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { BoletoController } from './boletos/boleto.controller';

import { HttpExceptionFilter } from './common/http-exception.filter';

@Module({
  controllers: [BoletoController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
