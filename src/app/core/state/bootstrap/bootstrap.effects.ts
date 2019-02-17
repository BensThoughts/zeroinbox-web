import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  BootstrapActionTypes,
  UpdateBootstrapStateAction,
  AllSuggestionsRequestedAction,
  SuggestionsRequestFailureAction,
  FirstRunStatusRequestedAction,
  LoadingStatusRequestedAction,
  GetAllSuggestionsAction,
  FirstRunStatusRequestFailureAction,
} from './bootstrap.actions';
import { BootstrapService } from '@app/core/services//bootstrap/bootstrap.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import { catchError, map, exhaustMap, tap, concatMap, filter, withLatestFrom, take, delay } from 'rxjs/operators';
import { of, fromEvent } from 'rxjs';
import { ISuggestion } from '@app/admin-panel/suggestions/model/suggestions.model';
import { LoadSuggestionsAction } from '@app/admin-panel/suggestions/state/suggestions.actions';
import { selectSuggestionsLoaded } from '@app/admin-panel/suggestions/state/suggestions.selectors';
import { selectfirstRun } from './bootstrap.selectors';

export const MB = 1000000;
export const DECIMAL = 100;


@Injectable()
export class BootstrapEffects {


  @Effect()
  getAllSuggestions$ = this.actions$
    .pipe(
      ofType<GetAllSuggestionsAction>(BootstrapActionTypes.GetAllSuggestions),
      withLatestFrom(this.store.pipe(select(selectfirstRun))),
      filter(([action, firstRun]) => {
          // console.log(firstRun);
          return firstRun;
      }),
      map(() => {
        return new FirstRunStatusRequestedAction();
        }
      )
    );

  @Effect()
  firstRunStatusRequested$ = this.actions$
    .pipe(
      ofType<FirstRunStatusRequestedAction>(BootstrapActionTypes.FirstRunStatusRequested),
      exhaustMap(() => {
        console.log('FirstRunStatus');
        return this.BootstrapService.getFirstRunStatus().pipe(
          map((response) => {
            console.log(response);
            if (response.status === 'error') {
              return new FirstRunStatusRequestFailureAction();
            }
            if (response.data.firstRun) {
              console.log(response);
              return new LoadingStatusRequestedAction();
            } else {
              return new AllSuggestionsRequestedAction();
            }
          })
        );
      })

    );


  @Effect()
  getLoadingStatus$ = this.actions$
    .pipe(
      ofType<LoadingStatusRequestedAction>(BootstrapActionTypes.LoadingStatusRequested),
      delay(1000),
      concatMap((action) => {
        return this.BootstrapService.getLoadingStatus().pipe(
          map((response) => {
            console.log('Loading status: ' + response);
            if (response.data.loading_status) {
              return new LoadingStatusRequestedAction();
            } else {
              console.log('Bootstrap requested');
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
  allSuggestionsRequested$ = this.actions$
    .pipe(
      ofType<AllSuggestionsRequestedAction>(BootstrapActionTypes.AllSuggestionsRequested),
      exhaustMap((action) => {
        return this.BootstrapService.getSuggestions().pipe(
          map((response) => {
            console.log(response);
            let suggestions: ISuggestion[] = response.data.suggestions.map((suggestion) => {
              // console.log(suggestion);
              let totalSizeEstimate = this.toMB(suggestion.totalSizeEstimate);
              return {
                id: suggestion.senderId,
                fromAddress: suggestion.senderAddress,
                fromName: suggestion.senderNames[0],
                count: suggestion.count,
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
        return evt.key === 'go-app-bootstrap';
      }),
      filter(evt => evt.newValue !== null),
      map(evt => {
        let BootstrapState = JSON.parse(evt.newValue);
        return new UpdateBootstrapStateAction(BootstrapState);
      })
    );

    
  constructor(
    private actions$: Actions,
    private BootstrapService: BootstrapService,
    private store: Store<AppState>) { }
}
