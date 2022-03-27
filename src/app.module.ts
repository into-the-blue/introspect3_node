import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './api/image/image.module';
import * as Sentry from '@sentry/node';
import { TraceMiddleware } from './middlewares/';
import { isDev } from './utils';
import { LoggerModule } from './modules/logger/logger.module';
import { MongoModule } from './modules/mongo/mongo.module';
import { ENV_VARS } from '@/configs/env';

const sentryModule = SentryModule.forRoot({
  tracesSampleRate: 1,
  dsn: ENV_VARS.SENTRY_DSN,
  debug: isDev,
  environment: ENV_VARS.ENV,
  release: ENV_VARS.RELEASE, // must create a release in sentry.io dashboard
  logLevels: isDev ? ['debug'] : ['error', 'warn'], //based on sentry.io loglevel
  close: {
    enabled: true,
  },
  integrations: [new Sentry.Integrations.Http({ tracing: true })],
});
@Module({
  imports: [sentryModule, ImageModule, LoggerModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware).forRoutes('/');
  }
}
