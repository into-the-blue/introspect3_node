import { ENV_VARS } from '@/configs/env';

export const isDev = ENV_VARS.ENV === 'dev';

export const sleep = (time: number): Promise<undefined> =>
  new Promise((resolve) => setTimeout(resolve, time));
