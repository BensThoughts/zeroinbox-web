import { environment as env } from '@env/environment';

export const
  MY_API_URL: string = 'http://' + env.apiHost + ':' + env.apiPort;