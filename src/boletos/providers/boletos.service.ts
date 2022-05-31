import { Injectable } from '@nestjs/common';

import { BoletoProcessingProvider } from './BoletoProcessingProvider';

import { ConsultedBoletoIsNotValid } from '../exceptions/ConsultedBoletoIsNotValid';

import { Boleto } from '../types/Boleto';

import { IBoletosService } from './interfaces/IBoletosService';

@Injectable()
export class BoletoService implements IBoletosService {
  constructor(private boletoProcessingProvider: BoletoProcessingProvider) {}
  getBoleto(digitableLine: string): Boleto {
    if (
      this.boletoProcessingProvider.validateDigitableLine(digitableLine) ===
      false
    )
      throw new ConsultedBoletoIsNotValid(
        'dígito verificador de campo da linha digitável não corresponde',
      );

    const barCode =
      this.boletoProcessingProvider.getBarCodeFromDigitableLine(digitableLine);

    if (this.boletoProcessingProvider.validateBarCode(barCode) === false)
      throw new ConsultedBoletoIsNotValid(
        'dígito verificador do código de barras não corresponde',
      );

    const { amount, expirationDate } =
      this.boletoProcessingProvider.retrieveDataFromBarCode(barCode);

    return {
      barCode,
      amount,
      expirationDate,
    };
  }
}
