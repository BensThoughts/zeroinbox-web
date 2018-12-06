import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular components and modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Components
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';

import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
    AppComponent,
    // App components
    NavComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
