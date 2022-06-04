import { Test, TestingModule } from '@nestjs/testing';

import { PaymentSlipProcessing } from './index';

describe('PaymentSlipProcessing', () => {
  let provider: PaymentSlipProcessing;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentSlipProcessing],
    }).compile();

    provider = module.get<PaymentSlipProcessing>(PaymentSlipProcessing);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should retrieve data from digitable line', () => {
    expect(
      provider.retrieveDataFromDigitableLine(
        '21290001192110001210904475617405975870000002000',
      ),
    ).toEqual({
      type: 'conventional',
      barCode: '21299758700000020000001121100012100447561740',
    });
  });

  it('should retrieve data from conventional payment slip barcode', () => {
    expect(
      provider.retrieveDataFromBarCode(
        '21299758700000020000001121100012100447561740',
        'conventional',
      ),
    ).toEqual({
      amount: 20,
      expirationDate: new Date(1531699200000),
    });
  });

  it('should retrieve data from collection payment slip barcode', () => {
    expect(
      provider.retrieveDataFromBarCode(
        '84670000001435900240200240500024384221010811',
        'collection',
      ),
    ).toEqual({
      amount: 143.59,
      expirationDate: null,
    });
  });

  it('should validate a digitable line', () => {
    expect(
      provider.validateDigitableLine(
        '21290001192110001210904475617405975870000002000',
      ),
    ).toEqual(true);
  });

  it('should not validate an invalid digitable line', () => {
    expect(
      provider.validateDigitableLine(
        '31290001192110001210904475617405975870000002000',
      ),
    ).not.toEqual(true);
  });

  it('should validate a barcode', () => {
    expect(
      provider.validateBarCode(
        '21299758700000020000001121100012100447561740',
        'conventional',
      ),
    ).toEqual(true);
  });

  it('should not validate an invalid barcode', () => {
    expect(
      provider.validateBarCode(
        '21299758700000020000001121100012100447561741',
        'conventional',
      ),
    ).not.toEqual(true);
  });

  it('should validate a collection payment slip amount identifier', () => {
    expect(
      provider.validateCollectionSlipAmountIdentifier(
        '84670000001435900240200240500024384221010811',
      ),
    ).toEqual(true);
  });

  it('should not validate an invalid collection payment slip amount identifier', () => {
    expect(
      provider.validateCollectionSlipAmountIdentifier(
        '84570000001435900240200240500024384221010811',
      ),
    ).not.toEqual(true);
  });
});
