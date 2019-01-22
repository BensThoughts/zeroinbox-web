import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState, CreateTasksAction, DeleteTypeTasksAction, LabelTypeTasksAction, LabelTestTasksAction, UpsertTasksAction } from '@app/core';
import { CreateSuggestedActionsByNameAction, SuggestionsActionTypes, DeleteSuggestionsAction, UpdateSuggestionsAction, LabelByNameSuggestionsAction } from './suggestions.actions';
import { map, take } from 'rxjs/operators';
import { ITask } from '@app/core/state/tasks/tasks.model';
import { ISuggestion } from './suggestions.model';
import { Update, EntityMap } from '@ngrx/entity';
import { selectAllSuggestions, selectEntities, select_Tasks_Suggestions_Entities } from './suggestions.selectors';
import {  } from './suggestions.reducer';
import * as fromTasks from '@app/core/state/tasks/tasks.selectors';

@Injectable()
export class SuggestionsEffects {

  @Effect({ dispatch: false })
  labelByNameSuggestedActions$ = this.actions$.pipe(
    ofType<LabelByNameSuggestionsAction>(SuggestionsActionTypes.LabelByNameSuggestions),
    map((action) => {
      this.store.pipe(
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
      ).subscribe();
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
      this.store.dispatch(new UpsertTasksAction({ tasks: tasksArray }))
      // this.store.dispatch(new DeleteTypeTasksAction({ ids: action.payload.ids }));
    })
  );


  constructor(
    private actions$: Actions,
    private store: Store<AppState>) { }
}
