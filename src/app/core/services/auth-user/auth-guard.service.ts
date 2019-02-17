import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { selectIsAuthenticated } from '@app/core/state/auth/auth.selectors';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


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