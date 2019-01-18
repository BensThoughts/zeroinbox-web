import { Component, OnInit } from '@angular/core';
import { SuggestedService } from '@app/core/services/gmail-api/suggested/suggested.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { selectSuggestedThreadIds, selectSuggestionsLoaded, selectSendersLess, selectSenders_CountMoreThan } from '@app/core';
// import { selectToken } from '@app/core';

import { Observable, of } from 'rxjs';
import { ISuggested } from '@app/core/state/gmail-api/models/suggested.model';


@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {


  sendersMoreThan$: Observable<ISuggested[]>;
  sendersLessThan$: Observable<ISuggested[]>;

  suggestionsLoaded$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
      this.suggestionsLoaded$ = this.store.pipe(select(selectSuggestionsLoaded));
      this.sendersMoreThan$ = this.store.pipe(select(selectSenders_CountMoreThan));
      this.sendersLessThan$ = this.store.pipe(select(selectSendersLess));
  }

}
