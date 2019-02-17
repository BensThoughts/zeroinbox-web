import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { UpdateTasksStateAction } from './tasks.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';


@Injectable()
export class TasksEffects {
    @Effect()
    onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
    // listen to our storage key
      filter((evt) => {
        return evt.key === 'go-app-tasks';
      }),
      filter(evt => evt.newValue !== null),
      map(evt => {
        let suggestionsState = JSON.parse(evt.newValue);
        return new UpdateTasksStateAction(suggestionsState);
      })
    );

    constructor(
      private actions$: Actions,
      private store: Store<AppState>) { }
  }
