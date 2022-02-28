import { createApi } from 'unsplash-js';
import { RequestInfo, RequestInit } from 'node-fetch';

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import('node-fetch').then(({ default: fetch }) => fetch(url, init));

export const Unsplash = createApi({
  fetch: fetch as any,
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});
