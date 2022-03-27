import { Logger } from '@/modules/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '@/modules/mongo/entities/image.entity';
import { MongoRepository } from 'typeorm';
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

  async getRandomUnsplashImage() {
    //
  }
}
