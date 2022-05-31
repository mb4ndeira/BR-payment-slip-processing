export interface IBoletoProcessingProvider {
  getBarCodeFromDigitableLine(digitableLine: string): string;
  retrieveDataFromBarCode(barCode: string): any;
  validateBarCode(barCode: string): boolean;
  validateDigitableLine(digitableLine: string): boolean;
}
