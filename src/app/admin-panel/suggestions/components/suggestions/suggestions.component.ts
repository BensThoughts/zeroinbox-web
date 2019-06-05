import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';

import { Observable } from 'rxjs';
import { selectPercentLoaded, selectByCount, selectBySize } from '@app/core';
import { selectSendersLoaded } from '../../../../core/state/senders/senders.selectors';
import {
  selectSuggestionsLoaded,
  // selectByCountGroup_TS,
  // selectByCountGroup_TC,
  // selectByCountGroup_TL,
} from '../../state/suggestions.selectors';
import { SendersRequestAction } from '@app/core/state/senders/senders.actions';



@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionsComponent implements OnInit {

  sendersLoaded$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
      this.sendersLoaded$ = this.store.pipe(select(selectSendersLoaded));
      this.store.dispatch(new SendersRequestAction());
  }

}
