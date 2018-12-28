import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { GmailLabelService } from '../services/gmail-label/gmail-label.service';
//import { AppState } from '@app/core/state/core.state';
import { Store, select } from '@ngrx/store';
import { GmailLabelsRequested, GmailLabelActionTypes, GmailLabelsLoaded } from './gmail-label.actions';
import { map, mergeMap, withLatestFrom, filter } from 'rxjs/operators';

import { allGmailLabelsLoaded } from './gmail-label.selectors';

import { AuthUserService } from '@app/core/services/auth-user/auth-user.service';
import { AppState } from '@app/core';

import { LocalStorageService } from '@app/core';


@Injectable()
export class GmailLabelEffects {

  @Effect()
  loadAllGmailLabels$ = this.actions$
    .pipe(
      ofType<GmailLabelsRequested>(GmailLabelActionTypes.GmailLabelsRequested),
      withLatestFrom(this.store.pipe(select(allGmailLabelsLoaded))),
      filter(([action, allLabelsLoaded]) => !allLabelsLoaded), // UNSURE
      mergeMap(() => this.gmailLabelsService.getAllGmailLabels(this.userService.getToken())),
      map(gmailLabels => new GmailLabelsLoaded({gmailLabels}))
    );

  constructor(private actions$ :Actions, private gmailLabelsService: GmailLabelService,
              private store: Store<AppState>, private userService: AuthUserService) {

  }
}
