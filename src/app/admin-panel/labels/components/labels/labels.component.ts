import { Component, OnInit } from '@angular/core';


//import { GmailLabelService } from '@app/core/services/label/gmail-label.service';
//import { UserService } from '@app/core/services/auth-user/user.service';

//import { filter, map } from 'rxjs/operators';

import { IGmailLabel } from '../../state/models/gmail-label.model';

import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';

import { GmailLabelsRequested } from '../../state/gmail-label.actions';
import { Observable } from 'rxjs';

import { selectUserGmailLabels } from '../../state/gmail-label.selectors';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})

export class LabelsComponent implements OnInit {
  gmail_labels$: Observable<IGmailLabel[]>; // The list of labels currently in the gmail acc.


  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new GmailLabelsRequested());
    this.gmail_labels$ = this.store.pipe(select(selectUserGmailLabels));
  }


}
