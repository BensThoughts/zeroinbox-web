import { ofType, Actions, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  ResetLocalStorageAction,
  LocalStorageActionTypes
} from './local-storage-sync-actions';
import { map } from 'rxjs/operators';

@Injectable()
export class LocalStorageSyncEffects {
  reset$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ResetLocalStorageAction>(LocalStorageActionTypes.ResetStorage),
        map(() => {
          localStorage.clear();
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
