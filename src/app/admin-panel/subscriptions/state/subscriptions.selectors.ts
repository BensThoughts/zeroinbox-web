import { createSelector } from '@ngrx/store';
import * as fromSuggestions from '@app/admin-panel/suggestions/state/suggestions.selectors';
import * as fromSenders from '@app/core/state/senders/senders.selectors';


export const selectSubscriptions = createSelector(
  fromSenders.selectAll,
  (senders) => senders.filter((sender) => {
    if (sender.unsubscribeEmail != null) {
      return true;
    }
    if (sender.unsubscribeWeb != null) {
      return true;
    }
    return false;
  })
)

export const selectTotalSubscriptions = createSelector(
  selectSubscriptions,
  (subscriptions) => subscriptions.length
)


export const selectSubscriptionSenders = createSelector(
  selectSubscriptions,
  (senders) => senders
);
