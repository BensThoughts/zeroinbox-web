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

  totalCounts$;
  totalLengths$;
  totalSizes$;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
      this.suggestionsLoaded$ = this.store.pipe(select(selectSuggestionsLoaded));


      this.totalCounts$ = this.store.pipe(select(selectByCountGroup_TC));
      this.totalLengths$ = this.store.pipe(select(selectByCountGroup_TL));
      this.totalSizes$ = this.store.pipe(select(selectByCountGroup_TS));

  }

}
