import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { PaymentSlipsModule } from './../src/paymentSlips/payment-slips.module';

describe('PaymentSlipsControllers e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PaymentSlipsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /boleto/:digitable_line', () =>
    request(app.getHttpServer())
      .get('/boleto/21290001192110001210904475617405975870000002000')
      .expect(200)
      .expect({
        barCode: '21299758700000020000001121100012100447561740',
        amount: '20.00',
        expirationDate: '2018-07-16',
      }));
});
