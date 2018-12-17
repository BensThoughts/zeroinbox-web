import { Component, Input, OnInit } from '@angular/core';
import { GmailLabel } from '@app/core/services/label/models/gmail-label.model';

@Component({
  selector: 'go-labels-list',
  templateUrl: './labels-list.component.html',
  styleUrls: ['./labels-list.component.scss']
})
export class LabelsListComponent implements OnInit {

  @Input() labelsList: GmailLabel[];

  removable: boolean = true;

  remove(myLabel: GmailLabel): void {
    const index = this.labelsList.indexOf(myLabel);

    if (index >= 0) {
      this.labelsList.splice(index, 1);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
