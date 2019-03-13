import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
import { SuggestionsState, State } from './suggestions.reducer';
import * as fromSuggestions from './suggestions.reducer';
import { PageQuery } from '../components/suggestions-count-table/suggestions-count-table.component';
import * as fromSenders from '@app/core/state/senders/senders.selectors';
import { ISender } from '@app/core/state/senders/model/senders.model';
import { selectSenderEntities } from '../../../core/state/senders/senders.selectors';

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
  selectSenderEntities,
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

export const selectNotSetForDelete = createSelector(
  selectAllSuggestions,
  suggestions => suggestions.filter((suggestion) => {
    return suggestion.delete === false;
  })
)

/*******************************************************************************
 *  BY Name based on count
 * ****************************************************************************/
export const selectCountCutoff = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.cutoff
);

export const selectSendersUnderCountCutoff = createSelector(
  fromSenders.selectAll,
  selectCountCutoff,
  (senders, cutoff) => senders.filter((sender) => sender.count >= cutoff)
);

export const sortSendersByCount = createSelector(
  selectSendersUnderCountCutoff,
  (senders) => senders.sort((a, b) => {
    return b.count - a.count;
  })
)

export const selectNotLabeledByName = createSelector(
  selectNotSetForDelete,
  suggestions => suggestions.filter((suggestion) => {
    return suggestion.labelByName === false;
  })
);


export const selectSuggestionIds = createSelector(
  selectNotLabeledByName,
  (suggestions) => suggestions.map((suggestion) => suggestion.id)
)

export const selectFilteredSuggestedSenders = (filter: string) => createSelector(
  selectSuggestionIds,
  sortSendersByCount,
  (senderIds, senders) => {
    let filteredSenders = senders.filter((sender) => {
      if ((senderIds.indexOf(sender.id) !== -1) && sender.fromAddress.includes(filter)) {
        return true;
      }
      return false;
    });
    return filteredSenders;
  }
);

export const selectByCountLength = (filter: string) => createSelector(
  selectFilteredSuggestedSenders(filter),
  (senders) => senders.length
);

export const selectByCountPage = (filter: string, page: PageQuery) => createSelector(
  selectFilteredSuggestedSenders(filter),
  (sendersMore) => {
    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return sendersMore.slice(start, end);
  }
);


/*******************************************************************************
 * SELECT BY SIZE
 ******************************************************************************/


export const selectSizeCutoff = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.sizeCutoff
);


export const selectBySizeFiltered = createSelector(
  selectNotSetForDelete,
  (suggestions) => suggestions.filter((suggestion) => suggestion.labelBySize === false)
);

export const selectIdsFilteredBySize = createSelector(
  selectBySizeFiltered,
  (suggestions) => suggestions.map((suggestion) => suggestion.id)
)

export const selectSendersSortedBySize = createSelector(
  fromSenders.selectBySize,
  selectIdsFilteredBySize,
  (senders, suggestions) => {
    let filteredSenders = senders.filter((sender) => {
      if (suggestions.indexOf(sender.id) !== -1) {
        return true;
      }
      return false;
    });
    return filteredSenders;
  }
)



export const selectBySizeGroupFiltered = createSelector(
  selectSendersSortedBySize,
  selectSizeCutoff,
  (senders, cutoff) => {
    return filterBySize(senders, cutoff);
  }
);


export const selectBySizeGroupLength = createSelector(
  selectBySizeGroupFiltered,
  (senders) => senders.length
);


export const selectBySizeGroupPage = (page: PageQuery) => createSelector(
  selectBySizeGroupFiltered,
  (sendersMore) => {
    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return sendersMore.slice(start, end);
  }
);



export const EX_LARGE = 1;
export const LARGE = .5;
export const MEDIUM = .2;
export const SMALL = .08;

export function filterBySize(suggestions: ISender[], cutoff: string) {

  try {
    switch (cutoff) {

      case 'XL':
        return suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate >= EX_LARGE);
        });
      case 'LG':
        return suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate < EX_LARGE) && (suggestion.totalSizeEstimate >= LARGE);
        });
      case 'MD':
        return  suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate < LARGE) && (suggestion.totalSizeEstimate >= MEDIUM);
        });
      case 'SM':
        return suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate < MEDIUM) && (suggestion.totalSizeEstimate >= SMALL);
        });
      case 'XS':
        return suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate < SMALL);
        })

      default:
        throw Error('Error: case is not one of 0-4 (Small - Extra Large)');

    }
  } catch(err) {
    console.error(err);
  }

}
