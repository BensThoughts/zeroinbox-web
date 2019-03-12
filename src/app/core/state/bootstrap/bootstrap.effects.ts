import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  BootstrapActionTypes,
  GetAllSendersAction,

  FirstRunStatusRequestAction,
  FirstRunStatusRequestFailureAction,

  DownloadSendersRequestAction,
  DownloadSendersRequestFailureAction,
  UpdateDownloadingStatusAction,

  DownloadingStatusRequestAction,
  DownloadingStatusRequestFailureAction,
  UpdatePercentDownloadedAction,

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
import { BootstrapAppAction } from './bootstrap.actions';

import {
  SuggestionsRequestAction,
  SuggestionsRequestFailureAction,
} from '@app/admin-panel/suggestions/state/suggestions.actions';
import { Router } from '@angular/router';
import { UserProfileRequestAction } from '../user/user.actions';

export const MB = 1000000;
export const DECIMAL = 100;


@Injectable()
export class BootstrapEffects {

  @Effect()
  getAllSuggestions$ = this.actions$
    .pipe(
      ofType<BootstrapAppAction>(BootstrapActionTypes.BoostrapApp),
      map((action) => {
        return new UserProfileRequestAction();
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
            // this.store.dispatch(new LoginSuccessAction())
            if (response.data.firstRun) {
              this.router.navigate([this.bootstrapService.downloadingSendersUrl])
              return new DownloadSendersRequestAction();
            } else {
              this.router.navigate([this.bootstrapService.sendersDownloadedUrl])
              this.store.dispatch(new SendersRequestAction());
              return new SuggestionsRequestAction();
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
      ofType<DownloadSendersRequestAction>(BootstrapActionTypes.DownloadSendersRequest),
      exhaustMap(() => {
        return this.bootstrapService.getLoadSuggestions().pipe(
          map((response) => {
            if (response.status === 'error') {
              return new DownloadSendersRequestFailureAction();
            } else {
              return new DownloadingStatusRequestAction();
            }
          }),
          catchError((err) => {
            console.error(err);
            return of(new DownloadSendersRequestFailureAction());
          })
        )
      }),
      catchError((err) => {
        console.error(err);
        return of(new DownloadSendersRequestFailureAction());
      })
    );


  @Effect()
  getLoadingStatus$ = this.actions$
    .pipe(
      ofType<DownloadingStatusRequestAction>(BootstrapActionTypes.DownloadingStatusRequest),
      delay(1000),
      concatMap((action) => {
        return this.bootstrapService.getLoadingStatus().pipe(
          map((response) => {
            if (response.status === 'error') {
              return new DownloadingStatusRequestFailureAction();
            }
            if (response.data.loadingStatus) {
              console.log(response.data.percentLoaded);
              let percentLoaded = response.data.percentLoaded;
              this.store.dispatch(new UpdatePercentDownloadedAction({ percentLoaded: percentLoaded }))
              return new DownloadingStatusRequestAction();
            } else {
              this.router.navigate([this.bootstrapService.sendersDownloadedUrl]);
              this.store.dispatch(new SendersRequestAction());
              return new SuggestionsRequestAction();
              // return new SuggestionsRequestAction()
            }
          }),
          catchError((err) => {
            console.error(err);
            return of(new DownloadingStatusRequestFailureAction());
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
    private router: Router,
    private bootstrapService: BootstrapService,
    private store: Store<AppState>) { }
}
