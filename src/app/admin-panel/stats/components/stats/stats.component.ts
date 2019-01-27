import { Component, OnInit } from '@angular/core';


// import { GmailLabelService } from '@app/core/services/label/gmail-label.service';
// import { UserService } from '@app/core/services/auth-user/user.service';

// import { filter, map } from 'rxjs/operators';

import { IGmailLabel } from '@app/core';

import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';

// import { GmailLabelsRequested } from '@app/core';
import { Observable } from 'rxjs';
import { selectByCountGroup_TC, selectByCountGroup_TS, selectBySizeGroup_TS, selectBySizeGroup_TC, selectBySizeGroup_TL, selectByCountGroup_TL } from '@app/admin-panel/suggestions/state/suggestions.selectors';

// import { selectUserGmailLabels } from '@app/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {
  gmail_labels$: Observable<IGmailLabel[]>; // The list of labels currently in the gmail acc.


  sg_Tl$;
  // sizesColumnNames = ['Threads', 'Extra Large', 'Large', 'Medium', 'Small', 'Extra Small'];
  sg_Ts$;
  sg_Tc$;
  sizesColumnNames = ['Threads', 'over 1MB', '1MB - 500KB', '500KB - 300KB', '300KB - 200KB', 'under 200KB'];


  cg_Tl$;
  cg_Ts$;
  cg_Tc$;
  countColumnNames = ['Threads', 'over 500', '500 - 100', '50 - 100', '15 - 50', 'under 15'];



  constructor(private store: Store<AppState>) {}

  ngOnInit() {

    this.sg_Tl$ = this.store.pipe(select(selectBySizeGroup_TL));
    this.sg_Ts$ = this.store.pipe(select(selectBySizeGroup_TS));
    this.sg_Tc$ = this.store.pipe(select(selectBySizeGroup_TC));

    this.cg_Tl$ = this.store.pipe(select(selectByCountGroup_TL));
    this.cg_Ts$ = this.store.pipe(select(selectByCountGroup_TS));
    this.cg_Tc$ = this.store.pipe(select(selectByCountGroup_TC));
    // this.gmail_labels$ = this.store.pipe(select(selectUserGmailLabels));
  }


}
