import { Component, OnInit } from '@angular/core';


import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';

import { 
  selectByCountGroup_TC, 
  selectByCountGroup_TS, 
  selectBySizeGroup_TS, 
  selectBySizeGroup_TC, 
  selectBySizeGroup_TL, 
  selectByCountGroup_TL 
} from '@app/core';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {

  // sg = size group
  sg_Tl$; // sg by Total Length (number of senders)
  sg_Ts$; // sg by Total size (in MB)
  sg_Tc$; // sg by Total Count (number of threads)
  sizesColumnNames = ['Threads', 'over 1MB', '1MB - 500KB', '500KB - 300KB', '300KB - 200KB', 'under 200KB'];


  // cg = count group
  cg_Tl$; // cg by Total Length (number of senders)
  cg_Ts$; // cg by Total size (in MB)
  cg_Tc$; // cg by Total Count (number of threads)
  countColumnNames = ['Threads', 'over 500', '500 - 100', '50 - 100', '15 - 50', 'under 15'];



  constructor(private store: Store<AppState>) {}

  ngOnInit() {

    this.sg_Tl$ = this.store.pipe(select(selectBySizeGroup_TL));
    this.sg_Ts$ = this.store.pipe(select(selectBySizeGroup_TS));
    this.sg_Tc$ = this.store.pipe(select(selectBySizeGroup_TC));

    this.cg_Tl$ = this.store.pipe(select(selectByCountGroup_TL));
    this.cg_Ts$ = this.store.pipe(select(selectByCountGroup_TS));
    this.cg_Tc$ = this.store.pipe(select(selectByCountGroup_TC));
  }


}
