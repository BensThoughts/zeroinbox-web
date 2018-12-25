import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Angular components and modules */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

/* All dumb reusable modules are maintained in the shared module. */
import { SharedModule } from '@app/shared';

/**
 * [CoreModule All singleton services [prividors] that are used app wide are kept in the
 * core module they should only need to be imported once here in app.module
 * and nowhere else. All other modules and components that use a service will
 * share the same instance of it.]
 */
import { CoreModule } from '@app/core';

// Handles the welcome screen and authenticating a User (entry into app)
import { AuthModule } from './auth/auth.module';

// Handles the admin-panel interface of the main app
import { AdminPanelModule } from './admin-panel/admin-panel.module';

// Service to authorize a google user, store their token and some minor details
// about their google profile
import { UserService } from '@app/core/services/auth-user/user.service';

// Handles all calls to get or set the labels of the users gmail
//import { GmailLabelService } from '@app/core/services/gmail-label/gmail-label.service';

// 3rd party library (ng-gapi) to initialize google api's, handle auth, and
// assist in the use of the google api's
import {
    GoogleApiModule,
    GoogleApiService,
    GoogleAuthService,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
    GoogleApiConfig
} from "ng-gapi";

import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';

// config of ng-gapi 3rd party library
let gapiClientConfig: NgGapiClientConfig = {
    client_id: environment.googleApi.client_id,
    discoveryDocs: environment.googleApi.discoveryDocs,
    scope: environment.googleApi.scope,
//    ux_mode: "redirect",
//    redirect_uri: "http://localhost:4200/",
};


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    SharedModule,

    CoreModule,
    AuthModule,
    AdminPanelModule,

    EffectsModule.forRoot([]),

    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),

    AppRoutingModule,
  ],
  providers: [UserService,], //GmailLabelService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
