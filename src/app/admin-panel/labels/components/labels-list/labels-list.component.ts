import { Component, Input, OnInit } from '@angular/core';
import { Label } from '../../models/label.model';

@Component({
  selector: 'go-labels-list',
  templateUrl: './labels-list.component.html',
  styleUrls: ['./labels-list.component.scss']
})
export class LabelsListComponent implements OnInit {

  @Input() labelsList: Label[];

  constructor() { }

  ngOnInit() {
  }

}
