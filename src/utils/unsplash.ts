import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';

export const Unsplash = createApi({
  fetch: nodeFetch as any,
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});
