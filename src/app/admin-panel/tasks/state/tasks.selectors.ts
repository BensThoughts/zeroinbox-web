import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSuggestions from '@app/admin-panel/suggestions/state/suggestions.selectors';
import * as fromSenders from '@app/core/state/senders/senders.selectors';


export const labelTasks = createSelector(
  fromSuggestions.selectSuggestionEntities,
  (suggestions) => {
    return Object.entries(suggestions).filter((suggestion) => {
      return (suggestion[1].labelByName === true) || (suggestion[1].labelBySize === true)
    });
  }
)

export const deleteTasks = createSelector(
  fromSuggestions.selectSuggestionEntities,
  (suggestions) => {
    return Object.entries(suggestions).filter((suggestion) => {
      return suggestion[1].delete === true;
    });
  }
)


export const selectLabelTasks = createSelector(
  labelTasks,
  fromSenders.selectByCount,
  (tasks, senders) => {
    let tasksMap = new Map(tasks);
    return senders.filter((sender) => {
      return tasksMap.get(sender.senderId) !== undefined
    }).map((sender) => {
      return {
        fromAddress: sender.fromAddress,
        labelNames: tasksMap.get(sender.senderId).labelNames
      }
    });
  }
);

export const selectDeleteTasks = createSelector(
  deleteTasks,
  fromSenders.selectByCount,
  (tasks, senders) => {
    let tasksMap = new Map(tasks);
    return senders.filter((sender) => {
      return tasksMap.get(sender.senderId) !== undefined;
    });
  }
);
