import { BadRequestException } from '@nestjs/common';

export class ConsultedBoletoIsAtWrongFormat extends BadRequestException {
  constructor(messageDescription: string) {
    super('Formato inválido: ' + messageDescription);
  }
}
