import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
  RouterStateSerializer, DefaultRouterStateSerializer
} from '@ngrx/router-store';
// router state custom serializer
import { CustomSerializer } from './state/router/custom-serializer';

/**
 * [app wide singleton services]
 */
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
// Guard Service to redirect to login page when not authenticated
import { AuthGuardService } from './services/auth/auth-guard.service';
// Guard Service to redirect to home page when already authenticated
import { ReverseAuthGuardService } from './services/auth/reverse-auth-guard.service';
// notifications service
import { NotificationService } from './services/notifications/notification.service';
// error handler service
import { AppErrorHandler } from './services/error-handler/app-error-handler.service';


/* environment variables */
import { environment } from '@env/environment';

import { BootstrapService } from './services/bootstrap/bootstrap.service';

import { BootstrapEffects } from './state//bootstrap/bootstrap.effects';
import { UserEffects } from './state/user/user.effects';

import { LogService } from './services/log/log.service';
import { SendersEffects } from './state/senders/senders.effects';
import { SendersService } from './services/senders/senders.service';
import { GoogleAnalyticsEffects } from './state/router/google-analytics.effects';
import { LocalStorageSyncEffects } from './state/meta-reducers/local-storage-sync.effects';
import { ActionsService } from './services/actions/actions.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SettingsEffects } from './state/settings/settings.effects';
import { SettingsService } from './services/settings/settings.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}

/**
 * [NgModule core module (includes all singleton services,
 * & main AppState + AuthState)]
 */
@NgModule({
  imports: [
    CommonModule,    // angular
    HttpClientModule,

    // GoogleChartsModule.forRoot(),

    StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),    // ngrx store
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer,stateKey: 'router'}),    // ngrx router store
    EffectsModule.forRoot([
      SettingsEffects,
      AuthEffects,
      BootstrapEffects,
      GoogleAnalyticsEffects,
      LocalStorageSyncEffects,
      SendersEffects,
      UserEffects,
    ]),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    environment.production ? [] : StoreDevtoolsModule.instrument({
      name: 'ZeroInbox Store'
    }),
  ],

  declarations: [],
  providers: [
    ActionsService,
    AuthGuardService,
    AuthService,
    BootstrapService,
    LogService,
    NotificationService, // notifications in MatSnackBar
    ReverseAuthGuardService,
    SendersService,
    UserService,
    SettingsService,
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
