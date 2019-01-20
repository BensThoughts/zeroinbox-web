import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import {
  selectSendersThreadIds,
  selectSendersLoaded,
} from '@app/core';
// import { selectToken } from '@app/core';

import { Observable, of } from 'rxjs';
import { fadeElementsAnimation } from '@app/admin-panel/home/elementsAnimations';


@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent implements OnInit {

  sendersLoaded$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
      this.sendersLoaded$ = this.store.pipe(select(selectSendersLoaded));

  }

}
