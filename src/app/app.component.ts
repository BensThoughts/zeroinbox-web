import { Component, OnInit } from '@angular/core';

import { environment as env } from '@env/environment';
import { GoogleApiService } from 'ng-gapi';
import { GoogleAuthService } from 'ng-gapi';
import { UserService } from '@app/core/services/user.service';

//import { google } from 'googleapis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
//  animations: [slideAnimation]
})
export class AppComponent {
  title = 'gmail-starter';
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');

  constructor(private userService: UserService,
              private authService: GoogleAuthService,
              private gapiService: GoogleApiService
  ) {
         this.gapiService.onLoad().subscribe();
  }


  ngOnInit(): void {
//    console.log(google.getSupportedApis());
  }

  public isLoggedIn(): boolean {
    return this.userService.isUserSignedIn;
  }

  public signOut(): void {
    this.userService.signOut();
  }

}
