import { Module } from '@nestjs/common';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { ENV_VARS } from '@/configs/env';
import { isDev } from '@/utils';
import * as Sentry from '@sentry/node';

@Module({
  imports: [
    SentryModule.forRoot({
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
    }),
  ],
})
export class MySentryModule {}
