import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { BoletoProcessingProvider } from './boletos/providers/BoletoProcessingProvider';

import { BoletoController } from './boletos/boleto.controller';

import { HttpExceptionFilter } from './common/http-exception.filter';

@Module({
  controllers: [BoletoController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    BoletoProcessingProvider,
  ],
})
export class AppModule {}
