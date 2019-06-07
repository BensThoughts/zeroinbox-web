import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { fadeElementsAnimation } from '../../animations/elementsAnimations';
import {
  AppState,
} from '@app/core';

import { Store } from '@ngrx/store';
import { environment as env } from '@env/environment';
import { LogService } from '@app/core/services/log/log.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
  animations: [fadeElementsAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainHomeComponent implements OnInit {
  appName = env.appName;
  isProd = env.production;
  envName = env.envName;
  version = env.appVersion;
  year = new Date().getFullYear();
  api_url = env.apiHost;
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

  ngOnInit() {

  }

  ngOnDestroy() {
  }

}
