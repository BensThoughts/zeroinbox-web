import { Component, OnInit } from '@angular/core';


// import { GmailLabelService } from '@app/core/services/label/gmail-label.service';
// import { UserService } from '@app/core/services/auth-user/user.service';

// import { filter, map } from 'rxjs/operators';

import { IGmailLabel } from '@app/core';

import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';

// import { GmailLabelsRequested } from '@app/core';
import { Observable } from 'rxjs';

// import { selectUserGmailLabels } from '@app/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {
  gmail_labels$: Observable<IGmailLabel[]>; // The list of labels currently in the gmail acc.
  testData: Array<Array<any>>; // = [['Today', 90, 134, 108, 0 ]];
  columnNames = ['Threads', 'Extra Small', 'Small', 'Medium', 'Large'];

  totalSize = [['Today', 2.651, 10.053, 8.422, 6.048]];
  sizeNames = ['MB', 'Extra Small', 'Small', 'Medium', 'Large'];






  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.testData = [['Today', 90, 134, 108, 0 ]];
    // this.gmail_labels$ = this.store.pipe(select(selectUserGmailLabels));
  }


}
