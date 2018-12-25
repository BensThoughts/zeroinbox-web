import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { GmailLabelService } from '../services/gmail-label/gmail-label.service';
//import { AppState } from '@app/core/state/core.state';
import { Store } from '@ngrx/store';
import { GmailLabelsRequested, GmailLabelActionTypes, GmailLabelsLoaded } from './gmail-label.actions';
import { map, mergeMap } from 'rxjs/operators';
import { UserService } from '@app/core/services/auth-user/user.service';


@Injectable()
export class GmailLabelEffects {

  @Effect()
  loadAllGmailLabels$ = this.actions$
    .pipe(
      ofType<GmailLabelsRequested>(GmailLabelActionTypes.GmailLabelsRequested),
//      withLatestFrom(this.store.pipe(select(allCoursesLoaded))),
//      filter(([action, allCoursesLoaded]) => !allCoursesLoaded),
//      mergeMap(() => this.coursesService.findAllCourses()),
      mergeMap(() => this.gmailLabelsService.getAllGmailLabels(this.userService.getToken())),
      map(gmailLabels => new GmailLabelsLoaded({gmailLabels}))
    );

  constructor(private actions$ :Actions, private gmailLabelsService: GmailLabelService,
              /*private store: Store<AppState>,*/ private userService: UserService) {

  }
}
