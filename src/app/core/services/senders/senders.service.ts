import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { API_URL } from '../apiurl';


export interface ISendersResponse {
  senderId: string;
  senderAddress: string;
  senderNames: Array<string>;
  count: number;
  totalSizeEstimate: number;
  unsubscribeEmail: string;
  unsubscribeWeb: string;
  unsubscribed: boolean;
}

export interface SendersResponse {
  status: string,
  status_message: string,
  data: {
    suggestions: ISendersResponse[]
  }
}

@Injectable()
export class SendersService {

    constructor(private httpClient: HttpClient) {}

    public getSenders(): Observable<SendersResponse> {
      return this.httpClient.get<SendersResponse>(API_URL + '/senders', {
        withCredentials: true
      });
    }
}
