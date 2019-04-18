import { createSelector } from '@ngrx/store';
import * as fromSuggestions from '@app/admin-panel/suggestions/state/suggestions.selectors';
import * as fromSenders from '@app/core/state/senders/senders.selectors';


export const selectSubscriptions = createSelector(
  fromSenders.selectAll,
  (senders) => senders
)

export const selectTotalSubscriptions = createSelector(
  selectSubscriptions,
  (subscriptions) => subscriptions.length
)


export const selectSubscriptionSenders = createSelector(
  selectSubscriptions,
  (senders) => senders
);
