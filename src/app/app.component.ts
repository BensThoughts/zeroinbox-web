import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Title, Meta } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { environment as env } from '@env/environment';

import { MenuItem, menu_items, auth_menu_items } from './menuitems.data';

import {
  sideNavAnimation,
  sideNavContentAnimation,
  sideNavChevronAnimation
} from './sidenav.animations';

import { Store, select } from '@ngrx/store';
import {
  AppState,
  LogoutAction,
  LogService,
  selectDownloadingStatus,
  selectIsBootstrapped
} from '@app/core';
import { selectIsAuthenticated } from '@app/core';
import { selectTheme } from '@app/core/state/settings/settings.selectors';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    sideNavChevronAnimation,
    sideNavAnimation,
    sideNavContentAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = env.appName;
  appName = env.appName;
  isProd = env.production;
  envName = env.envName;
  version = env.appVersion;
  year = new Date().getFullYear();
  api_url = env.apiHost;
  packageVersions = env.packageVersions;

  // logo = require('../assets/logo.png');

  // A list of each menu item MenuItem: { name, route, icon }
  menu_items: MenuItem[] = menu_items;
  auth_menu_items: MenuItem[] = auth_menu_items;

  // Determines which menu items should be displayed
  isLoggedIn$: Observable<boolean>;
  isDownloading$: Observable<boolean>;
  isBootstrapped$: Observable<boolean>;

  // Sets the color theme app-wide
  theme$: Observable<string> = of('black-theme');

  // track the state of the sidenav
  isOpen = false;

  testTranslate = { value: 'Logout' };

  constructor(
    private store: Store<AppState>,
    private titleService: Title,
    private metaService: Meta,
    public translate: TranslateService,
    public router: Router,
    private logService: LogService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-LPEB1S5EBP', {
          'page-path': event.urlAfterRedirects
        });
      }
    });
    translate.setDefaultLang('en');
    translate.use('en');

    this.logService.log('App Name: ' + this.appName, false);
    this.logService.log('App Version: ' + this.version, false);
    this.logService.log('Year: ' + this.year, false);
    this.logService.log('Env Name: ' + this.envName, false);
    this.logService.log('Production: ' + this.isProd, false);
    this.logService.log('Api Url: ' + this.api_url, false);
    Object.keys(this.packageVersions).forEach((packageName) => {
      let version = this.packageVersions[packageName];
      this.logService.log(packageName + ': ' + version, false);
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.theme$ = this.store.pipe(select(selectTheme));
    this.isLoggedIn$ = this.store.pipe(select(selectIsAuthenticated));
    this.isDownloading$ = this.store.pipe(select(selectDownloadingStatus));
    this.isBootstrapped$ = this.store.pipe(select(selectIsBootstrapped));
  }

  /**
   * used to sign the google user out of the app
   * signIn() is implemented in auth/components/login-page.component.ts
   */
  public signOut(): void {
    this.store.dispatch(new LogoutAction());
  }

  /**
   * Used to open and close the sidenav displayed on medium and larger screens
   * @return void
   */
  toggle() {
    this.isOpen = !this.isOpen;
  }
}

// this.metaService.addTags([
//   {
//     property: 'og:type',
//     content: 'website'
//   },
//   {
//     property: 'og:title',
//     content: 'Zero Inbox'
//   },
//   {
//     property: 'og:image',
//     content:
//       'https://res.cloudinary.com/bensthoughts/image/upload/v1629121432/zeroinbox/assets/meta-images/og/og_sce8oa.png'
//   },
//   {
//     property: 'og:description',
//     content: 'ZeroInbox gets your inbox cleaned up fast!'
//   },
//   {
//     property: 'og:url',
//     content: 'https://zeroinbox.app'
//   },
//   {
//     name: 'twitter:card',
//     content: 'summary_large_image'
//   },
//   {
//     name: 'twitter:site',
//     content: '@bensthoughts'
//   },
//   {
//     name: 'twitter:creator',
//     content: '@bensthoughts'
//   },
//   {
//     name: 'twitter:description',
//     content:
//       'At lunch, in transit, or just on a 5-minute break. ZeroInbox helps you get your massively flooded inboxes organized quickly and efficiently.'
//   },
//   {
//     name: 'twitter:domain',
//     content: 'zeroinbox.app'
//   },
//   {
//     name: 'twitter:title',
//     content: 'Zero Inbox'
//   },
//   {
//     name: 'twitter:image',
//     content:
//       'https://res.cloudinary.com/bensthoughts/image/upload/v1629121454/zeroinbox/assets/meta-images/twitter/twitter_znoqhk.png'
//   }
// ]);
