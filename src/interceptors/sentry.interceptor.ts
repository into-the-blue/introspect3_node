import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError, catchError } from 'rxjs';
import * as Sentry from '@sentry/node';
@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        Sentry.captureException(err);
        return throwError(() => err);
      }),
    );
  }
}
