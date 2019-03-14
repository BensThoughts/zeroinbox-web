import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState, AddTasksAction } from '@app/core';
import {
  SuggestionsActionTypes,
  SuggestionsRequestAction,
  SuggestionsRequestFailureAction,
  LoadSuggestionsAction,
  DeleteSuggestionsAction,
  UpdateSuggestionsAction,
} from './suggestions.actions';
import { map, filter, exhaustMap, catchError, concatMap, take, withLatestFrom } from 'rxjs/operators';
import { ISuggestion } from '../model/suggestions.model';
import { Update } from '@ngrx/entity';
import { UpdateSuggestionsStateAction } from './suggestions.actions';
import { fromEvent, of } from 'rxjs';
import { SuggestionsService } from '@app/core/services/suggestions/suggestions.service';
import { TaskActionTypes } from '../../tasks/state/tasks.actions';
import { selectSuggestionAndSenderEntities } from './suggestions.selectors';


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
  addTasksActions$ = this.actions$.pipe(
    ofType<AddTasksAction>(TaskActionTypes.AddTasks),
    concatMap((action) => {
      return this.store.pipe(
        select(selectSuggestionAndSenderEntities),
        take(1),
        map((suggestionsAndSenders) => {
          let deleteTasks = action.payload.tasks.deleteTasks;
          let deleteChangesArray: Update<ISuggestion>[] = [];
          let labelByNameTasks = action.payload.tasks.labelByNameTasks;
          let byNameChangesArray: Update<ISuggestion>[] = [];
          let labelBySizeTasks = action.payload.tasks.labelBySizeTasks;
          let bySizeChangesArray: Update<ISuggestion>[] = [];
          if (deleteTasks) {
            deleteChangesArray = deleteTasks.map((id) => {
              let changes = {
                delete: true,
                labelByName: false,
                labelBySize: false,
                labelByCount: false
              }
              return {
                id: id,
                changes
              }
            });
          }
          if (labelByNameTasks) {
            byNameChangesArray = labelByNameTasks.map((id) => {
              let sender = suggestionsAndSenders.senders[id];
              let suggestion = suggestionsAndSenders.suggestions[id];
              let storedLabels = [];
              if (suggestion.labelNames) {
                storedLabels = suggestion.labelNames;
              }
              let newLabel = sender.fromName;
              let changes = {
                labelByName: true,
                labelNames: storedLabels.concat(newLabel)
              }
              return {
                id: id,
                changes
              }
            });
          }
          if (labelBySizeTasks) {
            bySizeChangesArray = labelBySizeTasks.map((id) => {
              let sender = suggestionsAndSenders.senders[id];
              let suggestion = suggestionsAndSenders.suggestions[id];
              let storedLabels = [];
              if (suggestion.labelNames) {
                storedLabels = suggestion.labelNames;
              }
              let newLabel = sender.fromName;
              let changes = {
                labelBySize: true,
                labelNames: storedLabels.concat(newLabel)
              }
              return {
                id: id,
                changes
              }
            });
          }
          let changesArray: Update<ISuggestion>[] = deleteChangesArray
          .concat(byNameChangesArray)
          .concat(bySizeChangesArray);
          this.store.dispatch(new UpdateSuggestionsAction({ suggestions: changesArray }));
        })
      )


     
    })
  );

  @Effect({ dispatch: false })
  updateSuggestions$ = this.actions$
    .pipe(
      ofType<UpdateSuggestionsAction>(SuggestionsActionTypes.UpdateSuggestions),
      concatMap((action) => {
        return this.suggestionsService.postSuggestions(action.payload.suggestions).pipe(
          catchError((err) => {
            return of(console.error(err));
          })
        );
      })
    )


  @Effect({ dispatch: false })
  suggestionsRequest$ = this.actions$
    .pipe(
      ofType<SuggestionsRequestAction>(SuggestionsActionTypes.SuggestionsRequest),
      exhaustMap(() => {
        return this.suggestionsService.getSuggestions().pipe(
          map((response) => {
            if (response.status === 'error') {
              this.store.dispatch(new SuggestionsRequestFailureAction());
            }
            let suggestions = response.data.suggestions;
            console.log(suggestions);
            // let suggestions: ISuggestion[] = senderIds.map((senderId) => {
            //  return {
            //    id: senderId,
            //    labelByName: false,
            //    labelByCount: false,
            //    labelBySize: false,
            //    delete: false,
            //  }
            // });
            this.store.dispatch(new LoadSuggestionsAction({ suggestions: suggestions }));
          }),
          catchError((err) => {
            return of(new SuggestionsRequestFailureAction());
          })
        )
      })
    );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private suggestionsService: SuggestionsService) { }
}
