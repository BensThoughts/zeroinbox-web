import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { UpdateUserStateAction } from './user.actions';
import { SyncToStorageAction } from '../bootstrap/bootstrap.actions';
// import { Effect, ofType, Actions } from '@ngrx/effects';
// import { LoadNewUserAction, UserActionTypes, ResetUserAction } from './user.actions';
// import { tap } from 'rxjs/operators';

@Injectable()
export class UserEffects {

  @Effect()
  onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
    // listen to our storage key
    filter((evt) => {
      // console.log(evt);
      return evt.key === 'go-app-user';
    }),
    filter(evt => evt.newValue !== null),
    map(evt => {
      let userState = JSON.parse(evt.newValue);
      // this.store.dispatch(new SyncToStorageAction({ syncToStorage: false }));
      return new UpdateUserStateAction(userState);
    })
  );

  constructor(
    private store: Store<AppState>
//     private actions$: Actions,
  ) {}
}
