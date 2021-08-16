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
    public router: Router
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
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {
        property: 'og:title',
        content: 'Zero Inbox'
      },
      {
        property: 'og:image',
        content:
          'https://res.cloudinary.com/bensthoughts/image/upload/v1629100664/zeroinbox/assets/linkedin/home-scaled_twkdaf.png'
      },
      {
        property: 'og:description',
        content: 'Zero Inbox Homepage'
      },
      {
        property: 'og:url',
        content: '//zeroinbox.app'
      }
    ]);
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
