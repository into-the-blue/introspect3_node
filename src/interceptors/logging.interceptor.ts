import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Logger, LOGGER } from '@/modules/logger/logger.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const startTime = +new Date();
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    // const resp = ctx.getResponse<Response>();
    return next.handle().pipe(
      tap(() => {
        const duration = +new Date() - startTime;
        LOGGER.log(`${req.method} [200] ${req.url} ${duration}ms`);
      }),
      catchError((err) => {
        const duration = +new Date() - startTime;
        LOGGER.log(
          `${req.method} [${err.status || 500}] ${req.url} ${duration}ms`,
        );
        return throwError(() => err);
      }),
    );
  }
}
