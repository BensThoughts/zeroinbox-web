import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  SuggestedActionTypes,
  SuggestionsRequestedAction,
  InboxThreadIdsRequestedAction,
  InboxThreadIdsRequestFailureAction,
  InboxThreadIdsLoadedAction,
  AddAllThreadIdsAction,
  AddAllSuggestionsAction,
  UpdateSuggestedStateAction,
  SuggestedThreadsRequestFailureAction,
} from './suggested.actions';
import { SuggestedService } from '@app/core/services/gmail-api/suggested/suggested.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core.state';
import { catchError, map, exhaustMap, tap, concatMap, filter, withLatestFrom } from 'rxjs/operators';
import { of, fromEvent } from 'rxjs';
import { selectSuggestionsLoaded } from './suggested.selectors';

@Injectable()
export class SuggestedEffects {

  @Effect()
  suggestionsRequested$ = this.actions$
    .pipe(
      ofType<SuggestionsRequestedAction>(SuggestedActionTypes.SuggestionsRequested),
      withLatestFrom(this.store.pipe(select(selectSuggestionsLoaded))),
      filter(([action, allSuggestionsLoaded]) => !allSuggestionsLoaded),
      map(() => {
        return new InboxThreadIdsRequestedAction();
      })
    )

  @Effect({ dispatch: false })
  inboxThreadIdsRequested$ = this.actions$
    .pipe(
      ofType<InboxThreadIdsRequestedAction>(SuggestedActionTypes.InboxThreadIdsRequested),
      exhaustMap(() => {
        return this.suggestedService.getAllThreadIds({}).pipe(
          map((threadIds) => {
            this.store.dispatch(new AddAllThreadIdsAction(threadIds.threadIds));
            this.store.dispatch(new InboxThreadIdsLoadedAction(threadIds.threadIds));
          }),
          catchError((err) => of(new InboxThreadIdsRequestFailureAction(err)))
        )
      })
    )

  @Effect({ dispatch: false })
  suggestedThreadsRequested$ = this.actions$
      .pipe(
        ofType<InboxThreadIdsLoadedAction>(SuggestedActionTypes.InboxThreadIdsLoaded),
        map((action) => {
          this.suggestedService.batchRequest({ body: action.payload }).subscribe((result) => {
            this.store.dispatch(new AddAllSuggestionsAction(result));
          });
        }),
        catchError((err) => of(new SuggestedThreadsRequestFailureAction(err)))
      );

  @Effect({dispatch: false})
    onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
    // listen to our storage key
      filter((evt) => {
        return evt.key === 'go-app-suggested';
      }),
      filter(evt => evt.newValue !== null),
      map(evt => {
        let suggestedState = JSON.parse(evt.newValue);
        this.store.dispatch(new UpdateSuggestedStateAction(suggestedState));
      })
    );


  constructor(
    private actions$: Actions,
    private suggestedService: SuggestedService,
    private store: Store<AppState>) { }
}
