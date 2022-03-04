import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpAdapterHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly adaptorHost: HttpAdapterHost) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const body =
      typeof exception.getResponse() === 'string'
        ? {
            message: exception.getResponse(),
          }
        : {
            ...(exception.getResponse() as Object),
          };

    this.adaptorHost.httpAdapter.reply(
      response,
      {
        ...body,
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
      },
      httpStatus,
    );
  }
}
