import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-barchart',
  templateUrl: './stats-barchart.component.html',
  styleUrls: ['./stats-barchart.component.scss']
})
export class StatsBarchartComponent implements OnInit {


  testData: Array<Array<any>> = [['Today', 90, 134, 108, 0 ]];
  columnNames = ['Threads', 'Extra Small', 'Small', 'Medium', 'Large'];

  
  constructor() { }

  ngOnInit() {
  }

}
