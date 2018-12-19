import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelsRoutingModule } from './labels-routing.module';
import { LabelsComponent } from './components/labels/labels.component';
import { LabelsListComponent } from './components/labels-list/labels-list.component';
import { LabelInputComponent } from './components/label-input/label-input.component';

import { SharedModule } from '@app/shared';
import { DropListComponent } from './components/drop-list/drop-list.component';

@NgModule({
  declarations: [LabelsComponent, LabelsListComponent, LabelInputComponent, DropListComponent],
  imports: [
    CommonModule,
    SharedModule,
    LabelsRoutingModule
  ]
})
export class LabelsModule { }
