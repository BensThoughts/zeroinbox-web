import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';

import { Observable } from 'rxjs';
import { selectPercentLoaded, selectByCount, selectBySize } from '@app/core';
import { selectSendersLoaded } from '../../../../core/state/senders/senders.selectors';
import {
  selectSuggestionsLoaded, selectCurrentSender
} from '../../state/suggestions.selectors';
import { SendersRequestAction } from '@app/core/state/senders/senders.actions';
import { ISender } from '../../../../core/state/senders/model/senders.model';



@Component({
  selector: 'app-sender-view-card',
  templateUrl: './sender-view-card.component.html',
  styleUrls: ['./sender-view-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SenderViewCardComponent implements OnInit {

  sendersLoaded$: Observable<boolean>;
  currentSender$: Observable<ISender>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.sendersLoaded$ = this.store.pipe(select(selectSendersLoaded));
    this.currentSender$ = this.store.pipe(select(selectCurrentSender));
  }

}
