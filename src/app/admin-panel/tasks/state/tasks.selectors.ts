import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSuggestions from '@app/admin-panel/suggestions/state/suggestions.selectors';
import * as fromSenders from '@app/core/state/senders/senders.selectors';

export const labelTaskIds = createSelector(
  fromSuggestions.selectAllSuggestions,
  (suggestions) => {
    return suggestions.filter((suggestion) => {
      if (suggestion.labelByName || suggestion.labelBySize) {
        return true;
      }
      return false;
    }).map((suggestion) => suggestion.senderId);
  }
)

export const deleteTaskIds = createSelector(
  fromSuggestions.selectAllSuggestions,
  (suggestions) => {
    return suggestions.filter((suggestion) => {
      if (suggestion.delete) {
        return true;
      }
      return false;
    }).map((suggestion) => suggestion.senderId);
  }
)


export const selectLabelTasks = createSelector(
  labelTaskIds,
  fromSenders.selectByCount,
  fromSuggestions.selectSuggestionEntities,
  (taskIds, senders, tasks) => {
    let filteredSenders = senders.filter((sender) => {
      if (taskIds.indexOf(sender.senderId) !== -1) {
        return true;
      }
      return false;
    }).map((sender) => {
      let labelNames = tasks[sender.senderId].labelNames;
      return {
        fromAddress: sender.fromAddress,
        labelNames: labelNames
      }
    });
    return filteredSenders;
  }
);

export const selectDeleteTasks = createSelector(
  deleteTaskIds,
  fromSenders.selectByCount,
  (tasks, senders) => {
    let filteredSenders = senders.filter((sender) => {
      if (tasks.indexOf(sender.senderId) !== -1) {
        return true;
      }
      return false;
    });
    return filteredSenders;
  }
);
