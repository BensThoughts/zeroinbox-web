import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelsComponent } from './components/labels/labels.component';
import { LabelsListComponent } from './components/labels-list/labels-list.component';
import { LabelsInputComponent } from './components/labels-input/labels-input.component';

import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [LabelsComponent, LabelsListComponent, LabelsInputComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: []
})
export class LabelsModule { }
