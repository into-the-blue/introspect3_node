import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from './pipes';
import { SentryInterceptor } from './interceptors';
import { SentryService } from '@ntegral/nestjs-sentry';
import { config } from 'dotenv';
import { resolve } from 'path';
config({
  path: resolve(__dirname, '..', 'dev.env'),
});

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  app.enableShutdownHooks();
  // app.useLogger(SentryService.SentryServiceInstance());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new SentryInterceptor());

  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
