import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Feature, features } from './features.data';

import { fadeElementsAnimation } from './elementsAnimations';
import { SuggestionsRequestedAction, AppState, selectBasicProfile, selectEmailProfile, selectUniqueSenders, GmailLabelsRequested, selectLabelsLength } from '@app/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeElementsAnimation],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {
  features: Feature[] = features;

  basic_profile$: any;
  email_profile$: any;
  unique_senders$: Observable<number>;
  labels_length$: Observable<number>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GmailLabelsRequested());
    this.store.dispatch(new SuggestionsRequestedAction());
    this.basic_profile$ = this.store.pipe(select(selectBasicProfile));
    this.email_profile$ = this.store.pipe(select(selectEmailProfile));
    this.unique_senders$ = this.store.pipe(select(selectUniqueSenders));
    this.labels_length$ = this.store.pipe(select(selectLabelsLength));
  }

}
