import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Feature, features } from './features.data';

import { fadeElementsAnimation } from './elementsAnimations';
import {
  AppState,
  selectBasicProfile,
  selectEmailProfile,
  selectSendersLoaded,
  selectUniqueSenders,
} from '@app/core';

import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BasicProfile, EmailProfile } from '@app/core/state/user/user.model';
import { selectSendersFromSuggestionIds, selectSendersNotLabeledBySize } from '../suggestions/state/suggestions.selectors';
import { selectSubscriptionSenders } from '../subscriptions/state/subscriptions.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeElementsAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {
  features: Feature[] = features;

  basic_profile$: Observable<BasicProfile>;
  email_profile$: Observable<EmailProfile>;
  unique_senders$: Observable<number>;
  sendersLoaded$;

  labelByNameCache$: Subscription;
  labelBySizeCache$: Subscription;
  subscriptionSendersCache$: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.basic_profile$ = this.store.pipe(select(selectBasicProfile));
    this.email_profile$ = this.store.pipe(select(selectEmailProfile));
    
    this.unique_senders$ = this.store.pipe(select(selectUniqueSenders));
    this.sendersLoaded$ = this.store.pipe(select(selectSendersLoaded));

    this.labelByNameCache$ = this.store.pipe(
      select(selectSendersFromSuggestionIds)
      ).subscribe();

    this.labelBySizeCache$ = this.store.pipe(
      select(selectSendersNotLabeledBySize)
    ).subscribe();

    this.subscriptionSendersCache$ = this.store.pipe(
      select(selectSubscriptionSenders)
    ).subscribe();
  }

  ngOnDestroy() {
    this.labelByNameCache$.unsubscribe();
    this.labelBySizeCache$.unsubscribe();
    this.subscriptionSendersCache$.unsubscribe();
  }

}
