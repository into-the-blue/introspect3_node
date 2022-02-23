export const isDev = process.env.ENV === 'dev';

export const sleep = (time: number): Promise<undefined> =>
  new Promise((resolve) => setTimeout(resolve, time));
