import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Effect } from '@ngrx/effects';
import { UpdateUserStateAction } from './user.actions';

@Injectable()
export class UserEffects {

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
  ) {}
}
