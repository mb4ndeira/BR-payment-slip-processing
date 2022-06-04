import { ValidatePaymentSlipDigitableLineFormatPipe } from './validate-slip-digitable-line-format.pipe';

import { ConsultedPaymentSlipIsAtWrongFormat } from '../exceptions/ConsultedSlipIsAtWrongFormat';

describe('ValidatePaymentSlipDigitableLineFormatPipe', () => {
  it('should be defined', () => {
    expect(new ValidatePaymentSlipDigitableLineFormatPipe()).toBeDefined();
  });

  it('should validate digitable line format', () => {
    expect(
      new ValidatePaymentSlipDigitableLineFormatPipe().transform(
        '21290001192110001210904475617405975870000002000',
      ),
    ).toEqual('21290001192110001210904475617405975870000002000');
  });

  it('should throw exception for digitable line that does not only contain numbers', () => {
    expect(() => {
      new ValidatePaymentSlipDigitableLineFormatPipe().transform(
        '2129000119211000121090447561740597587000000200a',
      );
    }).toThrow(
      new ConsultedPaymentSlipIsAtWrongFormat('deve conter apenas números'),
    );
  });

  it('should throw exception for digitable line with wrong length', () => {
    expect(() => {
      new ValidatePaymentSlipDigitableLineFormatPipe().transform(
        '2129000119211000121090447561740597587000000200',
      );
    }).toThrow(
      new ConsultedPaymentSlipIsAtWrongFormat('deve conter de 47 a 48 dígitos'),
    );
  });
});
