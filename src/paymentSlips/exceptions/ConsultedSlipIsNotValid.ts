import { BadRequestException } from '@nestjs/common';

export class ConsultedPaymentSlipIsNotValid extends BadRequestException {
  constructor(messageDescription: string) {
    super('Boleto inválido: ' + messageDescription);
  }
}
