import { Controller, Get, Req } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('/random')
  getRandom(@Req() req) {
    return 'image random';
  }
}