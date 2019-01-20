import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { TaskActionTypes, CreateTasksAction, UpsertTasksAction } from './tasks.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import { map, take } from 'rxjs/operators';
import { selectEntities } from './tasks.selectors';

@Injectable()
export class TasksEffects {

  /**
   * Check for previous entry of the task then if it exists concat the current
   * labels to the incoming ones so that when we Upsert the new tasks the new labels are
   * included with the old ones...multiple labels can be applied to all of the threads from
   * a sender.
   *
   * @return [description]
   */
  @Effect({ dispatch: false })
  suggestionsRequested$ = this.actions$
    .pipe(
      ofType<CreateTasksAction>(TaskActionTypes.CreateTasks),
      map((action) => {
        console.log('ping');
        this.store.pipe(
          select(selectEntities),
          take(1),
          map((tasks) => {
            action.payload.tasks.forEach((task) => {
              if (task.label) {
                if (tasks[task.id]) {
                  task.labelNames = task.labelNames.concat(tasks[task.id].labelNames);
                }
              }
            });
            this.store.dispatch(new UpsertTasksAction({ tasks: action.payload.tasks }));
          })

        ).subscribe();
      })
    );

    constructor(
      private actions$: Actions,
      private store: Store<AppState>) { }
  }
