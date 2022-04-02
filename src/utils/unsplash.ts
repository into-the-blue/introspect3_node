import { createApi } from 'unsplash-js';
import { ENV_VARS } from '@/configs/env';
import nodeFetch from 'node-fetch';

// const fetch = (url: RequestInfo, init?: RequestInit) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(url, init));

export const UnsplashAPI = createApi({
  fetch: nodeFetch,
  accessKey: ENV_VARS.UNSPLASH_ACCESS_KEY,
});
