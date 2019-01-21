import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import {
  selectSendersThreadIds,
  selectSendersLoaded,
} from '@app/core';
// import { selectToken } from '@app/core';

import { Observable, of } from 'rxjs';
import { fadeElementsAnimation } from '@app/admin-panel/home/elementsAnimations';
import { selectAllSuggestions, selectByCount, selectSuggestions_CountMoreThan } from '../../state/suggestions.selectors';


@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionsComponent implements OnInit {

  sendersLoaded$: Observable<boolean>;
  suggestions$;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
      this.sendersLoaded$ = this.store.pipe(select(selectSendersLoaded));
      this.suggestions$ = this.store.pipe(select(selectSuggestions_CountMoreThan));

  }

}
