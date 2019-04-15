import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { TasksComponent } from './components/tasks/tasks.component';
import { LabelTableComponent } from './components/label-table/label-table.component';
import { LabelEditComponent } from './components/label-edit-prompt/label-edit-prompt.component';
import { TasksEffects } from './state/tasks.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [TasksComponent, LabelTableComponent, LabelEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([TasksEffects])
  ],
  entryComponents:[LabelEditComponent]
})

export class TasksModule { }
