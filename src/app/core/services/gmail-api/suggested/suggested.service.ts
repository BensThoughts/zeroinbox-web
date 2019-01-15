import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, from, pipe } from 'rxjs';
import { map, catchError, concatMap, tap } from 'rxjs/operators';
import { AppState } from '@app/core/state/core.state';
import { Store } from '@ngrx/store';
import { ISuggested } from '@app/core/state/gmail-api/models/suggested.model';
import { Md5 } from 'ts-md5/dist/md5';
// import { GapiToken } from '@app/core/state/auth/auth.reducer';

import { MY_API_URL } from '../../myapiurl';

export interface GapiRequest {
  body?: Array<String>;
}

export interface ThreadIdsResponse {
  threadIds: Array<string>;
}

@Injectable()
export class SuggestedService {

    private readonly API_URL: string = 'https://www.googleapis.com/gmail/v1/users';
    private readonly BATCH_API_URL: string = 'https://www.googleapis.com/batch/gmail/v1';

    constructor(private httpClient: HttpClient, private store: Store<AppState>) {}


    // private readonly MY_API_URL: string = '	https://us-central1-labelorganizer.cloudfunctions.net/api';
    // private readonly MY_API_URL: string = 'http://127.0.0.1:8080';
    // private readonly MY_API_URL: string = 'https://us-central1-labelorganizer.cloudfunctions.net/googleApi';
    private MY_API_URL = MY_API_URL;

    public getAllThreadIds(gapiRequest: GapiRequest): Observable<ThreadIdsResponse>  {
      // return this.httpClient.post(this.MY_API_URL + '/threads', gapiRequest);
      return this.httpClient.get<ThreadIdsResponse>(this.MY_API_URL + '/threads', {
        // headers: {
        //  'Authorization': 'Bearer' + gapiRequest.token
        //}
        withCredentials: true
      });
    }

    public batchRequest(gapiRequest: GapiRequest) {
      return this.httpClient.post<ISuggested[]>(this.MY_API_URL + '/batch', gapiRequest, {
        withCredentials: true
      });
    }
}
