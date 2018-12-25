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
// http error interceptor
import { httpInterceptorProviders } from './services/http-interceptors';
// notifications service
import { NotificationService } from './services/notifications/notification.service';
// error handler service
import { AppErrorHandler } from './services/error-handler/app-error-handler.service';



// environment variables
import { environment } from '@env/environment';


/**
 * [NgModule core module (includes all singleton services and main AppState)]
 * @param  {imports [description]
 * @return          [description]
 */
@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx store
    StoreModule.forRoot(reducers, { metaReducers }),
    // ngrx router store
    StoreRouterConnectingModule.forRoot(),
    // ngrx effects
    EffectsModule.forRoot([]),
    // ngrx store devtools
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Gmail Starter'
        }),
  ],


  declarations: [],
  providers: [
    NotificationService, // notifications in MatSnackBar
    LocalStorageService, // stores entire ngrx-store state in localStorage
    //AuthGuardService,    // auth router guard
    httpInterceptorProviders, // http error interceptor
    //TitleService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
})


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
