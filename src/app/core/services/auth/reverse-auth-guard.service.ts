import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { selectIsAuthenticated } from '@app/core/state/auth/auth.selectors';

@Injectable()
export class ReverseAuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /**
     * This was very tricky to get working, We need to make sure to return the
     * opposite of whatever auth-guard is returning...hence reverse-auth-guard
     *
     * when we are not authenticated we must return of(true) to let the route for
     * /home (where reverse-auth-guard is implemented) go through.
     *
     * when we are authenticated we need to route to /admin-panel/home and return of(false)
     *
     * @return opposite of current authentication state
     */
    return this.checkStoreAuthentication().pipe(
      tap((authenticated) => {
        if (authenticated) {
          this.router.navigate(['/admin-panel/home']);
        }
      }),
      map((authenticated) => !authenticated)
    );
  }

  checkStoreAuthentication() {
    return this.store.pipe(select(selectIsAuthenticated));
  }
}
