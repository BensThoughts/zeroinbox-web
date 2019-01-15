import { Injectable } from '@angular/core';

import {
  map,
  mergeMap,
  withLatestFrom,
  filter,
  catchError,
  exhaustMap,
  // tap
} from 'rxjs/operators';
import { of, fromEvent } from 'rxjs';

import {
  Actions,
  ofType,
  Effect
} from '@ngrx/effects';

import {
  Store,
  select
} from '@ngrx/store';

import { selectGmailLabelsLoaded } from './gmail-label.selectors';
import { AppState } from '@app/core';
import {
  GmailLabelsRequested,
  GmailLabelActionTypes,
  GmailLabelsLoaded,
  GmailLabelsLoadFailure,
  UpdateGmailLabelStateAction
} from './gmail-label.actions';

import { GmailLabelService } from '../../../services/gmail-api/gmail-label/gmail-label.service';

@Injectable()
export class GmailLabelEffects {

  @Effect()
  loadAllGmailLabels$ = this.actions$
    .pipe(
      ofType<GmailLabelsRequested>(GmailLabelActionTypes.GmailLabelsRequested),
      withLatestFrom(this.store.pipe(select(selectGmailLabelsLoaded))),
      filter(([action, allLabelsLoaded]) => !allLabelsLoaded), // UNSURE
      exhaustMap(() => this.gmailLabelsService.getAllGmailLabels().pipe(
        map(gmailLabels => new GmailLabelsLoaded({gmailLabels})),
        catchError((err) => of(new GmailLabelsLoadFailure(err)))
      )),
    );

    @Effect({dispatch: false})
    onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
      // listen to our storage key
      filter((evt) => {
        // console.log(evt);
        return evt.key === 'go-app-gmailLabel';
      }),
      filter(evt => evt.newValue !== null),
      map(evt => {
        let labelsState = JSON.parse(evt.newValue);
        this.store.dispatch(new UpdateGmailLabelStateAction(labelsState));
      })
    );

  constructor(
    private actions$: Actions,
    private gmailLabelsService: GmailLabelService,
    private store: Store<AppState>) { }
}
