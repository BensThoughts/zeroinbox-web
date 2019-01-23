import * as fromTasks from './tasks.reducer';
import { selectTasksState } from '../core.state';
import { createSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';

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
  (tasks) => tasks.filter((task) => task.label === true)
);

export const selectDeleteTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter((task) => task.delete === true)
);
