import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { AppState } from '@app/core/state/core.state';
import { Store } from '@ngrx/store';

import { API_URL } from '../apiurl';


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

    constructor(private httpClient: HttpClient) {}

    public getFirstRunStatus(): Observable<FirstRunStatus> {
      return this.httpClient.get<FirstRunStatus>(API_URL + '/loadSuggestions', {
        withCredentials: true
      });
    }

    public getLoadingStatus(): Observable<LoadingStatus> {
      return this.httpClient.get<LoadingStatus>(API_URL + '/loadingStatus', {
        withCredentials: true
      });
    }

    public getSuggestions(): Observable<SuggestionsResponse> {
      return this.httpClient.get<SuggestionsResponse>(API_URL + '/suggestions', {
        withCredentials: true
      });
    }
}
