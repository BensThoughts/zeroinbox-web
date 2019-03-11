import * as fromTasks from './tasks.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';
import { State } from './tasks.reducer';

export const selectTasksState = createFeatureSelector<State, TasksState>(
  'tasks'
);

export const selectEntities = createSelector(
  selectTasksState,
  fromTasks.selectEntities
);

export const selectTasks = createSelector(
  selectTasksState,
  (state: TasksState) => state
);

export const selectAllTasks = createSelector(
  selectTasks,
  fromTasks.selectAll
)

export const selectLabelTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter((task) => task.labelByName === true || task.labelBySize === true)
);

export const selectDeleteTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter((task) => task.delete === true)
);
