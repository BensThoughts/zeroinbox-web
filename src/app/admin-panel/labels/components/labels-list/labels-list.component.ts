import { Component, Input, OnInit } from '@angular/core';
import { IGmailLabel } from '@app/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { GmailLabelRemoved } from '@app/core';

@Component({
  selector: 'go-labels-list',
  templateUrl: './labels-list.component.html',
  styleUrls: ['./labels-list.component.scss']
})
export class LabelsListComponent implements OnInit {

  @Input() labelsList: IGmailLabel[];

  removable = true;

  // store should be public or private? UNSURE
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  remove(myLabel: IGmailLabel): void {
    this.store.dispatch(new GmailLabelRemoved({name: myLabel.name}));
  }



}
