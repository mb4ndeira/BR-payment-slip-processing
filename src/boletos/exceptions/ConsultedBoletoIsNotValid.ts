import { BadRequestException } from '@nestjs/common';

export class ConsultedBoletoIsNotValid extends BadRequestException {
  constructor(messageDescription: string) {
    super('Boleto inválido: ' + messageDescription);
  }
}
