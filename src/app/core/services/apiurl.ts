import { environment as env } from '@env/environment';

export const
  API_URL: string = 'http://' + env.apiHost + ':' + env.apiPort;