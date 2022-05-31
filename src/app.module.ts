import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { BoletoProcessingProvider } from './boletos/providers/BoletoProcessingProvider';
import { BoletoService } from './boletos/providers/boletos.service';

import { BoletoController } from './boletos/boleto.controller';

import { HttpExceptionFilter } from './common/http-exception.filter';

@Module({
  controllers: [BoletoController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    BoletoService,
    BoletoProcessingProvider,
  ],
})
export class AppModule {}
