import { createApi } from 'unsplash-js';
import { RequestInfo, RequestInit } from 'node-fetch';
import { ENV_VARS } from '@/configs/env';

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import('node-fetch').then(({ default: fetch }) => fetch(url, init));

export const Unsplash = createApi({
  fetch: fetch as any,
  accessKey: ENV_VARS.UNSPLASH_ACCESS_KEY,
});
