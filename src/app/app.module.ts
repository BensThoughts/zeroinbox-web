import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular components and modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// All dumb components are maintained in the shred module.
import { SharedModule } from '@app/shared';

// All services [prividors] that are used app wide are kept in the core module
// they should only need to be imported once here in app.module and nowhere else
// in the application as there should only be one instance of each of these
// services.  All other modules and components that use a service will share
// the same instance of it.
//import { CoreModule } from '@app/core';

import { AuthModule } from './auth/auth.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

import { UserService } from '@app/core/services/user.service';
import { GmailLabelService } from '@app/core/services/gmail-label.service';

import { HttpClientModule } from '@angular/common/http';

import {
    GoogleApiModule,
    GoogleApiService,
    GoogleAuthService,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
    GoogleApiConfig
} from "ng-gapi";

let gapiClientConfig: NgGapiClientConfig = {
    client_id: "443118366030-p6fpakqmn0ngjes70eigkegpvva96agm.apps.googleusercontent.com",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
//    ux_mode: "redirect",
//    redirect_uri: "http://localhost:4200/home"
};


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    //  CoreModule,
    SharedModule,
    AuthModule,
    AdminPanelModule,
    HttpClientModule,

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
