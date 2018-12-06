import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelsRoutingModule } from './labels-routing.module';
import { LabelsComponent } from './components/labels.component';

@NgModule({
  declarations: [LabelsComponent],
  imports: [
    CommonModule,
    LabelsRoutingModule
  ]
})
export class LabelsModule { }
