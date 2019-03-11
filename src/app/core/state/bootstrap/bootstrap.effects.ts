import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  BootstrapActionTypes,
  GetAllSuggestionsAction,

  FirstRunStatusRequestAction,
  FirstRunStatusRequestFailureAction,

  LoadSuggestionsRequestAction,
  LoadSuggestionsRequestFailureAction,

  LoadingStatusRequestAction,
  LoadingStatusRequestFailureAction,
  UpdatePercentLoadedAction,

  UpdateBootstrapStateAction,
  UpdateFirstRunAction,
} from './bootstrap.actions';
import { BootstrapService } from '@app/core/services//bootstrap/bootstrap.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import { 
  catchError, 
  map, 
  exhaustMap, 
  concatMap, 
  filter, 
  withLatestFrom, 
  delay 
} from 'rxjs/operators';
import { of, fromEvent } from 'rxjs';
import { ISuggestion } from '@app/admin-panel/suggestions/model/suggestions.model';
import { LoadSuggestionsAction } from '@app/admin-panel/suggestions/state/suggestions.actions';
import { LoginSuccessAction } from '../auth/auth.actions';
import { SendersRequestAction } from '../senders/senders.actions';
import { selectSendersById } from '../senders/senders.selectors';

import {
  SuggestionsRequestAction,
  SuggestionsRequestFailureAction,
} from '@app/admin-panel/suggestions/state/suggestions.actions';

export const MB = 1000000;
export const DECIMAL = 100;


@Injectable()
export class BootstrapEffects {


  @Effect()
  getAllSuggestions$ = this.actions$
    .pipe(
      ofType<GetAllSuggestionsAction>(BootstrapActionTypes.GetAllSenders),
      map(() => {
        return new FirstRunStatusRequestAction();
        }
      )
    );

  @Effect()
  firstRunStatusRequested$ = this.actions$
    .pipe(
      ofType<FirstRunStatusRequestAction>(BootstrapActionTypes.FirstRunStatusRequest),
      exhaustMap(() => {
        return this.bootstrapService.getFirstRunStatus().pipe(
          map((response) => {
            if (response.status === 'error') {
              return new FirstRunStatusRequestFailureAction();
            }
            this.store.dispatch(new UpdateFirstRunAction({ firstRun: response.data.firstRun }));
            this.store.dispatch(new LoginSuccessAction())
            if (response.data.firstRun) {
              return new LoadSuggestionsRequestAction();
            } else {
              this.store.dispatch(new SuggestionsRequestAction());
              return new SendersRequestAction();
              // return new SuggestionsRequestAction();
            }
          }),
          catchError((err) => {
            console.error(err);
            return of(new FirstRunStatusRequestFailureAction());
          })
        );
      }),
    );

  @Effect()
  loadSuggestionsRequest$ = this.actions$
    .pipe(
      ofType<LoadSuggestionsRequestAction>(BootstrapActionTypes.LoadSuggestionsRequest),
      exhaustMap(() => {
        return this.bootstrapService.getLoadSuggestions().pipe(
          map((response) => {
            if (response.status === 'error') {
              return new LoadSuggestionsRequestFailureAction();
            } else {
              return new LoadingStatusRequestAction();
            }
          }),
          catchError((err) => {
            console.error(err);
            return of(new LoadSuggestionsRequestFailureAction());
          })
        )
      }),
      catchError((err) => {
        console.error(err);
        return of(new LoadSuggestionsRequestFailureAction());
      })
    );


  @Effect()
  getLoadingStatus$ = this.actions$
    .pipe(
      ofType<LoadingStatusRequestAction>(BootstrapActionTypes.LoadingStatusRequest),
      delay(1000),
      concatMap((action) => {
        return this.bootstrapService.getLoadingStatus().pipe(
          map((response) => {
            if (response.status === 'error') {
              return new LoadingStatusRequestFailureAction();
            }
            if (response.data.loadingStatus) {
              console.log(response.data.percentLoaded);
              let percentLoaded = response.data.percentLoaded;
              this.store.dispatch(new UpdatePercentLoadedAction({ percentLoaded: percentLoaded }))
              return new LoadingStatusRequestAction();
            } else {
              this.store.dispatch(new SuggestionsRequestAction());
              return new SendersRequestAction();
              // return new SuggestionsRequestAction()
            }
          }),
          catchError((err) => {
            console.error(err);
            return of(new LoadingStatusRequestFailureAction());
          })
        )
      }),
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
        // this.store.dispatch(new SyncToStorageAction({ syncToStorage: false }));
        return new UpdateBootstrapStateAction(BootstrapState);
      })
    );

    
  constructor(
    private actions$: Actions,
    private bootstrapService: BootstrapService,
    private store: Store<AppState>) { }
}
