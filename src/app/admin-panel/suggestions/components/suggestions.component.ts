import { Component, OnInit } from '@angular/core';
import { SuggestedService } from '@app/core/services/gmail-api/suggested/suggested.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';
import { selectSuggestedThreadIds } from '@app/core/state/gmail-api/suggested/suggested.selectors';
import { selectToken } from '@app/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  constructor(private suggestedService: SuggestedService, private store: Store<AppState>, private httpClient: HttpClient) { }

  private readonly MY_API_URL: string = 'http://127.0.0.1:8080';

  ngOnInit() {
    this.httpClient.get(this.MY_API_URL + '/profile', {
      withCredentials: true
    }).subscribe((response) => {
      console.log(response);
    })
  }
    /**
    let p1 = this.store.pipe(select(selectSuggestedThreadIds)).subscribe((result) => {
      let p2 = this.store.pipe(select(selectToken)).subscribe((token) => {
        this.suggestedService.batchRequest({
          token: token,
          body: result
        }).subscribe((res) => {
          console.log(res);
        })
      })
      p2.unsubscribe();
    })
    p1.unsubscribe();
  }
  **/


}
