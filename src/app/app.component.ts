import { Component, OnInit } from '@angular/core';
import { of, Observable, from } from 'rxjs';

import { environment as env } from '@env/environment';

import { GoogleApiService } from 'ng-gapi';
import { GoogleAuthService } from 'ng-gapi';

import { UserService } from '@app/core/services/user.service';

import { sideNavAnimation, sideNavContainerAnimation } from './sidenav.animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [sideNavAnimation, sideNavContainerAnimation]
//  animations: [slideAnimation]
})
export class AppComponent {
  title = 'gmail-starter';
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');

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
  public signOut(): void {
    this.userService.signOut();
  }

}
