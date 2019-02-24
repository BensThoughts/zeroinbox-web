import {Injectable, NgZone} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BasicProfile, EmailProfile } from '../../state/user/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';

import { MY_API_URL } from '../myapiurl';

export interface AuthUrlResponse {
  status: string;
  status_message: string;
  data: {
    auth_url: string;
  }
}

export interface BasicProfileResponse {
  status: string;
  status_message: string;
  data: {
    basic_profile: BasicProfile;
  }
}

export interface EmailProfileResponse {
  status: string;
  status_message: string;
  data: {
    email_profile: EmailProfile;
  }
}



@Injectable()
export class AuthUserService {
    private MY_API_URL = MY_API_URL;

    // Authentication navigation
    private _onAuthSuccessUrl = '/admin-panel/home';
    private _onAuthFailureUrl = '/login';
    private _logoutUrl = '/login';

    constructor(private ngZone: NgZone,
                private httpClient: HttpClient,
                private store: Store<AppState>) {

    }

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
      this.httpClient.get<AuthUrlResponse>(this.MY_API_URL + '/oauth2init').subscribe((response) => {
        console.log(response);
        if (response.status === 'error') {
          console.error('Response status_message: ' + response.status_message);
        } else {
          console.log('Response status_message: ' + response.status_message);
          window.location.href = response.data.auth_url;
        }
      })

    }

    public logout() {
      this.httpClient.get(this.MY_API_URL + '/logout', {
        withCredentials: true
      }).subscribe((response) => {
        console.log(response);
      })
    }

    /**
     * [getBasicProfile description]
     * @return [description]
     */
    public getBasicProfile() {
      return this.httpClient.get<BasicProfileResponse>(this.MY_API_URL + '/profile', {
        withCredentials: true
      });
    }

    /**
     * [getEmailProfile description]
     * @return [description]
     */
    public getEmailProfile() {
      return this.httpClient.get<EmailProfileResponse>(this.MY_API_URL + '/email', {
        withCredentials: true
      });
    }


}