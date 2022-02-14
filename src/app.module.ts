import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './api/image/image.module';
import * as Sentry from '@sentry/node';
import { TraceMiddleware } from './middlewares/';
@Module({
  imports: [
    SentryModule.forRoot({
      tracesSampleRate: 1,
      dsn: process.env.SENTRY_DSN,
      debug: process.env.ENV === 'dev',
      environment: process.env.ENV,
      release: process.env.RELEASE, // must create a release in sentry.io dashboard
      logLevels: ['debug'], //based on sentry.io loglevel
      close: {
        enabled: true,
      },
      integrations: [new Sentry.Integrations.Http({ tracing: true })],
    }),
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware).forRoutes('/');
  }
}
