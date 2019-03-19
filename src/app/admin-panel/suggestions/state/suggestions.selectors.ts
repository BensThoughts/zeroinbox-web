import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SuggestionsState, State } from './suggestions.reducer';
import * as fromSuggestions from './suggestions.reducer';
import * as fromSenders from '@app/core/state/senders/senders.selectors';
import { ISender } from '@app/core/state/senders/model/senders.model';
import { selectAll } from '../../../core/state/senders/senders.selectors';

export interface PageQuery {
  pageIndex: number;
  pageSize:number;
}


export const selectSuggestionsState = createFeatureSelector<State, SuggestionsState>(
  'suggestions'
);

export const selectSuggestionEntities = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectEntities
);

export const selectUniqueSenders = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectTotal
);

export const selectAllSuggestions = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectAll
);

export const selectIds = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectIds
)

export const selectSuggestionAndSenderEntities = createSelector(
  fromSenders.selectSenderEntities,
  selectSuggestionEntities,
  (senders, suggestions) => {
    return {
      senders: senders,
      suggestions: suggestions
    }
  }
)


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
)

export const selectNotSetForDelete = createSelector(
  selectNotSubscription,
  suggestions => {
    return suggestions.filter((suggestion) => {
      return suggestion[1].delete === false;
    })
  }
)

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

export const selectSendersNotLabeledBySize = createSelector(
  fromSenders.selectAll,
  selectNotLabeledBySize,
  (senders, suggestions) => {
    let suggestionsMap = new Map(suggestions);
    let filteredSenders = senders.filter((sender) => {
      return suggestionsMap.get(sender.senderId) !== undefined;
    });
    return filteredSenders;
  }
)

export const selectSendersSortedBySize = createSelector(
  selectSendersNotLabeledBySize,
  (senders) => senders.sort((a, b) => b.totalSizeEstimate - a.totalSizeEstimate)
)



export const selectBySizeGroupFiltered = createSelector(
  selectSendersSortedBySize,
  selectSizeGroup,
  (senders, sizeGroup) => {
    return senders.filter((sender) => filterBySize(sender, sizeGroup))
    // return filterBySize(senders, sizeGroup);
  }
);


export const EX_LARGE = 1;
export const LARGE = .5;
export const MEDIUM = .2;
export const SMALL = .08;

export function filterBySize(sender: ISender, sizeGroup: string) {

  try {
    switch (sizeGroup) {

      case 'XL':
        if (sender.totalSizeEstimate >= EX_LARGE) {
          return true;
        }
        return false;
      case 'LG':
        if ((sender.totalSizeEstimate < EX_LARGE) && (sender.totalSizeEstimate >= LARGE)) {
          return true;
        }
        return false;
      case 'MD':
        if ((sender.totalSizeEstimate < LARGE) && (sender.totalSizeEstimate >= MEDIUM)) {
          return true;
        }
        return false;
      case 'SM':
        if ((sender.totalSizeEstimate < MEDIUM) && (sender.totalSizeEstimate >= SMALL)) {
          return true;
        }
        return false;
      case 'XS':
        if (sender.totalSizeEstimate < SMALL) {
          return true;
        }
        return false;
      case 'ALL':
        return true;
      default:
        throw Error('Error: case is not one of 0-4 (Small - Extra Large)');
    }
  } catch(err) {
    console.error(err);
  }

}
