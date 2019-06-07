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
import { Observable } from 'rxjs';
import { BasicProfile, EmailProfile } from '@app/core/state/user/user.model';
import { selectTotalSubscriptions } from '@app/admin-panel/subscriptions/state/subscriptions.selectors';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
  animations: [fadeElementsAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainHomeComponent implements OnInit {


  constructor(private store: Store<AppState>) { }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

}
