/* Angular components and modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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





// 3rd party library (ng-gapi) to initialize google api's, handle auth, and
// assist in the use of the google api's
import {
    GoogleApiModule,
//    GoogleApiService,
//    GoogleAuthService,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
//    GoogleApiConfig
} from "ng-gapi";

import { environment } from '@env/environment';

// config of ng-gapi 3rd party library
let gapiClientConfig: NgGapiClientConfig = {
    client_id: environment.googleApi.clientId,
    discoveryDocs: environment.googleApi.discoveryDocs,
    scope: environment.googleApi.scope,
    ux_mode: "redirect",
    redirect_uri: "http://localhost:4200/callback",
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


    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
