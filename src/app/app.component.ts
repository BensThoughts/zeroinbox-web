import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';


import {
  routeAnimations,
  LocalStorageService,
  AppState
} from '@app/core';

import { fadeAnimation } from './fadeAnimations';
import { slideAnimation } from './slideAnimation';

import { environment as env } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideAnimation]
})
export class AppComponent {
  title = 'gmail-starter';
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');

  constructor(
    private storageService: LocalStorageService
  ) {}


  ngOnInit(): void {
  }

}
