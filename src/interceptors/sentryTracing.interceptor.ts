import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { finalize, Observable } from 'rxjs';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';

@Injectable()
export class SentryTracingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const transaction = Sentry.startTransaction({
      op: 'request',
      name: `${req.method} ${req.url}`,
    });
    Sentry.getCurrentHub().configureScope((scope) => {
      scope.addEventProcessor((event) => {
        event.request = {
          method: req.method,
          url: req.url,
        };
        return event;
      });
    });
    Sentry.configureScope((scope) => {
      scope.setSpan(transaction);
    });
    return next.handle().pipe(
      finalize(() => {
        const res = ctx.getResponse<Response>();
        // cannot get status code in an interceptor
        transaction.setHttpStatus(res.statusCode);
        transaction.finish();
      }),
    );
  }
}
