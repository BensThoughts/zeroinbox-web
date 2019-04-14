import { createSelector } from '@ngrx/store';
import * as fromSuggestions from '@app/admin-panel/suggestions/state/suggestions.selectors';
import * as fromSenders from '@app/core/state/senders/senders.selectors';


export const selectSubscriptions = createSelector(
  fromSuggestions.selectSuggestionEntities,
  (suggestions) => Object.entries(suggestions).filter((suggestion) => {
    return suggestion[1].subscriptionList === true;
  })
)

export const selectTotalSubscriptions = createSelector(
  selectSubscriptions,
  (subscriptions) => subscriptions.length
)


export const selectSubscriptionSenders = createSelector(
  selectSubscriptions,
  fromSenders.selectByCount,
  (suggestions, senders) => {
    let suggestionsMap = new Map(suggestions);
    return senders.filter((sender) => {
      return suggestionsMap.get(sender.senderId) !== undefined
    });
  }
);
