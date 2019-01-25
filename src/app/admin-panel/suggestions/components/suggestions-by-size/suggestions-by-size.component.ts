import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { selectBySize_Total } from '../../state/suggestions.selectors';

@Component({
  selector: 'iz-suggestions-by-size',
  templateUrl: './suggestions-by-size.component.html',
  styleUrls: ['./suggestions-by-size.component.scss']
})
export class SuggestionsBySizeComponent implements OnInit {


  @Input() sizes: number[];


  @Input() phrase: string;
  @Input() postPhrase: string;
  @Input() totalSizes;


  sizeTotals$;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log(this.totalSizes);
    this.sizeTotals$ = this.store.pipe(select(selectBySize_Total));
  }

}
