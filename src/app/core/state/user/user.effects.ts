import { Injectable } from '@angular/core';
import { filter, map, concatMap, catchError } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UpdateUserStateAction, UserProfileRequestAction, UserActionTypes, LoadBasicProfileAction, LoadEmailProfileAction } from './user.actions';
import { BasicProfileResponse, UserService, EmailProfileResponse } from '../../services/user/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { FirstRunStatusRequestAction } from '../bootstrap/bootstrap.actions';

@Injectable()
export class UserEffects {

  @Effect({ dispatch: false })
  userProfileRequest$ = this.actions$.pipe(
    ofType<UserProfileRequestAction>(UserActionTypes.UserProfileRequest),
    concatMap(() => {
      return this.userService.getBasicProfile().pipe(
        map((response: BasicProfileResponse) => {
          if (response.status === 'error') {
            console.error('Error getting basic profile: ' + response.status_message)
          } else {
            this.store.dispatch(new LoadBasicProfileAction(response.data.basic_profile));
          }
        }),
        catchError((err) => {
          return of(console.error(err));
        })
      );
    }),
    concatMap(() => {
      return this.userService.getEmailProfile().pipe(
        map((response: EmailProfileResponse) => {
          if (response.status === 'error') {
            console.error('Error getting email profile: ' + response.status_message)
          }
        this.store.dispatch(new LoadEmailProfileAction(response.data.email_profile));
        }),
        catchError((err) => {
          return of(console.error(err));
        })
      );
    }),
    map(() => {
      this.store.dispatch(new FirstRunStatusRequestAction());
    })
  )

  

  @Effect()
  onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
    // listen to our storage key
    filter((evt) => {
      return evt.key === 'go-app-user';
    }),
    filter(evt => evt.newValue !== null),
    map(evt => {
      let userState = JSON.parse(evt.newValue);
      return new UpdateUserStateAction(userState);
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService
  ) {}
}
