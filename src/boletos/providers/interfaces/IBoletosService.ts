import { Boleto } from '../../types/Boleto';

export interface IBoletosService {
  getBoleto(typedLine: string): Boleto;
}
