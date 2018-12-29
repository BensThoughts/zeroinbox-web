import { Injectable } from '@angular/core';

import {
  map,
  mergeMap,
  withLatestFrom,
  filter,
  catchError,
  tap
} from 'rxjs/operators';
import { of } from 'rxjs';

import {
  Actions,
  ofType,
  Effect
} from '@ngrx/effects';

import {
  Store,
  select
} from '@ngrx/store';

import { allGmailLabelsLoaded } from './gmail-label.selectors';
import { AppState, LocalStorageService } from '@app/core';
import {
  GmailLabelsRequested,
  GmailLabelActionTypes,
  GmailLabelsLoaded,
  GmailLabelsLoadFailure
} from './gmail-label.actions';

import { GmailLabelService } from '../services/gmail-label/gmail-label.service';

// import { LocalStorageService } from '@app/core';

export const GMAIL_LABELS_KEY = 'GMAIL-LABELS';

@Injectable()
export class GmailLabelEffects {

  @Effect()
  loadAllGmailLabels$ = this.actions$
    .pipe(
      ofType<GmailLabelsRequested>(GmailLabelActionTypes.GmailLabelsRequested),
      withLatestFrom(this.store.pipe(select(allGmailLabelsLoaded))),
      filter(([action, allLabelsLoaded]) => !allLabelsLoaded), // UNSURE
      mergeMap(() => this.gmailLabelsService.getAllGmailLabels().pipe(
        map(gmailLabels => new GmailLabelsLoaded({gmailLabels})),
        catchError((err) => of(new GmailLabelsLoadFailure(err)))
      )),
    );


    @Effect({dispatch: false})
    allGmailLabelsLoaded$ = this.actions$
      .pipe(
        ofType<GmailLabelsLoaded>(GmailLabelActionTypes.GmailLabelsLoaded),
        tap((action) => this.localStorageService.setItem(GMAIL_LABELS_KEY,
          {
            allLabelsLoaded: true,
            entities: action.payload.gmailLabels
          }
        ))
      );

  constructor(
    private actions$: Actions,
    private gmailLabelsService: GmailLabelService,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService) { }
}
