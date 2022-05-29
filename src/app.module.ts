import { Module } from '@nestjs/common';
import { BoletoController } from './boletos/boletos.controller';

@Module({
  controllers: [BoletoController],
})
export class AppModule {}
