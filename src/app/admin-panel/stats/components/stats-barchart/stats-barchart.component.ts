import { Component, OnInit, Input } from '@angular/core';
import { ISizes } from '@app/admin-panel/suggestions/model/suggestions.model';

@Component({
  selector: 'app-stats-barchart',
  templateUrl: './stats-barchart.component.html',
  styleUrls: ['./stats-barchart.component.scss']
})
export class StatsBarchartComponent implements OnInit {

  @Input() sizes: ISizes;
  @Input() title: string;
  @Input() columnNames: string[];
  @Input() type: string;

  testData: Array<Array<any>> = [['Today', 90, 134, 108, 0 ]];



  constructor() { }

  ngOnInit() {
    this.testData = [['Inbox', this.sizes.Xl, this.sizes.Lg, this.sizes.Md, this.sizes.Sm, this.sizes.Xs]];
  }

}
