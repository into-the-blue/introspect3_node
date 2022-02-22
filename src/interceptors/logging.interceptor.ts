import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, finalize } from 'rxjs';
import { LOGGER } from '@/modules/logger/logger.service';
import { Request } from 'express';

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
      finalize(() => {
        const duration = +new Date() - startTime;
        LOGGER.log(`${req.method} ${req.url} ${duration}ms`);
      }),
    );
  }
}
