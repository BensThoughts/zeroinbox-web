import { Component, OnInit } from '@angular/core';
import { SuggestedService } from '@app/core/services/gmail-api/suggested/suggested.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { selectSuggestedThreadIds, selectSuggestionsLoaded } from '@app/core/state/gmail-api/suggested/suggested.selectors';
// import { selectToken } from '@app/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  private suggestionsLoaded$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
      this.suggestionsLoaded$ = this.store.pipe(select(selectSuggestionsLoaded));
  }

}
