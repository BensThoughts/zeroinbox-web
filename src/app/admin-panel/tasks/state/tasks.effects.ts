import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UpdateTasksStateAction, UpsertTasksAction, TaskActionTypes, AddTasksAction } from './tasks.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { map, filter, exhaustMap, concatMap, catchError } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { TasksService } from '@app/core/services/tasks/tasks.service';
import { ITask } from './tasks.model';
import { Update } from '@ngrx/entity';


@Injectable()
export class TasksEffects {

  @Effect({ dispatch: false })
  addTasks$ = this.actions$
    .pipe(
      ofType<AddTasksAction>(TaskActionTypes.AddTasks),
      map((action) => {
        let labelByNameUpdates: ITask[] = [];
        let labelByNameSenderIds = action.payload.tasks.labelByNameTasks;
        if (labelByNameSenderIds) {
          labelByNameUpdates = labelByNameSenderIds.map((id) => {
            return {
              id: id,
              labelByName: true,
              delete: false
            }
          });
        }

        let labelBySizeUpdate: ITask[] = [];
        let labelBySizeSenderIds = action.payload.tasks.labelBySizeTasks;
        if (labelBySizeSenderIds) {
          labelBySizeUpdate = labelBySizeSenderIds.map((id) => {
            return {
              id: id,
              labelBySize: true,
              delete: false
            }
          });
        }

        let deleteUpdates: ITask[] = [];
        let deleteSenderIds = action.payload.tasks.deleteTasks;
        if (deleteSenderIds) {
          deleteUpdates = deleteSenderIds.map((id) => {
            return {
              id: id,
              delete: true,
              labelBySize: false,
              labelByName: false,
              labelByCount: false
            }
          });
        }

        let updates: ITask[] = labelBySizeUpdate.concat(labelByNameUpdates).concat(deleteUpdates);
        this.store.dispatch(new UpsertTasksAction({ tasks: updates })) 
      })
    )

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
