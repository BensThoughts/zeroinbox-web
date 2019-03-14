import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
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

export const selectNotSetForDelete = createSelector(
  selectSuggestionEntities,
  suggestions => {
    return Object.entries(suggestions).filter((suggestion) => {
      return suggestion[1].delete === false;
    })
  }

    // suggestions.filter((suggestion) => {
    //  return suggestion.delete === false;
    // })
)

/*******************************************************************************
 *  BY Name based on count
 * ****************************************************************************/

/**
 * Select the current count cutoff setting. Used to determine the senders to 
 * display based on a minimum number of total threads from the sender.
 */
export const selectCountCutoff = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.countCutoff
);

/**
 * Select senders with at least the minimum number of threads 
 * (count === number of threads) currently set as countCutoff.
 */
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
    return suggestion[1].labelByName === false;
  })
);


export const selectSendersFromSuggestionIds = createSelector(
  selectNotLabeledByName,
  sortSendersByCount,
  (suggestions, senders) => {
    let suggestionsMap = new Map(suggestions);
    return senders.filter((sender) => {
      return suggestionsMap.get(sender.senderId) !== undefined;
    })
  }
);

export const selectFilteredSenders = (filter: string) => createSelector(
  selectSendersFromSuggestionIds,
  (senders) => {
    return senders.filter((sender) => {
      return sender.fromAddress.includes(filter) 
    });
  }
)
/**
 * Used to determine the total number of pages for the MatPaginator
 * @param filter - A search string to determine the sender email addresses to display
 */
export const selectByCountLength = (filter: string) => createSelector(
  selectFilteredSenders(filter),
  (senders) => senders.length
);

/**
 * Used to select the senders to display
 * @param filter - A search string to determine the sender email addresses to display
 * @param page - The page that the MatPaginator is currently on 
 */
export const selectByCountPage = (filter: string, page: PageQuery) => createSelector(
  selectFilteredSenders(filter),
  (sendersMore) => {
    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return sendersMore.slice(start, end);
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
  fromSenders.selectBySize,
  selectNotLabeledBySize,
  (senders, suggestions) => {
    let suggestionsMap = new Map(suggestions);
    let filteredSenders = senders.filter((sender) => {
      return suggestionsMap.get(sender.senderId) !== undefined;
    });
    return filteredSenders;
  }
)



export const selectBySizeGroupFiltered = createSelector(
  selectSendersSortedBySize,
  selectSizeGroup,
  (senders, sizeGroup) => {
    return filterBySize(senders, sizeGroup);
  }
);

export const selectBySizeFiltered = (filter: string) => createSelector(
  selectBySizeGroupFiltered,
  (senders) => {
    let filteredSenders = senders.filter((sender) => {
      if (sender.fromAddress.includes(filter)) {
        return true;
      }
      return false;
    });
    return filteredSenders;
  }
)

export const selectBySizeGroupLength = (filter: string) => createSelector(
  selectBySizeFiltered(filter),
  (senders) => senders.length
);


export const selectBySizeGroupPage = (filter: string, page: PageQuery) => createSelector(
  selectBySizeFiltered(filter),
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

export function filterBySize(senders: ISender[], sizeGroup: string) {

  try {
    switch (sizeGroup) {

      case 'XL':
        return senders.filter((sender) => {
          return (sender.totalSizeEstimate >= EX_LARGE);
        });
      case 'LG':
        return senders.filter((sender) => {
          return (sender.totalSizeEstimate < EX_LARGE) && (sender.totalSizeEstimate >= LARGE);
        });
      case 'MD':
        return  senders.filter((sender) => {
          return (sender.totalSizeEstimate < LARGE) && (sender.totalSizeEstimate >= MEDIUM);
        });
      case 'SM':
        return senders.filter((sender) => {
          return (sender.totalSizeEstimate < MEDIUM) && (sender.totalSizeEstimate >= SMALL);
        });
      case 'XS':
        return senders.filter((sender) => {
          return (sender.totalSizeEstimate < SMALL);
        });
      case 'ALL':
        return senders;

      default:
        throw Error('Error: case is not one of 0-4 (Small - Extra Large)');

    }
  } catch(err) {
    console.error(err);
  }

}
