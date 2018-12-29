import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CollectInboxMessageIds, SuggestedActionTypes } from './suggested.actions';
import { SuggestedService } from '@app/core/services/gmail-api/suggested/suggested.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../core.state';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class SuggestedEffects {

  @Effect({dispatch: false})
  loadInboxMessageIds$ = this.actions$
    .pipe(
      ofType<CollectInboxMessageIds>(SuggestedActionTypes.CollectInboxMessageIds),
      // withLatestFrom(this.store.pipe(select(allGmailLabelsLoaded))),
      // filter(([action, allLabelsLoaded]) => !allLabelsLoaded), // UNSURE
      mergeMap(() => this.suggestedService.getAllInboxMessageIds()) // .pipe(
        // map(gmailLabels => new GmailLabelsLoaded({gmailLabels})),
        // catchError((err) => of(new GmailLabelsLoadFailure(err)))
      // )),
    );


  constructor(
    private actions$: Actions,
    private suggestedService: SuggestedService,
    private store: Store<AppState>) { }
}
