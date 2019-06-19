import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { API_URL } from '../apiurl';
import { Category } from '../../state/settings/category.model';

/* export type ActionType = 
  | 'label'
  | 'delete'
  | 'unsubscribe'
export interface ActionsRequestBody {
  senderIds: string[];
  actionType: ActionType;
  labelName?: string;
  category?: string;
  filter?: boolean;
  unsubscribeEmail?: string;
  unsubscribeWeb?: string;
}

export interface ActionsResponse {
  status: string,
  status_message: string,
} */

export interface GetCategoriesResponse {
  status: string,
  status_code: number,
  status_message: string,
  data: {
    categories: Category[]
  }
}

@Injectable()
export class SettingsService {

    constructor(private httpClient: HttpClient) {}

    public getCategories(): Observable<GetCategoriesResponse> {
      return this.httpClient.get<GetCategoriesResponse>(API_URL + '/settings/categories', {
        withCredentials: true,
      });
    }

}