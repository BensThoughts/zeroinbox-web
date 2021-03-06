/* Angular components and modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    SharedModule,

    CoreModule,
    AuthModule,
    AdminPanelModule,

    AppRoutingModule,

    ScullyLibModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
