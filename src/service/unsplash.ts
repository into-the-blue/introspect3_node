import { UnsplashAPI } from '@/utils/unsplash';
import { IntroImageUnsplashRaw } from '@/types/server.type';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Random } from 'unsplash-js/dist/methods/photos/types';
export class Unsplash {
  static async getRandom(count = 10): Promise<IntroImageUnsplashRaw[]> {
    const res = (await UnsplashAPI.photos.getRandom({
      orientation: 'landscape',
      count,
    })) as ApiResponse<Random[]>;
    if (!res.response) throw new Error('unsplash empty response');
    return res.response.map((photo) => ({
      source: 'unsplash',
      imageUrl: photo.urls.regular,
      height: photo.height,
      width: photo.width,
      unsplashInfo: {
        color: photo.color,
        rawUrl: photo.urls.raw,
        authorName: photo.user.name,
        portfolioUrl: photo.user.portfolio_url,
        blurHash: photo.blur_hash,
        description: photo.description,
        origin: photo,
      },
    }));
  }
}
