import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState, UpsertTasksAction } from '@app/core';
import {
  SuggestionsActionTypes,
  DeleteSuggestionsAction,
  UpdateSuggestionsAction,
  LabelByNameSuggestionsAction,
  DeleteSuggestionsMetaAction,
  LabelBySizeSuggestionsAction
} from './suggestions.actions';
import { map, filter, take, mergeMap, exhaustMap } from 'rxjs/operators';
import { ITask } from '@app/core/state/tasks/tasks.model';
import { ISuggestion } from '../model/suggestions.model';
import { Update } from '@ngrx/entity';
import { select_Tasks_Suggestions_Entities, selectEntities } from './suggestions.selectors';
import { UpdateSuggestionsStateAction } from './suggestions.actions';
import { fromEvent } from 'rxjs';


@Injectable()
export class SuggestionsEffects {

  @Effect()
  onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
  // listen to our storage key
    filter((evt) => {
      return evt.key === 'go-app-suggestions';
    }),
    filter(evt => evt.newValue !== null),
    map(evt => {
      let suggestionsState = JSON.parse(evt.newValue);
      return new UpdateSuggestionsStateAction(suggestionsState);
    })
  );

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
            let address = suggestions[id].fromAddress;

            if (tasks[id]) {
              tasksArray.push({
                id: id,
                fromAddress: address,
                label: true,
                delete: false,
                labelNames: tasks[id].labelNames.concat(label)
              });
            } else {
              tasksArray.push({
                id: id,
                fromAddress: address,
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
  labelBySizeSuggestedActions$ = this.actions$.pipe(
    ofType<LabelBySizeSuggestionsAction>(SuggestionsActionTypes.LabelBySizeSuggestions),
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

            let label = 'Medium';

            switch(action.payload.size) {
              case 0:
                label = 'Extra Small';
              case 1:
                label = 'Small'
              case 2:
                label = 'Medium'
              case 3:
                label = 'Large'
              case 4:
                label = 'Extra Large'
            }

            let address = suggestions[id].fromAddress;

            if (tasks[id]) {
              tasksArray.push({
                id: id,
                fromAddress: address,
                label: true,
                delete: false,
                labelNames: tasks[id].labelNames.concat(label)
              });
            } else {
              tasksArray.push({
                id: id,
                fromAddress: address,
                label: true,
                delete: false,
                labelNames: [label]
              });
            }

            changes = {
              labelBySize: label
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
    ofType<DeleteSuggestionsMetaAction>(SuggestionsActionTypes.DeleteSuggestionsMeta),
    exhaustMap((action) => {
      return this.store.pipe(
        select(selectEntities),
        take(1),
        map((suggestions) => {
          let tasksArray: ITask[];
          tasksArray = action.payload.ids.map((id) => {
            let address = suggestions[id].fromAddress;
            return {
              id: id,
              fromAddress: address,
              delete: true,
              label: false,
              labelNames: []
            };
          });
          this.store.dispatch(new DeleteSuggestionsAction({ ids: action.payload.ids }));
          this.store.dispatch(new UpsertTasksAction({ tasks: tasksArray }));

        })
      )

    })
  );


  constructor(
    private actions$: Actions,
    private store: Store<AppState>) { }
}
