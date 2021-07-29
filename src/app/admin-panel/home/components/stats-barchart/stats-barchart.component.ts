import { Component, OnInit, Input } from '@angular/core';
import { ISizes } from '@app/core/state/senders/model/sizes.model';
import { ChartType } from 'angular-google-charts';

interface GoogleChart {
  title: string;
  type: ChartType;
  columns: string[];
  data: Array<Array<any>>;
}

@Component({
  selector: 'app-stats-barchart',
  templateUrl: './stats-barchart.component.html',
  styleUrls: ['./stats-barchart.component.scss']
})
export class StatsBarchartComponent implements OnInit {
  @Input() sizes: ISizes;
  @Input() title: string = '';
  @Input() columns: string[];
  @Input() type: ChartType = ChartType.ColumnChart;

  data: Array<Array<any>> = [['Today', 90, 134, 108, 0]];

  chart: GoogleChart;

  constructor() {}

  ngOnInit() {
    {
    }
    this.data = [
      [
        'Inbox',
        this.sizes.Xl,
        this.sizes.Lg,
        this.sizes.Md,
        this.sizes.Sm,
        this.sizes.Xs
      ]
    ];
    this.chart = {
      title: this.title,
      type: this.type,
      columns: this.columns,
      data: this.data
    };
  }
}
