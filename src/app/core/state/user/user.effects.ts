import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { UpdateUserStateAction } from './user.actions';
// import { Effect, ofType, Actions } from '@ngrx/effects';
// import { LoadNewUserAction, UserActionTypes, ResetUserAction } from './user.actions';
// import { tap } from 'rxjs/operators';

@Injectable()
export class UserEffects {

  @Effect({dispatch: false})
  onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
    // listen to our storage key
    filter((evt) => {
      // console.log(evt);
      return evt.key === 'go-app-user';
    }),
    filter(evt => evt.newValue !== null),
    map(evt => {
      // console.log(evt);
      // console.log(JSON.parse(evt.newValue));
      let userState = JSON.parse(evt.newValue);
      // console.log(authenticated);
      this.store.dispatch(new UpdateUserStateAction(userState));
      // if (authenticated) {
      // this.store.dispatch(new LoginSuccessAction());
      // }
      // if (!authenticated) {
      //  this.store.dispatch(new LogoutConfirmedFromOtherWindowAction());
      //}
    })
  );

  constructor(
    private store: Store<AppState>
//     private actions$: Actions,
  ) {}
}
