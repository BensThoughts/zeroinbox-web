import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store<AppState>) { }

  ngOnInit() { }

}
