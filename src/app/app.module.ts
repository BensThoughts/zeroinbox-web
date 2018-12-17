import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular components and modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// All dumb components are maintained in the shred module.
import { SharedModule } from '@app/shared';

// All services [prividors] that are used app wide are kept in the core module
// they should only need to be imported once here in app.module and nowhere else
// in the application as there should only be one instance of each of these
// services.  All other modules and components that use a service will share
// the same instance of it.
//import { CoreModule } from '@app/core';

// Handles the welcome screen and authenticating a User (entry into app)
import { AuthModule } from './auth/auth.module';

// Handles the admin-panel interface of the main app
import { AdminPanelModule } from './admin-panel/admin-panel.module';

// Service to authorize a google user, store their token and some minor details
// about their google profile
import { UserService } from '@app/core/services/auth-user/user.service';

// Handles all calls to get or set the labels of the users gmail
import { GmailLabelService } from '@app/core/services/label/gmail-label.service';

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

// config of ng-gapi 3rd party library
let gapiClientConfig: NgGapiClientConfig = {
    client_id: "443118366030-p6fpakqmn0ngjes70eigkegpvva96agm.apps.googleusercontent.com",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
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

    //CoreModule,
    AuthModule,
    AdminPanelModule,

    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),

    AppRoutingModule, // this must always come last
  ],
  providers: [UserService, GmailLabelService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
