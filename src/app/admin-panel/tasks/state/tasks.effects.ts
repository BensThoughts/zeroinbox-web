import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UpdateTasksStateAction, UpsertTasksAction, TaskActionTypes, AddTasksAction } from './tasks.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { map, filter, exhaustMap, concatMap, catchError, mergeMap, take } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
import { TasksService } from '@app/core/services/tasks/tasks.service';
import { ITask } from './tasks.model';
import { selectTaskAndSenderEntities } from './tasks.selectors';

@Injectable()
export class TasksEffects {

  @Effect({ dispatch: false })
  addTasks$ = this.actions$
    .pipe(
      ofType<AddTasksAction>(TaskActionTypes.AddTasks),
      map((action) => {
        this.store.pipe(
          select(selectTaskAndSenderEntities),
          take(1),
          map((tasksAndSenders) => {
            let labelByNameUpdates: ITask[] = [];
            let labelByNameSenderIds = action.payload.tasks.labelByNameTasks;
            if (labelByNameSenderIds) {
              labelByNameUpdates = labelByNameSenderIds.map((id) => {
                let oldLabelNames: string[] = [];
                let oldTask = tasksAndSenders.tasks[id];
                if (oldTask) {
                  oldLabelNames = oldTask.labelNames;
                }
                let newLabelName = tasksAndSenders.senders[id].fromName;
                return {
                  id: id,
                  labelByName: true,
                  labelNames: oldLabelNames.concat(newLabelName),
                  delete: false
                }
              });
            }
    
            let labelBySizeUpdate: ITask[] = [];
            let labelBySizeSenderIds = action.payload.tasks.labelBySizeTasks;
            if (labelBySizeSenderIds) {
              labelBySizeUpdate = labelBySizeSenderIds.map((id) => {
                let oldLabelNames: string[] = [];
                let oldTask = tasksAndSenders.tasks[id];
                if (oldTask) {
                  oldLabelNames = oldTask.labelNames;
                }
                // let newLabelName = tasksAndSenders.senders[id].fromName;
                let newLabelName: string;
                let labelAbbreviation = action.payload.tasks.labelName;
                newLabelName = this.getSizeLabel(labelAbbreviation);
                return {
                  id: id,
                  labelBySize: true,
                  labelNames: oldLabelNames.concat(newLabelName),
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
        ).subscribe();

      })
    )

  getSizeLabel(label: string) {
      switch(label) {
        case 'XL':
          return 'Extra Large';
        case 'LG':
          return 'Large';
        case 'MD':
          return 'Medium';
        case 'SM':
          return 'Small';
        case 'XS':
          return 'Extra Small';
        default:
          return 'Labeled By Size'
      }
  }

  @Effect({ dispatch: false })
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
    );

    

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
