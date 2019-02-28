import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Feature, features } from './features.data';

import { fadeElementsAnimation } from './elementsAnimations';
import {
  AppState,
  selectBasicProfile,
  selectEmailProfile,
  selectPercentLoaded,
} from '@app/core';

import {
  selectUniqueSenders,
  selectSuggestionsLoaded,
} from '@app/admin-panel/suggestions/state/suggestions.selectors';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BasicProfile, EmailProfile } from '@app/core/state/user/user.model';

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
  unique_senders$: Observable<number>;
  percentLoaded$;
  suggestionsLoaded$;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.basic_profile$ = this.store.pipe(select(selectBasicProfile));
    this.email_profile$ = this.store.pipe(select(selectEmailProfile));
    this.unique_senders$ = this.store.pipe(select(selectUniqueSenders));
    this.suggestionsLoaded$ = this.store.pipe(select(selectSuggestionsLoaded));
    this.percentLoaded$ = this.store.pipe(select(selectPercentLoaded));

  }

}
