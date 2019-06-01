import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { API_URL } from '../apiurl';


export interface ActionsRequestBody {
  senderIds: string[];
  actionType: string;
  labelName?: string;
  category?: string;
  filter?: boolean;
}

export interface ActionsResponse {
  status: string,
  status_message: string,
}

@Injectable()
export class ActionsService {

    constructor(private httpClient: HttpClient) {}

    public postActions(body: ActionsRequestBody): Observable<ActionsResponse> {
      return this.httpClient.post<ActionsResponse>(API_URL + '/actions', body, {
        withCredentials: true,
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
      });
    }
}