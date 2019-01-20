import * as fromTasks from './tasks.reducer';
import { selectTasksState } from '../core.state';
import { createSelector } from '@ngrx/store';

export const selectEntities = createSelector(
  selectTasksState,
  fromTasks.selectEntities
);
