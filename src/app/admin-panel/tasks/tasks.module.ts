import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { TasksComponent } from './components/tasks.component';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})

export class TasksModule { }
