import { Test, TestingModule } from '@nestjs/testing';

import { PaymentSlipProcessing } from './paymentSlipProcessing';

import { PaymentSlipsService } from './paymentSlips.service';

import { ConsultedPaymentSlipIsNotValid } from '../exceptions/ConsultedSlipIsNotValid';

import { IPaymentSlipProcessingProvider } from './interfaces/IPaymentSlipProcessingProvider';

describe('PaymentSlipsService', () => {
  let service: PaymentSlipsService;

  const examples = {
    validConventional: {
      type: 'conventional',
      digitableLine: '21290001192110001210904475617405975870000002000',
      barcode: '21299758700000020000001121100012100447561740',
    },
    conventionalWithInvalidField: {
      type: 'conventional',
      digitableLine: '31290001192110001210904475617405975870000002000',
      barcode: null,
    },
    conventionalWithInvalidBarcode: {
      type: 'conventional',
      digitableLine: '21290001192110001210904475617405975870000002001',
      barcode: '21299758700000020010001121100012100447561740',
    },
    collectionWithInvalidAmountIdentifier: {
      type: 'collection',
      digitableLine: '845700000019435900240209024050002435842210108119',
      barcode: '84570000001435900240200240500024384221010811',
    },
  };

  const mockPaymentSlipProcessing: IPaymentSlipProcessingProvider = {
    retrieveDataFromDigitableLine: (digitableLine: string) => {
      const { type, barcode } = Object.keys(examples)
        .map((key) => examples[key])
        .find((example) => example.digitableLine === digitableLine);

      return { type, barCode: barcode };
    },
    retrieveDataFromBarCode: () => ({
      amount: 20,
      expirationDate: new Date(1531699200000),
    }),
    validateDigitableLine: (digitableLine: string) =>
      digitableLine === examples['conventionalWithInvalidField'].digitableLine
        ? false
        : true,
    validateBarCode: (barcode: string) =>
      barcode === examples['conventionalWithInvalidBarcode'].barcode
        ? false
        : true,
    validateCollectionSlipAmountIdentifier: (barcode: string) =>
      barcode === examples['collectionWithInvalidAmountIdentifier'].barcode
        ? false
        : true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentSlipsService,
        {
          provide: PaymentSlipProcessing,
          useValue: mockPaymentSlipProcessing,
        },
      ],
    }).compile();

    service = module.get<PaymentSlipsService>(PaymentSlipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a payment slip', () => {
    expect(
      service.getPaymentSlip(examples['validConventional'].digitableLine),
    ).toEqual({
      type: 'conventional',
      barCode: '21299758700000020000001121100012100447561740',
      amount: '20.00',
      expirationDate: '2018-07-16',
    });
  });

  it('should throw exception when getting a payment slip with invalid field verifier', () => {
    expect(() => {
      service.getPaymentSlip(
        examples['conventionalWithInvalidField'].digitableLine,
      );
    }).toThrow(
      new ConsultedPaymentSlipIsNotValid(
        'dígito verificador de campo da linha digitável não corresponde',
      ),
    );
  });

  it('should throw exception when getting a payment slip with invalid barcode verifier', () => {
    expect(() => {
      service.getPaymentSlip(
        examples['conventionalWithInvalidBarcode'].digitableLine,
      );
    }).toThrow(
      new ConsultedPaymentSlipIsNotValid(
        'dígito verificador do código de barras não corresponde',
      ),
    );
  });

  it('should throw exception when getting a collection payment slip with invalid amount identifier character', () => {
    expect(() => {
      service.getPaymentSlip(
        examples['collectionWithInvalidAmountIdentifier'].digitableLine,
      );
    }).toThrow(
      new ConsultedPaymentSlipIsNotValid(
        'dígito identificador de valor efetivo ou referência inválido',
      ),
    );
  });
});
