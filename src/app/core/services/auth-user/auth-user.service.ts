import {Injectable, NgZone} from '@angular/core';
import {GoogleAuthService} from 'ng-gapi/lib/GoogleAuthService';
// import GoogleUser = gapi.auth2.GoogleUser;
// import GoogleAuth = gapi.auth2.GoogleAuth;
import AuthResponse = gapi.auth2.AuthResponse;

export const ACCESS_TOKEN_KEY = 'ACCESS.TOKEN.KEY';

@Injectable()
export class AuthUserService {
    // public static readonly SESSION_STORAGE_KEY: string = "accessToken";


    // Authentication navigation
    private _onAuthSuccessUrl = '/admin-panel/home';
    private _onAuthFailureUrl = '/login';
    private _logoutUrl = '/login';

    // Track whether or not to renew token
    private _expiresAt: number;
    // private user: GoogleUser = undefined;

    gapiAuthService$ = this.googleAuthService.getAuth();

    constructor(private googleAuthService: GoogleAuthService,
                private ngZone: NgZone) {

    }

    // set setUser(user: GoogleUser) {
    //     this.user = user;
    // }

    get authSuccessUrl(): string {
      return this._onAuthSuccessUrl;
    }

    get authFailureUrl(): string {
      return this._onAuthFailureUrl;
    }

    get logoutUrl(): string {
      return this._logoutUrl;
    }

    // get getCurrentUser(): GoogleUser {
    //     return this.user;
    // }

    public getToken(): string {
        const token: string = localStorage.getItem(ACCESS_TOKEN_KEY);
        // let token = this._accessToken;
        if (!token) {
            throw new Error('no token set , authentication required');
        }
        return token;
    }


    /**
     * [signIn description]
     * @return [description]
     */
    public signIn() {
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
    }

    public signInSuccessHandler(res: AuthResponse) {
        // console.log(res);
        this.ngZone.run(() => {
            // this.user = res;
            // Set flag in local storage stating this app is logged in
            localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token);
            // this._accessToken = res.getAuthResponse().access_token;
        });
    }


    private signInErrorHandler(err) {
        console.warn(err);
        return err;
    }

    /**
     * [signOut description]
     */
    // TODO: Rework
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



    /**
     * [refreshAuthToken refreshes the google]
     * @return [description]
     */
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
