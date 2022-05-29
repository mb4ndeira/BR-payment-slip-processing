import { Module } from '@nestjs/common';

import { BoletoController } from './boletos/boleto.controller';

@Module({
  controllers: [BoletoController],
})
export class AppModule {}
