import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '../apiurl';

export interface AuthUrlResponse {
  status: string;
  status_message: string;
  data: {
    auth_url: string;
  }
}

@Injectable()
export class AuthService {
    // Authentication navigation
    private _onAuthSuccessUrl = '/admin-panel/home';
    private _onAuthFailureUrl = '/login';
    private _logoutUrl = '/login';

    constructor(private httpClient: HttpClient) { }

    get authSuccessUrl(): string {
      return this._onAuthSuccessUrl;
    }

    get authFailureUrl(): string {
      return this._onAuthFailureUrl;
    }

    get logoutUrl(): string {
      return this._logoutUrl;
    }

    /**
     * [signIn description]
     * @return [description]
     */
    public signIn() {
      return this.httpClient.get<AuthUrlResponse>(API_URL + '/oauth2init');
    }

    public logout() {
      this.httpClient.get(API_URL + '/logout', {
        withCredentials: true
      }).subscribe((response) => {

      })
    }

}