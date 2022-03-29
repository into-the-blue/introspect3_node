import { BadRequestException, Controller, Get, Req } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('random')
  getRandom(@Req() req) {
    return this.imageService.getRandom();
  }

  @Get('error')
  returnError() {
    return new BadRequestException();
  }

  @Get('get_and_save_unsplash_images')
  async getAndSaveUnsplash() {
    await this.imageService.getAndSaveRandomUnsplashImage();
    return 'ok';
  }
}
