import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelsRoutingModule } from './labels-routing.module';
import { LabelsComponent } from './components/labels/labels.component';
import { LabelsListComponent } from './components/labels-list/labels-list.component';
import { LabelComponent } from './components/label/label.component';

import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [LabelsComponent, LabelsListComponent, LabelComponent],
  imports: [
    CommonModule,
    SharedModule,
    LabelsRoutingModule
  ]
})
export class LabelsModule { }
