import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './api/image/image.module';
@Module({
  imports: [ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
