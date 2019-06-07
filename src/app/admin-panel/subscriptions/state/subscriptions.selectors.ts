import { createSelector } from '@ngrx/store';
import * as fromSuggestions from '@app/admin-panel/suggestions/state/suggestions.selectors';
import * as fromSenders from '@app/core/state/senders/senders.selectors';


export const selectSubscriptions = createSelector(
  fromSenders.selectAll,
  (senders) => senders.filter((sender) => {
    if (sender.unsubscribeEmail != null && sender.unsubscribed === false) {
      return true;
    }
    if (sender.unsubscribeWeb != null && sender.unsubscribed === false) {
      return true;
    }
    return false;
  })
)

export const selectTotalSubscriptions = createSelector(
  selectSubscriptions,
  (subscriptions) => subscriptions.length
)


export const selectSubscriptionsByName = createSelector(
  selectSubscriptions,
  (senders) => senders.sort((a, b) => {
    if (a.fromName.toLowerCase() > b.fromName.toLowerCase()) {
      return 1;
    } else if (a.fromName.toLowerCase() < b.fromName.toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  }).slice()
);
