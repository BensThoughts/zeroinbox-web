import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState, UpsertTasksAction } from '@app/core';
import {
  SuggestionsActionTypes,
  DeleteSuggestionsAction,
  UpdateSuggestionsAction,
  LabelByNameSuggestionsAction
} from './suggestions.actions';
import { map, take, mergeMap, exhaustMap } from 'rxjs/operators';
import { ITask } from '@app/core/state/tasks/tasks.model';
import { ISuggestion } from './suggestions.model';
import { Update } from '@ngrx/entity';
import { select_Tasks_Suggestions_Entities, selectEntities } from './suggestions.selectors';
import * as fromTasks from '@app/core/state/tasks/tasks.selectors';

@Injectable()
export class SuggestionsEffects {

  @Effect({ dispatch: false })
  labelByNameSuggestedActions$ = this.actions$.pipe(
    ofType<LabelByNameSuggestionsAction>(SuggestionsActionTypes.LabelByNameSuggestions),
    exhaustMap((action) => {
      return this.store.pipe(
        select(select_Tasks_Suggestions_Entities),
        take(1),
        map((tasks_suggestions) => {
          let tasks = tasks_suggestions.tasks;
          let suggestions = tasks_suggestions.suggestions;
          let tasksArray: ITask[] = [];
          let changes;
          let changesArray: Update<ISuggestion>[] = action.payload.ids.map((id) => {

            let label = suggestions[id].fromName;

            if (tasks[id]) {
              tasksArray.push({
                id: id,
                label: true,
                delete: false,
                labelNames: tasks[id].labelNames.concat(label)
              });
            } else {
              tasksArray.push({
                id: id,
                label: true,
                delete: false,
                labelNames: [label]
              });
            }

            changes = {
              labelByName: label
            }

            return {
              id: id,
              changes
            }
          // map close
          });
          this.store.dispatch(new UpdateSuggestionsAction({ suggestions: changesArray }));
          this.store.dispatch(new UpsertTasksAction({ tasks: tasksArray }));

        })
      );
    })
  );



  @Effect({ dispatch: false })
  deleteSuggestedActions$ = this.actions$.pipe(
    ofType<DeleteSuggestionsAction>(SuggestionsActionTypes.DeleteSuggestions),
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
      this.store.dispatch(new UpsertTasksAction({ tasks: tasksArray }));
    })
  );


  constructor(
    private actions$: Actions,
    private store: Store<AppState>) { }
}
