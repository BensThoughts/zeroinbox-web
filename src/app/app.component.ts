import { Component, OnInit } from '@angular/core';
import { of, Observable, from } from 'rxjs';

import { environment as env } from '@env/environment';

import { MenuItem, menu_items } from './menuitems.data';

import { GoogleApiService } from 'ng-gapi';
import { GoogleAuthService } from 'ng-gapi';

import { UserService } from '@app/core/services/auth-user/user.service';

import {
  sideNavAnimation,
  sideNavContentAnimation,
  sideNavChevronAnimation
} from './sidenav.animations';


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

   toggle() {
     this.isOpen = !this.isOpen;
   }

  constructor(
    private userService: UserService,
    private authService: GoogleAuthService,
    private gapiService: GoogleApiService,
  ) { this.gapiService.onLoad().subscribe(); }


  ngOnInit(): void {
  }

  // used to check if mat-sidenav should be displayed
  public isLoggedIn(): Observable<boolean> {
    return of(this.userService.isUserSignedIn);
  }

  // used to sign the google user out of the app
  //  signIn() in implemented in auth/components/login-page.component.ts
  public signOut(): void {
    this.userService.signOut();
  }

}
