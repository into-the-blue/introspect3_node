import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './api/image/image.module';
import { TraceMiddleware } from './middlewares/';
import { LoggerModule } from './modules/logger/logger.module';
import { MongoModule } from './modules/mongo/mongo.module';
import { MySentryModule } from './modules/sentry/sentry.module';
@Module({
  imports: [MySentryModule, ImageModule, LoggerModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware).forRoutes('/');
  }
}
