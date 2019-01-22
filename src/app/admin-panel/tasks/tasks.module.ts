import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TasksComponent } from './components/tasks.component';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
  ]
})

export class TasksModule { }
