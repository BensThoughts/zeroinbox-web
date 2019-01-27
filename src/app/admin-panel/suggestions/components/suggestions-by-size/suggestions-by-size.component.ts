import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';

@Component({
  selector: 'iz-suggestions-by-size',
  templateUrl: './suggestions-by-size.component.html',
  styleUrls: ['./suggestions-by-size.component.scss']
})
export class SuggestionsBySizeComponent implements OnInit {



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
