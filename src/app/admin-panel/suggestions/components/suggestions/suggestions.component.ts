import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';

import { Observable } from 'rxjs';
import { selectPercentLoaded } from '@app/core';
import {
  selectSuggestionsLoaded,
  selectByCountGroup_TS,
  selectByCountGroup_TC,
  selectByCountGroup_TL,
} from '../../state/suggestions.selectors';



@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionsComponent implements OnInit {

  suggestionsLoaded$: Observable<boolean>;
  percentLoaded$: Observable<number>;

  totalCounts$;
  totalLengths$;
  totalSizes$;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
      this.suggestionsLoaded$ = this.store.pipe(select(selectSuggestionsLoaded));
      this.percentLoaded$ = this.store.pipe(select(selectPercentLoaded));

      this.totalCounts$ = this.store.pipe(select(selectByCountGroup_TC));
      this.totalLengths$ = this.store.pipe(select(selectByCountGroup_TL));
      this.totalSizes$ = this.store.pipe(select(selectByCountGroup_TS));

  }

}
