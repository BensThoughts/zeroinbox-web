import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { selectPercentLoaded } from '../../../core/state/bootstrap/bootstrap.selectors';
import { selectSendersLoaded } from '../../../core/state/senders/senders.selectors';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BasicProfile, EmailProfile } from '../../../core/state/user/user.model';
import { selectBasicProfile, selectEmailProfile } from '../../../core/state/user/user.selectors';
import { DownloadSendersRequestAction } from '../../../core/state/bootstrap/bootstrap.actions';

/**
 * This page is displayed on a users first run ever while the email addresses (aka senders)
 * are downloaded for the first time.
 */

@Component({
  selector: 'go-downloading',
  templateUrl: './downloading.component.html',
  styleUrls: ['./downloading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadingComponent implements OnInit {
  percentLoaded$;
  basic_profile$: Observable<BasicProfile>;
  email_profile$: Observable<EmailProfile>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.basic_profile$ = this.store.pipe(select(selectBasicProfile));
    this.email_profile$ = this.store.pipe(select(selectEmailProfile));
    this.percentLoaded$ = this.store.pipe(select(selectPercentLoaded));
    this.store.dispatch(new DownloadSendersRequestAction({ firstRunStatus: true }));
  }
}
