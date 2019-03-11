import * as fromTasks from './tasks.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';
import { State } from './tasks.reducer';
import * as fromSenders from '@app/core/state/senders/senders.selectors';

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

export const filterLabelTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter((task) => task.labelByName === true || task.labelBySize === true)
);

export const labelTaskIds = createSelector(
  filterLabelTasks,
  (tasks) => tasks.map((task) => task.id)
)

export const filterDeleteTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter((task) => task.delete === true)
);

export const deleteTaskIds = createSelector(
  filterDeleteTasks,
  (tasks) => tasks.map((task) => task.id)
)

export const selectLabelTasks = createSelector(
  labelTaskIds,
  fromSenders.selectByCount,
  (tasks, senders) => {
    let filteredSenders = senders.filter((sender) => {
      if (tasks.indexOf(sender.id) !== -1) {
        return true;
      }
      return false;
    });
    return filteredSenders;
  }
);

export const selectDeleteTasks = createSelector(
  deleteTaskIds,
  fromSenders.selectByCount,
  (tasks, senders) => {
    let filteredSenders = senders.filter((sender) => {
      if (tasks.indexOf(sender.id) !== -1) {
        return true;
      }
      return false;
    });
    return filteredSenders;
  }
);
