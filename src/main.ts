import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from './pipes';
import { LoggingInterceptor } from './interceptors';
import { LOGGER } from './modules/logger/logger.service';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { HttpExceptionFilter } from './exceptionFilters/http.exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  app.enableShutdownHooks();
  // log api execution time
  app.useGlobalInterceptors(new LoggingInterceptor());
  // validate input
  app.useGlobalPipes(new ValidationPipe());
  // sentry capture exception
  app.useGlobalInterceptors(new SentryInterceptor());
  // setup default logger
  app.useLogger(LOGGER);
  // setup global filter
  app.useGlobalFilters(new HttpExceptionFilter(app.get(HttpAdapterHost)));
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
