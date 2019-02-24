import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState, LogService } from '@app/core';
import { LoginRequestedAction } from '@app/core/state/auth/auth.actions';
import { environment as env } from '@env/environment';


@Component({
  selector: 'go-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  appName = env.appName;
  isProd = env.production;
  envName = env.envName;
  version = env.appVersion;
  year = new Date().getFullYear();
  api_url = 'http://' + env.apiHost + ':' + env.apiPort;
  packageVersions = env.packageVersions;

  constructor(private store: Store<AppState>, private logService: LogService) {
    this.logService.log('App Name: ' + this.appName);
    this.logService.log('App Version: ' + this.version);
    this.logService.log('Year: ' + this.year);
    this.logService.log('Env Name: ' + this.envName);
    this.logService.log('Production: ' + this.isProd);
    this.logService.log('Api Url: ' + this.api_url);
    Object.keys(this.packageVersions).forEach((packageName) => {
      let version = this.packageVersions[packageName];
      this.logService.log(packageName + ': ' + version)
    })
  }

  ngOnInit() { }
  public signIn() {
    this.store.dispatch(new LoginRequestedAction());
  }

}
