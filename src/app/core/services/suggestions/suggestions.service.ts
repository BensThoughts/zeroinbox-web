import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { API_URL } from '../apiurl';
import { ISuggestion } from '../../../admin-panel/suggestions/model/suggestions.model';

export interface SuggestionsResponse {
    status: string,
    status_message: string,
    data: {
      suggestions: ISuggestion[]
    }
}

export interface SuggestionsPostResponse {
  status: string,
  status_message: string,
}

@Injectable()
export class SuggestionsService {

  constructor(private httpClient: HttpClient) {}

  public getSuggestions(): Observable<SuggestionsResponse> {
    return this.httpClient.get<SuggestionsResponse>(API_URL + '/suggestions', {
      withCredentials: true
    });
  }

  public postSuggestions(body): Observable<SuggestionsPostResponse> {
    
    return this.httpClient.post<SuggestionsPostResponse>(API_URL + '/suggestions', body, {
      withCredentials: true
    });
  }

}