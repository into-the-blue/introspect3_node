import { BadRequestException, Controller, Get, Req, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Request, Response } from 'express';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('random')
  async getRandom(@Req() req: Request, @Res() res: Response) {
    const imgs = await this.imageService.getRandom();
    res.status(200).send(imgs);
  }

  @Get('error')
  returnError() {
    return new BadRequestException();
  }

  @Get('get_and_save_unsplash_images')
  async getAndSaveUnsplash(@Res() res: Response) {
    const imgs = await this.imageService.getAndSaveRandomUnsplashImage();
    res.status(200).send(imgs);
  }
}
