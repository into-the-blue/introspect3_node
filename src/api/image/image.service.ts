import { Logger } from '@/modules/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
@Injectable()
export class ImageService {
  constructor(
    private logger: Logger,
    @InjectSentry() private sentry: SentryService,
  ) {
    this.logger.setContext('ImageService');
  }
  async getRandom() {
    return 'random';
  }

  async getRandomUnsplashImage() {}
}
