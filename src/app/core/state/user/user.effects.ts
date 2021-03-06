import { Injectable } from '@angular/core';
import { filter, map, concatMap, catchError } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  UpdateUserStateAction,
  UserProfileRequestAction,
  UserActionTypes,
  LoadBasicProfileAction,
  LoadEmailProfileAction
} from './user.actions';
import {
  BasicProfileResponse,
  UserService,
  EmailProfileResponse
} from '../../services/user/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { FirstRunStatusRequestAction } from '../bootstrap/bootstrap.actions';
import { LogService } from '@app/core/services/log/log.service';

@Injectable()
export class UserEffects {
  userProfileRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<UserProfileRequestAction>(UserActionTypes.UserProfileRequest),
        concatMap(() => {
          return this.userService.getBasicProfile().pipe(
            map((response: BasicProfileResponse) => {
              if (response.status === 'error') {
                this.logService.error(
                  'Error getting basic profile: ' + response.status_message
                );
              } else {
                this.store.dispatch(
                  new LoadBasicProfileAction(response.data.basic_profile)
                );
              }
            }),
            catchError((err) => {
              this.logService.error(err, 'connection');
              return of(err);
            })
          );
        }),
        concatMap(() => {
          return this.userService.getEmailProfile().pipe(
            map((response: EmailProfileResponse) => {
              if (response.status === 'error') {
                this.logService.error(
                  'Error getting email profile: ' + response.status_message
                );
              }
              this.store.dispatch(
                new LoadEmailProfileAction(response.data.email_profile)
              );
            }),
            catchError((err) => {
              this.logService.error(err, 'connection');
              return of(err);
            })
          );
        }),
        map(() => {
          this.store.dispatch(new FirstRunStatusRequestAction());
        })
      ),
    { dispatch: false }
  );

  onChange$ = createEffect(() =>
    fromEvent<StorageEvent>(window, 'storage').pipe(
      // listen to our storage key
      filter((evt) => {
        return evt.key === 'app-user';
      }),
      filter((evt) => evt.newValue !== null),
      map((evt) => {
        let userState = JSON.parse(evt.newValue);
        return new UpdateUserStateAction(userState);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private logService: LogService
  ) {}
}
