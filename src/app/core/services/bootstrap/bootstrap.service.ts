import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { AppState } from '@app/core/state/core.state';
import { Store } from '@ngrx/store';

import { MY_API_URL } from '../myapiurl';

export interface GapiRequest {
  body?: Array<string>;
}

export interface ThreadIdsResponse {
  threadIds: Array<string>;
}

export interface LoadingStatus {
  status: string,
  status_message: string,
  data: {
    loading_status: boolean;
  }
}

export interface FirstRunStatus {
  status: string,
  status_message: string,
  data: {
    firstRun: boolean;
  }
}


export interface ISuggestionResponse {
      senderId: string;
      senderAddress: string;
      senderNames: Array<string>;
      count: number;
      totalSizeEstimate: number;
}

export interface SuggestionsResponse {
  status: string,
  status_message: string,
  data: {
    suggestions: ISuggestionResponse[]
  }
}

@Injectable()
export class BootstrapService {

    private readonly API_URL: string = 'https://www.googleapis.com/gmail/v1/users';
    private readonly BATCH_API_URL: string = 'https://www.googleapis.com/batch/gmail/v1';

    constructor(private httpClient: HttpClient, private store: Store<AppState>) {}

    private MY_API_URL = MY_API_URL;

    public getFirstRunStatus(): Observable<FirstRunStatus> {
      return this.httpClient.get<FirstRunStatus>(this.MY_API_URL + '/loadSuggestions', {
        withCredentials: true
      });
    }

    public getLoadingStatus(): Observable<LoadingStatus> {
      return this.httpClient.get<LoadingStatus>(this.MY_API_URL + '/loadingStatus', {
        withCredentials: true
      });
    }

    public getSuggestions(): Observable<SuggestionsResponse> {
      return this.httpClient.get<SuggestionsResponse>(this.MY_API_URL + '/suggestions', {
        withCredentials: true
      });
    }
}
