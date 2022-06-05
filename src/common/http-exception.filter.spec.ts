import { Test, TestingModule } from '@nestjs/testing';
import {
  Controller,
  HttpException,
  Get,
  INestApplication,
} from '@nestjs/common';
import request from 'supertest';

import { HttpExceptionFilter } from './http-exception.filter';

@Controller('throw')
class MockThrowingController {
  @Get('/generic')
  throwGenericError() {
    throw new Error('Generic error');
  }

  @Get('/http-exception')
  throwHttpException() {
    throw new HttpException({}, 500);
  }

  @Get('/custom-http-exception')
  throwCustomHttpException() {
    throw new HttpException(
      {
        statusCode: 400,
        message: 'Invalid request: error description',
        error: 'Bad Request',
        timestamp: new Date().toISOString(),
      },
      400,
    );
  }
}

describe('PaymentSlipsService', () => {
  let app: INestApplication;
  let filter: HttpExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockThrowingController],
      providers: [HttpExceptionFilter],
    }).compile();

    app = module.createNestApplication();
    filter = module.get<HttpExceptionFilter>(HttpExceptionFilter);

    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should filter generic errors correctly', async () => {
    console.error = jest.fn();

    await request(app.getHttpServer())
      .get('/throw/generic')
      .expect(500)
      .then((response) =>
        expect(response.body).toEqual({
          statusCode: 500,
          error: 'Internal server error',
          timestamp: response.header.date,
        }),
      );

    expect(console.error).toHaveBeenCalledWith(new Error('Generic error'));
  });

  it('should filter HttpException instances correctly', async () => {
    console.warn = jest.fn();

    await request(app.getHttpServer())
      .get('/throw/http-exception')
      .expect(500)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 500,
          timestamp: response.header.date,
        });
      });

    expect(console.warn).toHaveBeenCalledWith(
      'Weakly typed 500 HttpException for: GET /throw/http-exception (missing error message, missing error description)',
    );
  });

  it('should filter custom HttpException instances correctly', async () => {
    await request(app.getHttpServer())
      .get('/throw/custom-http-exception')
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({
          error: 'Bad Request',
          message: 'Invalid request: error description',
          statusCode: 400,
          timestamp: response.header.date,
        });
      });
  });
});
