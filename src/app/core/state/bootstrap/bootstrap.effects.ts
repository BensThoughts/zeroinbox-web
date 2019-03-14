import { Injectable, NgZone } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  BootstrapActionTypes,
  BootstrapAppAction,

  FirstRunStatusRequestAction,
  FirstRunStatusRequestFailureAction,
  UpdateFirstRunAction,

  NavigateToHomePageAction,
  NavigateToDownloadingPageAction,

  DownloadSendersRequestAction,
  DownloadSendersRequestFailureAction,
  UpdateDownloadingStatusAction,

  DownloadingStatusRequestAction,
  DownloadingStatusRequestFailureAction,
  UpdatePercentDownloadedAction,

  UpdateBootstrapStateAction,
  LoadAllDataRequestAction,
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
  delay, 
  tap
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

  @Effect({ dispatch: false })
  firstRunStatusRequested$ = this.actions$
    .pipe(
      ofType<FirstRunStatusRequestAction>(BootstrapActionTypes.FirstRunStatusRequest),
      exhaustMap(() => {
        return this.bootstrapService.getFirstRunStatus().pipe(
          map((response) => {
            if (response.status === 'error') {
              this.store.dispatch(new FirstRunStatusRequestFailureAction());
            }
            this.store.dispatch(new UpdateFirstRunAction({ firstRun: response.data.firstRun }));
            if (response.data.firstRun === true) {
              this.router.navigate([this.bootstrapService.downloadingSendersUrl]);
            } else {
              this.store.dispatch(new LoadAllDataRequestAction());
              this.router.navigate([this.bootstrapService.sendersDownloadedUrl]);
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


  @Effect({ dispatch: false })
  getLoadingStatus$ = this.actions$
    .pipe(
      ofType<DownloadingStatusRequestAction>(BootstrapActionTypes.DownloadingStatusRequest),
      delay(1000),
      concatMap((action) => {
        return this.bootstrapService.getLoadingStatus().pipe(
          map((response) => {
            if (response.status === 'error') {
              this.store.dispatch(new DownloadingStatusRequestFailureAction());
            }
            if (response.data.loadingStatus === true) {
              let percentLoaded = response.data.percentLoaded;
              this.store.dispatch(new UpdatePercentDownloadedAction({ percentLoaded: percentLoaded }))
              this.store.dispatch(new DownloadingStatusRequestAction());
            } else {
              this.router.navigate([this.bootstrapService.sendersDownloadedUrl]);
              this.store.dispatch(new LoadAllDataRequestAction());
            }
          }),
          catchError((err) => {
            console.error(err);
            return of(this.store.dispatch(new DownloadingStatusRequestFailureAction()));
          })
        )
      }),
    );

    @Effect({ dispatch: false })
    loadAllData$ = this.actions$
      .pipe(
        ofType<LoadAllDataRequestAction>(BootstrapActionTypes.LoadAllDataRequest),
        map(() => {
          this.store.dispatch(new SendersRequestAction());
          this.store.dispatch(new SuggestionsRequestAction());
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
    private router: Router,
    private bootstrapService: BootstrapService,
    private ngZone: NgZone,
    private store: Store<AppState>) { }
}



/*   @Effect()
  navigateToHomePage$ = this.actions$
    .pipe(
      ofType<NavigateToHomePageAction>(BootstrapActionTypes.NavigateToHomePage),
      tap(() => {
        this.ngZone.run(() => {
          this.router.navigate([this.bootstrapService.sendersDownloadedUrl])
        });
      })
    )

  @Effect()
  navigateToDownloadingPage$ = this.actions$
    .pipe(
      ofType<NavigateToDownloadingPageAction>(BootstrapActionTypes.NaviagteToDownloadingPage),
      tap(() => {
        this.ngZone.run(() => {
          this.router.navigate([this.bootstrapService.downloadingSendersUrl])
        });
      })
    ) */
