import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { fadeElementsAnimation } from '../../animations/elementsAnimations';
import {
  AppState,
  selectBasicProfile,
  selectEmailProfile,
  selectSendersLoaded,
  selectUniqueSenders,
  selectTotalThreads
} from '@app/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BasicProfile, EmailProfile } from '@app/core/state/user/user.model';

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
  sendersLoaded$;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.basic_profile$ = this.store.pipe(select(selectBasicProfile));
    this.email_profile$ = this.store.pipe(select(selectEmailProfile));
    this.total_threads$ = this.store.pipe(select(selectTotalThreads));
    this.unique_senders$ = this.store.pipe(select(selectUniqueSenders));
    this.sendersLoaded$ = this.store.pipe(select(selectSendersLoaded));
  }

  ngOnDestroy() {
  }

}
