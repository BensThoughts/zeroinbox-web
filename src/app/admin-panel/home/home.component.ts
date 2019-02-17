import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Feature, features } from './features.data';

import { fadeElementsAnimation } from './elementsAnimations';
import {
  AppState,
  selectBasicProfile,
  selectEmailProfile,

  GmailLabelsRequested,
  selectLabelsLength,
  selectImageUrl,
  selectEmailProfileLoaded
} from '@app/core';

import {
  selectUniqueSenders
} from '@app/admin-panel/suggestions/state/suggestions.selectors';

// import { selectTotal } from '@app/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BasicProfile, EmailProfile } from '@app/core/state/user/user.model';
import { map } from 'rxjs/operators';
import { GetAllSuggestionsAction } from '@app/core/state/gmail-api/bootstrap/bootstrap.actions';
import { LoginCompleteAction } from '../../core/state/auth/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeElementsAnimation],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {
  features: Feature[] = features;

  basic_profile$: Observable<BasicProfile>;
  email_profile$: Observable<EmailProfile>;
  imageUrl$: Observable<string>;
  unique_senders$: Observable<number>;
  labels_length$: Observable<number>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // this.store.dispatch(new GmailLabelsRequested());
    // this.store.pipe(
    //  select(selectEmailProfileLoaded),
    // map((loaded) => {
    //    if (loaded) {
    //      this.store.dispatch(new GetAllSuggestionsAction());
    //    }
    //  })
    //).subscribe()
    this.basic_profile$ = this.store.pipe(select(selectBasicProfile));
    this.email_profile$ = this.store.pipe(select(selectEmailProfile));
    this.unique_senders$ = this.store.pipe(select(selectUniqueSenders));
    this.labels_length$ = this.store.pipe(select(selectLabelsLength));
  }

}
