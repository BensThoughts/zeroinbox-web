import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
// import { AuthUserService } from './auth-user.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
// import { of } from 'rxjs';
import { selectIsAuthenticated } from '@app/core/state/auth/auth.selectors';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
  //  private authService: AuthUserService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
/**
    let authenticated = JSON.parse(localStorage.getItem('go-app-auth')).isAuthenticated;
    console.log(authenticated);
    console.log(state.url);

    if (!authenticated) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
**/

    return this.checkStoreAuthentication().pipe(
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      })
    );

  }

  
  checkStoreAuthentication() {
    return this.store.select(selectIsAuthenticated);
  }

}
  /**
  checkApiAuthentication() {
    return of(this.authService.isUserSignedIn);
  }
  **/
