export interface IPaymentSlipProcessingProvider {
  getBarCodeFromDigitableLine(digitableLine: string): string;
  retrieveDataFromBarCode(barCode: string): any;
  validateBarCode(barCode: string): boolean;
  validateDigitableLine(digitableLine: string): boolean;
}
