import { BadRequestException } from '@nestjs/common';

export class ConsultedPaymentSlipIsAtWrongFormat extends BadRequestException {
  constructor(messageDescription: string) {
    super('Formato inválido: ' + messageDescription);
  }
}
