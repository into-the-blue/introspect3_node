import { Logger } from '@/modules/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '@/modules/mongo/entities/image.entity';
import { MongoRepository } from 'typeorm';
import { Unsplash } from '@/service/unsplash';
import { IntroImageUnsplashRaw } from '@/types/server.type';
@Injectable()
export class ImageService {
  constructor(
    private logger: Logger,
    @InjectSentry() private sentry: SentryService,
    @InjectRepository(ImageEntity)
    private imageCol: MongoRepository<ImageEntity>,
  ) {
    this.logger.setContext('ImageService');
  }
  async getRandom() {
    return new BadRequestException();
  }

  async getAndSaveRandomUnsplashImage() {
    const images = await Unsplash.getRandom();
    return await this.saveToDB(images);
  }
  async saveToDB(imgs: IntroImageUnsplashRaw[]): Promise<ImageEntity[]> {
    const res = await this.imageCol.save(imgs);
    return res;
  }
}
