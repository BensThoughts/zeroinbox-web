import * as fromTasks from './tasks.reducer';
import { selectTasksState } from '../core.state';
import { createSelector } from '@ngrx/store';

export const selectEntities = createSelector(
  selectTasksState,
  fromTasks.selectEntities
);

export const selectLabelTasks = createSelector(
  fromTasks.selectAll,
  (tasks) => {
    tasks.filter((task) => task.label === true)
  }
);
