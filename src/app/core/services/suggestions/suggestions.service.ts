import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { API_URL } from '../apiurl';

export interface SuggestionsResponse {
    status: string,
    status_message: string,
    data: {
      suggestions: {
        senderIds: string[]
      }
    }
}

@Injectable()
export class SuggestionsService {

  constructor(private httpClient: HttpClient) {}

  public getSuggestions(): Observable<SuggestionsResponse> {
    return this.httpClient.get<SuggestionsResponse>(API_URL + '/suggestions', {
      withCredentials: true
    });
  }

}