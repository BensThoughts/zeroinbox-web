import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState, UpsertTasksAction, AddTasksAction } from '@app/core';
import {
  SuggestionsActionTypes,
  SuggestionsRequestAction,
  SuggestionsRequestFailureAction,
  LoadSuggestionsAction,
  DeleteSuggestionsAction,
  UpdateSuggestionsAction,
  LabelByNameSuggestionsAction,
  DeleteSuggestionsMetaAction,
  LabelBySizeSuggestionsAction
} from './suggestions.actions';
import { map, filter, take, mergeMap, exhaustMap, catchError } from 'rxjs/operators';
import { ITask } from '@app/core/state/tasks/tasks.model';
import { ISuggestion } from '../model/suggestions.model';
import { Update } from '@ngrx/entity';
import { select_Tasks_Suggestions_Entities, selectEntities } from './suggestions.selectors';
import { UpdateSuggestionsStateAction } from './suggestions.actions';
import { fromEvent, of } from 'rxjs';
import { selectSendersById } from '@app/core';
import { SuggestionsService } from '@app/core/services/suggestions/suggestions.service';
import { TaskActionTypes } from '../../../core/state/tasks/tasks.actions';


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
    map((action) => {
      let deleteTasks = action.payload.tasks.deleteTasks;
      let labelByNameTasks = action.payload.tasks.labelByNameTasks;
      let labelBySizeTasks = action.payload.tasks.labelBySizeTasks;
      let labelByCountTasks = action.payload.tasks.labelByCountTasks;
      if (deleteTasks) {
        this.store.dispatch(new DeleteSuggestionsAction({ ids: deleteTasks }));
      }
      if (labelByNameTasks) {
        let changesArray: Update<ISuggestion>[] = labelByNameTasks.map((id) => {
          let changes = {
            labelByName: true
          }
          return {
            id: id,
            changes
          }
        });
        this.store.dispatch(new UpdateSuggestionsAction({ suggestions: changesArray }))
        // this.store.dispatch(new LabelByNameSuggestionsAction({ ids: labelByNameTasks}));
      }
      if (labelBySizeTasks) {
        let changesArray: Update<ISuggestion>[] = labelBySizeTasks.map((id) => {
          let changes = {
            labelBySize: true
          }
          return {
            id: id,
            changes
          }
        });
        this.store.dispatch(new UpdateSuggestionsAction({ suggestions: changesArray }))
        // this.store.dispatch(new LabelBySizeSuggestionsAction({ ids: labelBySizeTasks }));
      }
    })
  );


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
            let senderIds = response.data.suggestions.senderIds;
            let suggestions: ISuggestion[] = senderIds.map((senderId) => {
              return {
                id: senderId,
                labelByName: false,
                labelByCount: false,
                labelBySize: false,
                delete: false,
              }
            });
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



/*   // OLD, better not to listen for extra actions even if simplifies code
  @Effect({ dispatch: false })
  labelByNameActions$ = this.actions$.pipe(
    ofType<LabelByNameSuggestionsAction>(SuggestionsActionTypes.LabelByNameSuggestions),
    map((action) => {
      let changesArray: Update<ISuggestion>[] = action.payload.ids.map((id) => {
        let changes = {
          labelByName: true
        }
        return {
          id: id,
          changes
        }
      });
      this.store.dispatch(new UpdateSuggestionsAction({ suggestions: changesArray }));
    })
  );

  // OLD, better not to listen for extra actions even if simplifies code
  @Effect({ dispatch: false })
  labelBySizeActions$ = this.actions$.pipe(
    ofType<LabelBySizeSuggestionsAction>(SuggestionsActionTypes.LabelBySizeSuggestions),
    map((action) => {
      let changesArray: Update<ISuggestion>[] = action.payload.ids.map((id) => {
        let changes = {
          labelBySize: true
        }
        return {
          id: id,
          changes
        }
      });
      this.store.dispatch(new UpdateSuggestionsAction({ suggestions: changesArray }));
    })
  ); */
