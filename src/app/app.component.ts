import { Component, OnInit } from '@angular/core';
import { of, Observable, from } from 'rxjs';

import { environment as env } from '@env/environment';

import { MenuItem, menu_items } from './menuitems.data';

import { GoogleApiService } from 'ng-gapi';
import { GoogleAuthService } from 'ng-gapi';

import {
  sideNavAnimation,
  sideNavContentAnimation,
  sideNavChevronAnimation
} from './sidenav.animations';
import { Store, select } from '@ngrx/store';
import { AppState, LogoutAction } from '@app/core';
import { selectIsAuthenticated } from '@app/core'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    sideNavAnimation,
    sideNavContentAnimation,
    sideNavChevronAnimation
  ]
})

export class AppComponent {
  title = 'gmail-starter';
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');

  menu_items: MenuItem[] = menu_items;

  // track the state of the sidenav
  isOpen = true;

  isLoggedIn$: Observable<boolean>;

   toggle() {
     this.isOpen = !this.isOpen;
   }

  constructor(
    private gapiService: GoogleApiService,
    private store: Store<AppState>,
  ) { this.gapiService.onLoad().subscribe(); }


  ngOnInit(): void {
      // used to check if mat-sidenav should be displayed
      this.isLoggedIn$ = this.store.pipe(select(selectIsAuthenticated));
  }



  // used to sign the google user out of the app
  //  signIn() in implemented in auth/components/login-page.component.ts
  public signOut(): void {
    this.store.dispatch(new LogoutAction());
  }

}
