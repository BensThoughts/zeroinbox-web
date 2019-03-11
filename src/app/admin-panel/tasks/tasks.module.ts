import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { TasksComponent } from './components/tasks.component';
import { tasksReducer } from './state/tasks.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SuggestionsEffects } from '../suggestions/state/suggestions.effects';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([SuggestionsEffects])
  ]
})

export class TasksModule { }
