import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import {
  selectSendersThreadIds,
  selectSendersLoaded,
  selectSenders_CountMoreThan
} from '@app/core';
// import { selectToken } from '@app/core';

import { Observable, of } from 'rxjs';
import { ISenders } from '@app/core/state/gmail-api/models/senders.model';
import { fadeElementsAnimation } from '@app/admin-panel/home/elementsAnimations';
import { selectCountCutoff } from '@app/admin-panel/settings/state/settings.selectors';


@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
  animations: [fadeElementsAnimation],
})
export class SuggestionsComponent implements OnInit {


  sendersMoreThan$: Observable<ISenders[]>;
  sendersLessThan$: Observable<ISenders[]>;
  sendersLessThanCount$: Observable<number>;
  cutoff$: Observable<number>;
  suggestionsLoaded$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
      this.suggestionsLoaded$ = this.store.pipe(select(selectSendersLoaded));
      this.sendersMoreThan$ = this.store.pipe(select(selectSenders_CountMoreThan));
      // this.sendersLessThanCount$ = this.store.pipe(select(selectSenders_CountLessThan_Count));
            this.cutoff$ = this.store.pipe(select(selectCountCutoff));
      // this.sendersLessThan$ = this.store.pipe(select(selectSendersLess));
  }

}
