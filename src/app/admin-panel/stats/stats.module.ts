import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsComponent } from './components/stats/stats.component';

import { SharedModule } from '@app/shared';

import { GoogleChartsModule } from 'angular-google-charts'
import { StatsBarchartComponent } from './components/stats-barchart/stats-barchart.component';


@NgModule({
  declarations: [StatsComponent, StatsBarchartComponent],
  imports: [
    CommonModule,
    SharedModule,
    GoogleChartsModule.forRoot()
  ],
  providers: []
})
export class StatsModule { }
