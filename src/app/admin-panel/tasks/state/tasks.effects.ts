import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UpdateTasksStateAction, UpsertTasksAction, TaskActionTypes } from './tasks.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { map, filter, exhaustMap, concatMap, catchError } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { TasksService } from '@app/core/services/tasks/tasks.service';


@Injectable()
export class TasksEffects {

/*     @Effect({ dispatch: false })
    upsertTasks$ = this.actions$
      .pipe(
        ofType<UpsertTasksAction>(TaskActionTypes.UpsertTasks),
        concatMap((action) => {
          let tasks: ITask[] = action.payload.tasks;
          return this.tasksService.postTasks(tasks);
        }),
        catchError((err) => {
          return of(console.log(err));
        })
      ); */

    

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
      private store: Store<AppState>,
      private tasksService: TasksService) { }
  }
