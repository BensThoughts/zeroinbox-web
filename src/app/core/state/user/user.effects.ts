import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { LoadNewUserAction, UserActionTypes, ResetUserAction } from './user.actions';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '@app/core/services/local-storage/local-storage.service';

export const USER_KEY = 'USER';

@Injectable()
export class UserEffects {

  /**
   * [Effect loadUserIntoStorage$ loads the 'user' store into localStorage]
   */
  @Effect({ dispatch: false })
  loadUserIntoStorage$ = this.actions$.pipe(
    ofType<LoadNewUserAction>(UserActionTypes.LoadNewUser),
    tap((action) => {
        this.localStorageService.setItem(USER_KEY, {
          id: action.payload.getId(),
          name: action.payload.getName(),
          familyName: action.payload.getFamilyName(),
          imageUrl: action.payload.getImageUrl(),
          givenName: action.payload.getGivenName(),
          email: action.payload.getEmail()
        });
    })
  );

  @Effect({ dispatch: false })
  resetUser$ = this.actions$.pipe(
    ofType<ResetUserAction>(UserActionTypes.ResetUser),
    tap(() => {
        this.localStorageService.removeItem(USER_KEY);
    })
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
  ) {}
}
