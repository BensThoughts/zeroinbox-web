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



@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionsComponent implements OnInit {

  sendersLoaded$: Observable<boolean>;
  percentLoaded$: Observable<number>;

  totalCounts$;
  totalLengths$;
  totalSizes$;

  testData$;
  testData$2;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
      this.sendersLoaded$ = this.store.pipe(select(selectSendersLoaded));
      this.percentLoaded$ = this.store.pipe(select(selectPercentLoaded));
      this.testData$ = this.store.pipe(select(selectByCount));
      this.testData$2 = this.store.pipe(select(selectBySize));
      /*       this.totalCounts$ = this.store.pipe(select(selectByCountGroup_TC));
      this.totalLengths$ = this.store.pipe(select(selectByCountGroup_TL));
      this.totalSizes$ = this.store.pipe(select(selectByCountGroup_TS)); */
  }

}
