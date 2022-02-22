import { Logger } from '@/modules/logger/logger.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ImageService {
  constructor(private logger: Logger) {
    this.logger.setContext('ImageService');
  }
  getRandom() {
    this.logger.log('GET RANDOM');
    return '';
  }
}
