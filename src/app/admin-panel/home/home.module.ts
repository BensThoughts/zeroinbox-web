import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';

import { SharedModule } from '@app/shared';

import { GoogleChartsModule } from 'angular-google-charts';
import { StatsBarchartComponent } from './components/stats-barchart/stats-barchart.component';
import { RouterModule } from '@angular/router';
import { SharedComponentModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [HomeComponent, StatsBarchartComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SharedComponentModule,
    GoogleChartsModule
  ],
  providers: []
})
export class HomeModule {}
