import { Test, TestingModule } from '@nestjs/testing';

import { PaymentSlipsService } from '../providers/paymentSlips.service';

import { PaymentSlipController } from './paymentSlip.controller';

import { IPaymentSlipsService } from '../providers/interfaces/IPaymentSlipsService';

describe('PaymentSlipController', () => {
  let controller: PaymentSlipController;

  const mockPaymentSlipsService: IPaymentSlipsService = {
    getPaymentSlip: jest.fn(() => ({
      type: 'conventional',
      barcode: '21299758700000020000001121100012100447561740',
      amount: '20.00',
      expirationDate: '2018-07-16',
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentSlipController],
      providers: [PaymentSlipsService],
    })
      .overrideProvider(PaymentSlipsService)
      .useValue(mockPaymentSlipsService)
      .compile();

    controller = module.get<PaymentSlipController>(PaymentSlipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('consult a payment slip', () => {
    expect(
      controller.consultPaymentSlip(
        '21290001192110001210904475617405975870000002000',
      ),
    ).toEqual({
      barcode: '21299758700000020000001121100012100447561740',
      amount: '20.00',
      expirationDate: '2018-07-16',
    });
  });
});
