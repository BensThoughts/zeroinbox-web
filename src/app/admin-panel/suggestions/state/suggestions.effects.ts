import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState, CreateTasksAction, DeleteTypeTasksAction, LabelTypeTasksAction } from '@app/core';
import { CreateSuggestedActionsByNameAction, SuggestionsActionTypes, DeleteSuggestionsAction, UpdateSuggestionsAction, LabelByNameSuggestionsAction } from './suggestions.actions';
import { map, take } from 'rxjs/operators';
import { ITask } from '@app/core/state/tasks/tasks.model';
import { ISuggestion } from './suggestions.model';
import { Update } from '@ngrx/entity';
import { selectAllSuggestions, selectEntities } from './suggestions.selectors';
import {  } from './suggestions.reducer';

@Injectable()
export class SuggestionsEffects {

  @Effect({ dispatch: false })
  labelByNameSuggestedActions$ = this.actions$.pipe(
    ofType<LabelByNameSuggestionsAction>(SuggestionsActionTypes.LabelByNameSuggestions),
    map((action) => {
      this.store.pipe(
        select(selectEntities),
        take(1),
        map((suggestions) => {
          let changes;
          // let changesArray: Update<ISuggestion>[] = [];
          let labels: Array<{id: string; label: string}> = [];
          let changesArray: Update<ISuggestion>[] = action.payload.ids.map((id) => {
            let label = suggestions[id].fromName;
            changes = {
              labelByName: label
            }
            labels.push({
              id: id,
              label: label
            })
            return {
              id: id,
              changes
            }
            // changesArray.push(change);
          });
          this.store.dispatch(new UpdateSuggestionsAction({ suggestions: changesArray }));
          this.store.dispatch(new LabelTypeTasksAction({ ids_labels: labels }));
        })
      ).subscribe()
    })
  );

  @Effect({ dispatch: false })
  deleteSuggestedActions$ = this.actions$.pipe(
    ofType<DeleteSuggestionsAction>(SuggestionsActionTypes.DeleteSuggestions),
    map((action) => {
      this.store.dispatch(new DeleteTypeTasksAction({ ids: action.payload.ids }));
    })
  );


  constructor(
    private actions$: Actions,
    private store: Store<AppState>) { }
}
