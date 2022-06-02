import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorResponse } from './Types/ErrorResponseObject';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response<ErrorResponse> = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const { statusCode, message, error } =
        exception.getResponse() as Partial<ErrorResponse>;
      const status = statusCode || exception.getStatus();

      const errorResponseObject: ErrorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
      };
      if (message !== undefined) errorResponseObject.message = message;
      if (error !== undefined) errorResponseObject.error = error;

      if ((message || error) === undefined) {
        const weakInstancesWarning = `Weakly typed ${status} HttpException for: ${
          request.method
        } ${request.url} (${message === undefined && 'missing error message'}${
          (message && error) === undefined && ','
        } ${error === undefined && 'missing error description'})`;

        console.warn(weakInstancesWarning);
      }

      response.status(status).json(errorResponseObject);
      return;
    }

    console.error(exception);

    response.status(500).json({
      statusCode: 500,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
}
