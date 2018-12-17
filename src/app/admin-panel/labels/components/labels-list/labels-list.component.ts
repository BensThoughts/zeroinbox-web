import { Component, Input, OnInit } from '@angular/core';
import { GmailLabel } from '../../models/gmail-label.model';

@Component({
  selector: 'go-labels-list',
  templateUrl: './labels-list.component.html',
  styleUrls: ['./labels-list.component.scss']
})
export class LabelsListComponent implements OnInit {

  @Input() labelsList: GmailLabel[];

  constructor() { }

  ngOnInit() {
  }

}
