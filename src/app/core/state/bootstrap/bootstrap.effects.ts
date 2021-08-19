import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  BootstrapActionTypes,
  BootstrapAppAction,
  FirstRunStatusRequestAction,
  FirstRunStatusRequestFailureAction,
  UpdateFirstRunAction,
  DownloadSendersRequestAction,
  DownloadSendersRequestFailureAction,
  DownloadingStatusRequestAction,
  DownloadingStatusRequestFailureAction,
  UpdatePercentDownloadedAction,
  UpdateBootstrapStateAction,
  LoadAllDataRequestAction,
  // DownloadSendersRequestSuccessAction,
  UpdateIsBootstrappedAction
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
  // withLatestFrom,
  delay
  // tap
} from 'rxjs/operators';
import { of, fromEvent } from 'rxjs';
import { SendersRequestAction } from '../senders/senders.actions';

import { Router } from '@angular/router';
import { UserProfileRequestAction } from '../user/user.actions';
import { UpdateDownloadingStatusAction } from './bootstrap.actions';
import { SettingsGetCategoriesRequestAction } from '../settings/settings.actions';
import { LogService } from '@app/core/services/log/log.service';

export const MB = 1000000;
export const DECIMAL = 100;

@Injectable()
export class BootstrapEffects {
  getAllSenders$ = createEffect(() =>
    this.actions$.pipe(
      ofType<BootstrapAppAction>(BootstrapActionTypes.BoostrapApp),
      map((action) => {
        return new UserProfileRequestAction();
      })
    )
  );

  firstRunStatusRequested$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<FirstRunStatusRequestAction>(
          BootstrapActionTypes.FirstRunStatusRequest
        ),
        exhaustMap(() => {
          return this.bootstrapService.getFirstRunStatus().pipe(
            map((response) => {
              if (response.status === 'error') {
                this.store.dispatch(new FirstRunStatusRequestFailureAction());
              }
              this.store.dispatch(
                new UpdateFirstRunAction({ firstRun: response.data.firstRun })
              );
              if (response.data.firstRun === true) {
                this.store.dispatch(
                  new UpdateDownloadingStatusAction({ downloadingStatus: true })
                );
                this.router.navigate([
                  this.bootstrapService.downloadingSendersUrl
                ]);
              } else {
                this.store.dispatch(
                  new DownloadSendersRequestAction({ firstRunStatus: false })
                );
                this.store.dispatch(
                  new UpdateIsBootstrappedAction({ isBootstrapped: true })
                );
                this.router.navigate([
                  this.bootstrapService.sendersDownloadedUrl
                ]);
              }
            }),
            catchError((err) => {
              this.logService.error(err);
              return of(new FirstRunStatusRequestFailureAction());
            })
          );
        })
      ),
    { dispatch: false }
  );

  loadSendersRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DownloadSendersRequestAction>(
        BootstrapActionTypes.DownloadSendersRequest
      ),
      exhaustMap((action) => {
        return this.bootstrapService.getLoadSuggestions().pipe(
          map((response) => {
            if (response.status === 'error') {
              this.logService.error(response.status_message);
              return new DownloadSendersRequestFailureAction();
            } else {
              if (action.payload.firstRunStatus) {
                return new DownloadingStatusRequestAction();
              } else {
                return new LoadAllDataRequestAction();
              }
            }
          }),
          catchError((err) => {
            this.logService.error(err, 'connection');
            return of(new DownloadSendersRequestFailureAction());
          })
        );
      }),
      catchError((err) => {
        this.logService.error(err);
        return of(new DownloadSendersRequestFailureAction());
      })
    )
  );

  getLoadingStatus$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<DownloadingStatusRequestAction>(
          BootstrapActionTypes.DownloadingStatusRequest
        ),
        delay(1000),
        concatMap((action) => {
          return this.bootstrapService.getLoadingStatus().pipe(
            map((response) => {
              if (response.status === 'error') {
                this.logService.error(response.status_message);
                this.store.dispatch(
                  new DownloadingStatusRequestFailureAction()
                );
              }
              if (response.data.loadingStatus === true) {
                let percentLoaded = response.data.percentLoaded;
                this.store.dispatch(
                  new UpdatePercentDownloadedAction({
                    percentLoaded: percentLoaded
                  })
                );
                this.store.dispatch(new DownloadingStatusRequestAction());
              } else {
                this.store.dispatch(
                  new UpdateDownloadingStatusAction({
                    downloadingStatus: false
                  })
                );
                this.store.dispatch(
                  new UpdateIsBootstrappedAction({ isBootstrapped: true })
                );
                this.router.navigate([
                  this.bootstrapService.sendersDownloadedUrl
                ]);
                this.store.dispatch(new LoadAllDataRequestAction());
              }
            }),
            catchError((err) => {
              this.logService.error(err, 'connection');
              return of(
                this.store.dispatch(new DownloadingStatusRequestFailureAction())
              );
            })
          );
        })
      ),
    { dispatch: false }
  );

  loadAllData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<LoadAllDataRequestAction>(
          BootstrapActionTypes.LoadAllDataRequest
        ),
        map(() => {
          this.store.dispatch(new SendersRequestAction());
          this.store.dispatch(new SettingsGetCategoriesRequestAction());
        })
      ),
    { dispatch: false }
  );

  onChange$ = createEffect(() =>
    fromEvent<StorageEvent>(window, 'storage').pipe(
      // listen to our storage key
      filter((evt) => {
        return evt.key === 'app-bootstrap';
      }),
      filter((evt) => evt.newValue !== null),
      map((evt) => {
        let BootstrapState = JSON.parse(evt.newValue);
        return new UpdateBootstrapStateAction(BootstrapState);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private bootstrapService: BootstrapService,
    // private ngZone: NgZone,
    private store: Store<AppState>,
    private logService: LogService
  ) {}
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
