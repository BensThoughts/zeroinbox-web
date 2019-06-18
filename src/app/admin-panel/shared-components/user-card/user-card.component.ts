import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { Observable } from 'rxjs';
import { BasicProfile, EmailProfile } from '@app/core/state/user/user.model';
import { selectBasicProfile, selectEmailProfile } from '@app/core/state/user/user.selectors';

/**
 * This page is displayed on a users first run ever while the email addresses (aka senders)
 * are downloaded for the first time.
 */

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent implements OnInit {
  basic_profile$: Observable<BasicProfile>;
  email_profile$: Observable<EmailProfile>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.basic_profile$ = this.store.pipe(select(selectBasicProfile));
    this.email_profile$ = this.store.pipe(select(selectEmailProfile));
  }
}
