import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState, CreateTasksAction } from '@app/core';
import { CreateSuggestedActionsByNameAction, SuggestionsActionTypes, DeleteSuggestionsAction, UpdateSuggestionsAction } from './suggestions.actions';
import { map } from 'rxjs/operators';
import { ITask } from '@app/core/state/tasks/tasks.model';
import { ISuggestion } from './suggestions.model';
import { Update } from '@ngrx/entity';

@Injectable()
export class SuggestionsEffects {

  @Effect({ dispatch: false })
  createSuggestedActions$ = this.actions$.pipe(
    ofType<CreateSuggestedActionsByNameAction>(SuggestionsActionTypes.CreateSuggestedActionsByName),

    map((action) => {
      let change: Update<ISuggestion>;
      let changesArray: Update<ISuggestion>[] = [];
      let delete_payload: Array<string> = [];
      let task_payload: ITask[] =
        action.payload.suggestions.filter((task) => task.label || task.delete)
          .map((suggestion) => {
            if (suggestion.label) {
              let changes = {
                labelByName: suggestion.fromName
              }
              change = {
                id: suggestion.id,
                changes
              }
              changesArray.push(change);
            }
            if (suggestion.delete) {
              delete_payload.push(suggestion.id);
            }
            return {
              id: suggestion.id,
              label: suggestion.label,
              labelNames: [suggestion.fromName],
              delete: suggestion.delete
            }
      });
      // let delete_payload = task_payload.filter((task) => task.delete).map((task) => task.id);
      // task_payload = task_payload.filter((task) => task.label || task.delete);
      this.store.dispatch(new CreateTasksAction({ tasks: task_payload }));

      this.store.dispatch(new DeleteSuggestionsAction({ ids: delete_payload }));
      this.store.dispatch(new UpdateSuggestionsAction({ suggestions: changesArray }));
    })

  );


  constructor(
    private actions$: Actions,
    private store: Store<AppState>) { }
}
