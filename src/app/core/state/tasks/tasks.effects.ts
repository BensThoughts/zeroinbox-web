import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { TaskActionTypes, CreateTasksAction, UpsertTasksAction, DeleteTypeTasksAction, LabelTypeTasksAction } from './tasks.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import { map, take } from 'rxjs/operators';
import { selectEntities } from './tasks.selectors';
import { Update } from '@ngrx/entity';
import { ITask } from './tasks.model';

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
   labelTypeTasks$ = this.actions$
     .pipe(
       ofType<LabelTypeTasksAction>(TaskActionTypes.LabelTypeTasks),
       map((action) => {
         this.store.pipe(
           select(selectEntities),
           take(1),
           map((tasks) => {
             let tasksArray: ITask[] = action.payload.ids_labels.map((id_name) => {
               if (tasks[id_name.id] !== undefined) {
                 let labelNames = tasks[id_name.id].labelNames.concat(id_name.label)
                 return {
                  id: id_name.id,
                  label: true,
                  delete: false,
                  labelNames: labelNames
                 }
               } else {
                 return {
                   id: id_name.id,
                   label: true,
                   delete: false,
                   labelNames: [id_name.label]
                 }
               }
             })
            this.store.dispatch(new UpsertTasksAction({ tasks: tasksArray }))
          })
        ).subscribe();
      })
     );




  @Effect({ dispatch: false })
  deleteTypeTasks$ = this.actions$
    .pipe(
      ofType<DeleteTypeTasksAction>(TaskActionTypes.DeleteTypeTasks),
      map((action) => {
        let tasksArray: ITask[];
        tasksArray = action.payload.ids.map((id) => {
          return {
            id: id,
            delete: true,
            label: false,
            labelNames: []
          };
        });
        this.store.dispatch(new UpsertTasksAction({ tasks: tasksArray }))
      })
    );

    constructor(
      private actions$: Actions,
      private store: Store<AppState>) { }
  }
