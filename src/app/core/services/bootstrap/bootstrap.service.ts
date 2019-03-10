import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { AppState } from '@app/core/state/core.state';
import { Store } from '@ngrx/store';

import { API_URL } from '../apiurl';

export interface LoadingStatusResponse {
  status: string;
  status_message: string;
  data: {
    loadingStatus: boolean;
    percentLoaded: number;
  }
}

export interface LoadSuggestionsResponse {
  status: string;
  status_message: string;
}

export interface FirstRunStatusResponse {
  status: string;
  status_message: string;
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

    public getFirstRunStatus(): Observable<FirstRunStatusResponse> {
      return this.httpClient.get<FirstRunStatusResponse>(API_URL + '/firstRunStatus', {
        withCredentials: true
      });
    }

    public getLoadSuggestions(): Observable<LoadSuggestionsResponse> {
      return this.httpClient.get<LoadSuggestionsResponse>(API_URL + '/loadSuggestions', {
        withCredentials: true
      });
    }

    public getLoadingStatus(): Observable<LoadingStatusResponse> {
      return this.httpClient.get<LoadingStatusResponse>(API_URL + '/loadingStatus', {
        withCredentials: true
      });
    }

    public getSuggestions(): Observable<SuggestionsResponse> {
      return this.httpClient.get<SuggestionsResponse>(API_URL + '/senders', {
        withCredentials: true
      });
    }
}
