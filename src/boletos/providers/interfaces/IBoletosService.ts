import { Boleto } from '../../types/Boleto';

export interface IBoletosService {
  getBoleto(digitableLine: string): Boleto;
}
