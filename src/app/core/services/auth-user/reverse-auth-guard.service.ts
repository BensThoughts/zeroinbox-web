import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AuthUserService } from './auth-user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
// import { of } from 'rxjs';
import { selectIsAuthenticated } from '@app/core/state/auth/auth.selectors';
import { of } from 'rxjs';


@Injectable()
export class ReverseAuthGuardService implements CanActivate {
  constructor(
  //  private authService: AuthUserService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    /**
     * This was very tricky to get working, We need to make sure to return the
     * opposite of whatever auth-guard is returning...hence reverse-auth-guard
     *
     * when we are not authenticated we must return of(true) to let the route for
     * /login (where reverse-auth-guard is implemented) go through.
     *
     * when we are authenticated we need to route to home page and return of(false)
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
/**
    let authenticated = JSON.parse(localStorage.getItem('go-app-auth')).isAuthenticated;
    console.log(state.url);

    if (authenticated) {
      this.router.navigate(['/admin-panel/home']);
      return false;
    } else {
      return true;
    }
  }
}
**/
