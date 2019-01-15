import { Effect, Actions, ofType } from '@ngrx/effects';
import { fromEvent } from 'rxjs';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class MetaEffects {

  @Effect()
  updateAuthState = fromEvent<StorageEvent>(window, 'storage').pipe(
  // listen for state changes
  filter(evt => evt.key === 'go-app-auth'),
  filter(evt => evt.newValue !== null),
  map(evt => {
    // deserialize the new state from local storage
    const newState = JSON.parse(evt.newValue);

    // dispatch an update state action
    // with the new state as payload
    return { type: 'UPDATE_AUTH_STATE', payload: { newState }};
  }),
);

}
