import {Injectable, NgZone} from "@angular/core";
import {GoogleAuthService} from "ng-gapi/lib/GoogleAuthService";
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import AuthResponse = gapi.auth2.AuthResponse;
import { Observable, of, bindCallback } from 'rxjs';

import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/core.state';
import { LoginCompleteAction, LogoutAction } from '../../state/auth/auth.actions';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthUserService {
    //public static readonly SESSION_STORAGE_KEY: string = "accessToken";
    private _accessTokenKey = 'accessToken';

    private user: GoogleUser = undefined;

    // Track whether or not to renew token
    private _authFlag = 'isLoggedIn';
    // Authentication navigation
    private _onAuthSuccessUrl = '/admin-panel/home';
    private _onAuthFailureUrl = '/login';
    private _logoutUrl = '/login';
    private _expiresAt: number;

    gapiAuthService$ = this.googleAuthService.getAuth();

    constructor(private googleAuthService: GoogleAuthService,
                private ngZone: NgZone,
                private store: Store<AppState>) {

    }

    set setUser(user: GoogleUser) {
        this.user = user;
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

    get getCurrentUser(): GoogleUser {
        return this.user;
    }

    get isUserSignedIn(): boolean {
        return JSON.parse(localStorage.getItem(this._authFlag));
        //return !_.isEmpty(sessionStorage.getItem(this._accessTokenKey));
    }

    public getToken(): string {
        let token: string = sessionStorage.getItem(this._accessTokenKey);
        if (!token) {
            throw new Error("no token set , authentication required");
        }
        return sessionStorage.getItem(this._accessTokenKey);
    }


    /**
     * [signIn description]
     * @return [description]
     */
    public signIn() {
        this.gapiAuthService$.pipe(
        ).subscribe(
          (auth) => {
            auth.signIn().catch((err) => this.signInErrorHandler(err));
          },
          (err) => {
            this.signInErrorHandler(err);
          }
        )
        //.subscribe((auth) => {
        //   auth.signIn()//.then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
        //});
    }

    public signInSuccessHandler(res: GoogleUser) {
        console.log(res);
        this.ngZone.run(() => {
            this.user = res;
            // set the expiresAt value
            this._expiresAt = res.getAuthResponse().expires_at;
            // Set flag in local storage stating this app is logged in
            localStorage.setItem(this._authFlag, JSON.stringify(true));
            this.setAccessToken(res.getAuthResponse().access_token);
        });
    }


    private setAccessToken(accessToken: string) {
      sessionStorage.setItem(
        this._accessTokenKey, accessToken
      );
    }

    private signInErrorHandler(err) {
        console.warn(err);
        return err;
    }



    /**
     * [signOut description]
     */
    //TODO: Rework
    public signOut(): void {
        this.googleAuthService.getAuth().subscribe((auth) => {
            try {
                auth.signOut();
            } catch (e) {
                console.error(e);
            }
            this.user = undefined;
            sessionStorage.removeItem(this._accessTokenKey);
            localStorage.removeItem(this._authFlag);
        });
    }



    /**
     * [refreshAuthToken refreshes the google]
     * @return [description]
     */
    public checkAuthenticationRefresh() {
      if (this._expiresAt < Date.now())
        this.refreshAuthToken();
    }

    private refreshAuthToken() {
      this.googleAuthService.getAuth().subscribe((user) => {
        user.currentUser.get().reloadAuthResponse()
        .then((res) => this.resetAuthTokenSuccess(res), (err) => this.signInErrorHandler(err));
      });
    }

    private resetAuthTokenSuccess(res: AuthResponse) {

    }


}
