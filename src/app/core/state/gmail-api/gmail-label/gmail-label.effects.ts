import { Injectable } from '@angular/core';

import {
  map,
  mergeMap,
  withLatestFrom,
  filter,
  catchError,
  // tap
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
import { AppState } from '@app/core';
import {
  GmailLabelsRequested,
  GmailLabelActionTypes,
  GmailLabelsLoaded,
  GmailLabelsLoadFailure
} from './gmail-label.actions';

import { GmailLabelService } from '../../../services/gmail-api/gmail-label/gmail-label.service';

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


  constructor(
    private actions$: Actions,
    private gmailLabelsService: GmailLabelService,
    private store: Store<AppState>) { }
}
