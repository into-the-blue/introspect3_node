import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '@/modules/mongo/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
