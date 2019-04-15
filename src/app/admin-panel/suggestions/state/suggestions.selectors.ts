import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SuggestionsState, State } from './suggestions.reducer';
import * as fromSuggestions from './suggestions.reducer';
import * as fromSenders from '@app/core/state/senders/senders.selectors';
import { ISender } from '@app/core/state/senders/model/senders.model';

export const selectSuggestionsState = createFeatureSelector<State, SuggestionsState>(
  'suggestions'
);

export const selectSuggestionEntities = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectEntities
);

export const selectEntitiesAsEntriesArray = createSelector(
  selectSuggestionEntities,
  suggestions => {
    return Object.entries(suggestions);
  }
)

export const selectAllSuggestions = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectAll
);

export const selectIds = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectIds
);

export const selectSuggestionAndSenderEntities = createSelector(
  fromSenders.selectSenderEntities,
  selectSuggestionEntities,
  (senders, suggestions) => {
    return {
      senders: senders,
      suggestions: suggestions
    }
  }
);


/**
 * Select boolean to determine if suggestions are loaded from server
 */
export const selectSuggestionsLoaded = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.suggestionsLoaded
);

export const selectNotSubscription = createSelector(
  selectSuggestionEntities,
  suggestions => {
    return Object.entries(suggestions).filter((suggestion) => {
      return suggestion[1].subscriptionList === false;
    })
  }
);

export const selectNotSetForDelete = createSelector(
  selectEntitiesAsEntriesArray,
  suggestions => {
    return suggestions.filter((suggestion) => {
      return suggestion[1].delete === false;
    })
  }
);

/*******************************************************************************
 *  BY Name based on count
 * ****************************************************************************/

export const selectNotLabeledByName = createSelector(
  selectNotSetForDelete,
  suggestions => suggestions.filter((suggestion) => {
    return suggestion[1].labelByName === false;
  })
);


export const selectSendersFromSuggestionIds = createSelector(
  selectNotLabeledByName,
  fromSenders.selectAll,
  (suggestions, senders) => {
    let suggestionsMap = new Map(suggestions);
    return senders.filter((sender) => {
      return suggestionsMap.get(sender.senderId) !== undefined;
    })
  }
);


/*******************************************************************************
 * SELECT BY SIZE
 ******************************************************************************/


export const selectSizeGroup = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.sizeGroup
);


export const selectNotLabeledBySize = createSelector(
  selectNotSetForDelete,
  (suggestions) => suggestions.filter((suggestion) => suggestion[1].labelBySize === false)
);

export const selectSendersSortedBySize = createSelector(
  fromSenders.selectAll,
  (senders) => senders.sort((a, b) => b.totalSizeEstimate - a.totalSizeEstimate)
);

export const selectSendersNotLabeledBySize = createSelector(
  selectSendersSortedBySize,
  selectNotLabeledBySize,
  (senders, suggestions) => {
    let suggestionsMap = new Map(suggestions);
    let filteredSenders = senders.filter((sender) => {
      return suggestionsMap.get(sender.senderId) !== undefined;
    });
    return filteredSenders;
  }
);

export const selectBySizeGroupFiltered = createSelector(
  selectSendersNotLabeledBySize,
  selectSizeGroup,
  (senders, sizeGroup) => {
    if (sizeGroup === 'ALL') {
      return senders;
    } else {
      return senders.filter((sender) => sender.sizeGroup === sizeGroup)
    }
  }
);