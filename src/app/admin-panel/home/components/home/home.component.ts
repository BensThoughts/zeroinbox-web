import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { fadeElementsAnimation } from '../../animations/elementsAnimations';
import {
  AppState,
  selectBasicProfile,
  selectEmailProfile,
  selectSendersLoaded,
  selectUniqueSenders,
  selectTotalThreads,
  selectByCountGroup_TL,
  selectBySizeGroup_TL,
} from '@app/core';

import { Store, select } from '@ngrx/store';
import { Observable} from 'rxjs';
import { BasicProfile, EmailProfile } from '@app/core/state/user/user.model';
import { selectTotalSubscriptions } from '@app/admin-panel/subscriptions/state/subscriptions.selectors';
import { LoadAllDataRequestAction } from '../../../../core/state/bootstrap/bootstrap.actions';
import { ISizes } from '@app/core/state/senders/model/sizes.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeElementsAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {

  basic_profile$: Observable<BasicProfile>;
  email_profile$: Observable<EmailProfile>;
  unique_senders$: Observable<number>;
  total_threads$: Observable<number>;
  total_subscriptions$: Observable<number>;
  sendersLoaded$: Observable<boolean>;


  cg_Tl$: Observable<ISizes>;
  sg_Tl$: Observable<ISizes>;
  sizesColumnNames = ['Threads', 'over 1MB', '1MB - 500KB', '500KB - 300KB', '300KB - 200KB', 'under 200KB'];
  countColumnNames = ['Threads', 'over 500', '500 - 100', '50 - 100', '15 - 50', 'under 15'];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadAllDataRequestAction());
    this.basic_profile$ = this.store.pipe(select(selectBasicProfile));
    this.email_profile$ = this.store.pipe(select(selectEmailProfile));
    this.total_threads$ = this.store.pipe(select(selectTotalThreads));
    this.total_subscriptions$ = this.store.pipe(select(selectTotalSubscriptions))
    this.unique_senders$ = this.store.pipe(select(selectUniqueSenders));
    this.sendersLoaded$ = this.store.pipe(select(selectSendersLoaded));
    this.sg_Tl$ = this.store.pipe(select(selectBySizeGroup_TL));
    this.cg_Tl$ = this.store.pipe(select(selectByCountGroup_TL));
  }

  ngOnDestroy() { }

}
