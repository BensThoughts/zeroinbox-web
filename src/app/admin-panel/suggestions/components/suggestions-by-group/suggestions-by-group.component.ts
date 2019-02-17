import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';

@Component({
  selector: 'app-suggestions-by-group',
  templateUrl: './suggestions-by-group.component.html',
  styleUrls: ['./suggestions-by-group.component.scss']
})
export class SuggestionsByGroupComponent implements OnInit {



  @Input() totalSizes;
  @Input() totalCounts;
  @Input() totalLengths;


  // sizeTotals$;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log(this.totalSizes);
    console.log(this.totalCounts);
    console.log(this.totalLengths);
  }

}
