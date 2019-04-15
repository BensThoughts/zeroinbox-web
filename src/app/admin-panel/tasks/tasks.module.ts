import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { TasksComponent } from './components/tasks/tasks.component';
import { LabelTableComponent } from './components/label-table/label-table.component';

@NgModule({
  declarations: [TasksComponent, LabelTableComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})

export class TasksModule { }
