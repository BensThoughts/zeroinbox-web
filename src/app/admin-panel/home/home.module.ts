import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';

import { SharedModule } from '@app/shared';

import { GoogleChartsModule } from 'angular-google-charts'
import { StatsBarchartComponent } from './components/stats-barchart/stats-barchart.component';


@NgModule({
  declarations: [HomeComponent, StatsBarchartComponent],
  imports: [
    CommonModule,
    SharedModule,
    GoogleChartsModule.forRoot()
  ],
  providers: []
})
export class HomeModule { }