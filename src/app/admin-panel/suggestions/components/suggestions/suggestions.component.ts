import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import {
  selectSendersThreadIds,
  selectSendersLoaded,
} from '@app/core';
// import { selectToken } from '@app/core';

import { Observable, of } from 'rxjs';
import {
  selectSuggestions_CountMoreThan,
  selectSuggestionsLoaded,
  selectBySize_Total,
  selectByCount_MoreThanTotal
} from '../../state/suggestions.selectors';

import { ISuggestion } from '../../state/suggestions.model';


@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionsComponent implements OnInit {

  suggestionsLoaded$: Observable<boolean>;

  suggestions$: Observable<ISuggestion[]>;
  sizeSuggestions$;

  totalSizes$;
  totalCounts$;


  constructor(private store: Store<AppState>) { }

  ngOnInit() {
      this.suggestionsLoaded$ = this.store.pipe(select(selectSuggestionsLoaded));
      // this.suggestions$ = this.store.pipe(select(selectSuggestions_CountMoreThan));





      this.totalSizes$ = this.store.pipe(select(selectBySize_Total));
      this.totalCounts$ = this.store.pipe(select(selectByCount_MoreThanTotal));
  }

}
