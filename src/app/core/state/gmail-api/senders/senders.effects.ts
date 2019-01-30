import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  SendersActionTypes,
  SendersRequestedAction,
  InboxThreadIdsRequestedAction,
  InboxThreadIdsRequestFailureAction,
  InboxThreadIdsLoadedAction,
  AddAllThreadIdsAction,
  AddAllSendersAction,
  UpdateSendersStateAction,
  RequestLoadingStatusAction,
  AllSuggestionsRequestedAction,
  SuggestionsRequestFailureAction,
  SendersRequestFailureAction,
} from './senders.actions';
import { SendersService } from '@app/core/services/gmail-api/senders/senders.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core.state';
import { catchError, map, exhaustMap, tap, concatMap, filter, withLatestFrom, take, delay } from 'rxjs/operators';
import { of, fromEvent } from 'rxjs';
import { selectSendersLoaded, selectThreadIdsLoaded } from './senders.selectors';
import { ISuggestion } from '@app/admin-panel/suggestions/state/suggestions.model';
import { LoadSuggestionsAction } from '@app/admin-panel/suggestions/state/suggestions.actions';

export const MB = 1000000;
export const DECIMAL = 100;




@Injectable()
export class SendersEffects {

  @Effect()
  suggestionsRequested$ = this.actions$
    .pipe(
      ofType<SendersRequestedAction>(SendersActionTypes.SendersRequested),
      withLatestFrom(this.store.pipe(select(selectThreadIdsLoaded))),
      filter(([action, allThreadIdsLoaded]) => !allThreadIdsLoaded),
      map(() => {
        return new InboxThreadIdsRequestedAction();
      })
    )

  @Effect()
  inboxThreadIdsRequested$ = this.actions$
    .pipe(
      ofType<InboxThreadIdsRequestedAction>(SendersActionTypes.InboxThreadIdsRequested),
      exhaustMap(() => {
        return this.sendersService.getAllThreadIds({}).pipe(
          map((threadIds) => {
            return new AddAllThreadIdsAction(threadIds.threadIds);
            // this.store.dispatch(new InboxThreadIdsLoadedAction(threadIds.threadIds));
          }),
          catchError((err) => of(new InboxThreadIdsRequestFailureAction(err)))
        )
      })
    )





  @Effect()
  sendersThreadsRequested$ = this.actions$
      .pipe(
        ofType<AddAllThreadIdsAction>(SendersActionTypes.AddAllThreadIds),
        exhaustMap((action) => {
          return this.sendersService.batchRequest({ body: action.payload }).pipe(
            map((loadingStatus) => {
              return new RequestLoadingStatusAction();
              /**
              });**/
              // return new LoadSuggestionsAction({ suggestions: suggestions });
            }),
            // map((iSenders) => {
            //  console.log('dispatch');
            //  this.store.dispatch(new AddAllSendersAction(iSenders));
            // })
            catchError((err) => of(new SendersRequestFailureAction(err)))
          );
        }),
        catchError((err) => of(new SendersRequestFailureAction(err))),

      );

  @Effect()
  getLoadingStatus$ = this.actions$
    .pipe(
      ofType<RequestLoadingStatusAction>(SendersActionTypes.RequestLoadingStatus),
      delay(1000),
      concatMap((action) => {
        return this.sendersService.getLoadingStatus().pipe(
          map((response) => {
            console.log(response);
            if (response.loading) {
              return new RequestLoadingStatusAction();
            } else {
              console.log('senders requested');
              return new AllSuggestionsRequestedAction()
            }
          })
        )
      })

    );

    toMB(totalSizeEstimate: number) {
        if (totalSizeEstimate === undefined) {
          return 0;
        } else {
          let temp = totalSizeEstimate / MB * DECIMAL;
          return Math.round(temp)/DECIMAL;
        }
      }


  @Effect()
  allSendersRequested$ = this.actions$
    .pipe(
      ofType<AllSuggestionsRequestedAction>(SendersActionTypes.AllSuggestionsRequested),
      exhaustMap((action) => {
        return this.sendersService.getSuggestions().pipe(
          map((response) => {
            console.log(response);
            let suggestions: ISuggestion[] = response.suggestions.map((suggestion) => {
              // console.log(suggestion);
              let totalSizeEstimate = this.toMB(suggestion.sender.totalSizeEstimate);
              return {
                id: suggestion.sender.id,
                fromAddress: suggestion.sender.fromAddress,
                fromName: suggestion.sender.fromNames[0],
                count: suggestion.sender.count,
                totalSizeEstimate: totalSizeEstimate
              };
            })
            console.log('suggestions response');
            return new LoadSuggestionsAction({ suggestions: suggestions });
          }),
          catchError((err) => {
            console.error(err);
            return of(new SuggestionsRequestFailureAction(err));
          })
        );
      }),
      catchError((err) => {
        return of(console.error(err));
      })
    );

  @Effect()
    onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
    // listen to our storage key
      filter((evt) => {
        return evt.key === 'go-app-senders';
      }),
      filter(evt => evt.newValue !== null),
      map(evt => {
        let sendersState = JSON.parse(evt.newValue);
        return new UpdateSendersStateAction(sendersState);
      })
    );


  constructor(
    private actions$: Actions,
    private sendersService: SendersService,
    private store: Store<AppState>) { }
}
