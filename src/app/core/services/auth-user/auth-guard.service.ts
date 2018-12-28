import { CanActivate, Router } from '@angular/router';
import { AuthUserService } from './auth-user.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { Injectable } from '@angular/core';
import { mergeMap, map, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { selectIsAuthenticated } from '@app/core/state/auth/auth.selectors';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthUserService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate() {
    return this.checkStoreAuthentication().pipe(
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigate(['/login'])
        }
      })
    );
    /**  mergeMap(storeAuth => {
        if (storeAuth) {
          return of(true);
        }

        return this.checkApiAuthentication();
      }),

      map(apiAuth => {
        if (!ApiAuth) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      })
    );
    **/
  }

  checkStoreAuthentication() {
    return this.store.select(selectIsAuthenticated);
  }

  checkApiAuthentication() {
    return of(this.authService.isUserSignedIn);
  }
}
