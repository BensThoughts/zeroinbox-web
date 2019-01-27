import {Injectable, NgZone} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BasicProfile, EmailProfile } from '../../state/user/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { LoadBasicProfileAction, LoadEmailProfileAction } from '@app/core/state/user/user.actions';

import { MY_API_URL } from '../myapiurl';

export interface AuthUrlResponse {
  authUrl: string;
}

export interface BasicProfileResponse {
  basic_profile: BasicProfile
}

export interface BasicEmailResponse {
  email_profile: EmailProfile
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
    // private readonly MY_API_URL: string = 'http://127.0.0.1:8080';
    // private readonly MY_API_URL: string = 'https://us-central1-labelorganizer.cloudfunctions.net/googleApi';

    public signIn() {
      this.httpClient.get<AuthUrlResponse>(this.MY_API_URL + '/oauth2init').subscribe((response) => {
        console.log(response);
        window.location.href = response.authUrl;
      })

    }

    public logout() {
      // this.deleteCookie('connect.sid');
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
      // .subscribe((response) => {

      // });
    }

    /**
     * [getEmailProfile description]
     * @return [description]
     */
    public getEmailProfile() {
      return this.httpClient.get<BasicEmailResponse>(this.MY_API_URL + '/email', {
        withCredentials: true
      });
      // .subscribe((response) => {
      //   this.store.dispatch(new LoadEmailProfileAction(response.email_profile));
      // });
    }


}



/*******************************************************************************
*******************************************************************************/


// export const ACCESS_TOKEN_KEY = 'ACCESS.TOKEN.KEY';
    // gapiAuthService$ = this.googleAuthService.getAuth();


// get getCurrentUser(): GoogleUser {
//     return this.user;
// }
/**
public getToken(): string {
    const token: string = localStorage.getItem(ACCESS_TOKEN_KEY);
    // let token = this._accessToken;
    if (!token) {
        throw new Error('no token set , authentication required');
    }
    return token;
}
**/

/**
  this.gapiAuthService$.subscribe(
    (auth) => {
      auth.signIn().catch((err) => this.signInErrorHandler(err));
    },
    (err) => {
      this.signInErrorHandler(err);
    }
  );
  // .subscribe((auth) => {
  //    auth.signIn()//.then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
  // });
  **/


    /**
     * [refreshAuthToken refreshes the google]
     * @return [description]
     */

    /**
    public checkAuthenticationRefresh() {
      if (this._expiresAt < Date.now()) {
        this.refreshAuthToken();
      }
    }

    private refreshAuthToken() {
      this.googleAuthService.getAuth().subscribe((user) => {
        user.currentUser.get().reloadAuthResponse()
        .then((res) => this.resetAuthTokenSuccess(res), (err) => this.signInErrorHandler(err));
      });
    }

    private resetAuthTokenSuccess(res: AuthResponse) {
      console.log(res);
    }


}


/**
    public signInSuccessHandler(res: AuthResponse) {
        // console.log(res);
        this.ngZone.run(() => {
            // this.user = res;
            // Set flag in local storage stating this app is logged in
            localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token);
            // this._accessToken = res.getAuthResponse().access_token;
        });
    }
**/
/**

    private signInErrorHandler(err) {
        console.warn(err);
        return err;
    }

    /**
     * [signOut description]
     */
    // TODO: Rework
/**
    public signOut(): void {
        this.gapiAuthService$.subscribe((auth) => {
            try {
                auth.signOut();
            } catch (e) {
                console.error(e);
            }
            // this.user = undefined;
            localStorage.removeItem(ACCESS_TOKEN_KEY);
        });
    }

**/
