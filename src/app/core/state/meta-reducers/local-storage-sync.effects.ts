import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ResetLocalStorageAction, LocalStorageActionTypes } from './local-storage-sync-actions';
import { map } from 'rxjs/operators';

@Injectable()
export class LocalStorageSyncEffects {

    @Effect({ dispatch: false })
    reset$ = this.actions$.pipe(
        ofType<ResetLocalStorageAction>(LocalStorageActionTypes.ResetStorage),
        map(() => {
            localStorage.clear();
        })
    )


    constructor(private actions$: Actions) {}
}