import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/**
 * [ngrx module imports]
 */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// AppState reducers and metaReducers
import { reducers, metaReducers } from './state/core.state';
// Auth Effects registered EffectsModule.forRoot([])
import { AuthEffects } from './state/auth/auth.effects';
// used for the cutom router state
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
// router state custom serializer
import { CustomSerializer } from './state/router/custom-serializer';
// local storage service for storing the entire contents of ngrx store state
import { LocalStorageService } from './services/local-storage/local-storage.service';

/**
 * [app wide singleton services]
 */
 // Service to authorize a google user, store their token and some minor details
 // about their google profile
 import { AuthUserService } from './services/auth-user/auth-user.service';
 // Guard Service to redirect to login page when not authenticated
 import { AuthGuardService } from './services/auth-user/auth-guard.service';
// http error interceptor
import { httpInterceptorProviders } from './services/http-interceptors';
// notifications service
import { NotificationService } from './services/notifications/notification.service';
// error handler service
import { AppErrorHandler } from './services/error-handler/app-error-handler.service';


/* environment variables */
import { environment } from '@env/environment';

// 3rd party library (ng-gapi) to initialize google api's, handle auth, and
// assist in the use of the google api's
import {
    GoogleApiModule,
//    GoogleApiService,
//    GoogleAuthService,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
//    GoogleApiConfig
} from 'ng-gapi';
import { UserEffects } from './state/user/user.effects';

// config of ng-gapi 3rd party library
const gapiClientConfig: NgGapiClientConfig = {
    client_id: environment.googleApi.clientId,
    discoveryDocs: environment.googleApi.discoveryDocs,
    scope: environment.googleApi.scope,
    ux_mode: 'redirect',
    redirect_uri: 'http://localhost:4200/loading',
};


/**
 * [NgModule core module (includes all singleton services,
 * & main AppState + AuthState)]
 */
@NgModule({
  imports: [
    CommonModule,    // angular
    HttpClientModule,

    StoreModule.forRoot(reducers, { metaReducers }),    // ngrx store
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),    // ngrx router store
    EffectsModule.forRoot([AuthEffects, UserEffects]),    // ngrx effects
    // ngrx store devtools

    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),

    environment.production ? [] : StoreDevtoolsModule.instrument({
      name: 'Gmail Starter'
    }),
  ],

  declarations: [],
  providers: [
    AuthUserService,
    AuthGuardService,
    NotificationService, // notifications in MatSnackBar
    LocalStorageService, // stores entire ngrx-store state in localStorage
    httpInterceptorProviders, // http error interceptor
    /* app wide error handler */
    { provide: ErrorHandler, useClass: AppErrorHandler },
    /* ngrx router custom router store */
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
})

/**
 * [constructor for CoreModule]
 * @param @Optional @SkipSelf [insure the core module, which contains all
 * singleton services and the AppState + AuthState is only injected once]
 */
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
