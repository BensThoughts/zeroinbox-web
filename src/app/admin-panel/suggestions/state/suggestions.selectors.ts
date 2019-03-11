import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
import { SuggestionsState, State } from './suggestions.reducer';
import * as fromSuggestions from './suggestions.reducer';
import { PageQuery } from '../components/suggestions-count-table/suggestions-count-table.component';
import * as fromTasks from '@app/admin-panel/tasks/state/tasks.selectors';
import { ISuggestion, ISizes } from '../model/suggestions.model';
import * as fromSenders from '@app/core/state/senders/senders.selectors';
import { AppState } from '../../../core/state/core.state';
import { map } from 'rxjs/operators';
import { ISender } from '../../../core/state/senders/model/senders.model';
import { selectAll } from '../../../core/state/senders/senders.selectors';

export const selectSuggestionsState = createFeatureSelector<State, SuggestionsState>(
  'suggestions'
);

export const selectEntities = createSelector(
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


/**
 * Select boolean to determine if suggestions are loaded from server
 */
export const selectSuggestionsLoaded = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.suggestionsLoaded
);



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

export const sortByCount = createSelector(
  selectSendersUnderCountCutoff,
  (senders) => senders.sort((a, b) => {
    return b.count - a.count;
  })
)

export const selectNotLabeledByName = createSelector(
  selectAllSuggestions,
  suggestions => suggestions.filter((suggestion) => {
    return suggestion.labelByName === false;
  })
);

export const selectIdsNotLabeledByName = createSelector(
  selectNotLabeledByName,
  (suggestions) => suggestions.map((suggestion) => suggestion.id)
)

export const selectFilteredSuggestedSenders = createSelector(
  selectIdsNotLabeledByName,
  sortByCount,
  (senderIds, senders) => {
    let filteredSenders = senders.filter((sender) => {
      if (senderIds.indexOf(sender.id) !== -1) {
        return true;
      }
      return false;
    });
    return filteredSenders;
  }
);

export const selectByCountLength = createSelector(
  selectFilteredSuggestedSenders,
  (senders) => senders.length
);

export const selectByCountPage = (page: PageQuery) => createSelector(
  selectFilteredSuggestedSenders,
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
  selectAllSuggestions,
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

export function filterBySize(suggestions: ISender[], cutoff: number) {

  try {
    switch (cutoff) {

      case 4:
        return suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate >= EX_LARGE);
        });
      case 3:
        return suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate < EX_LARGE) && (suggestion.totalSizeEstimate >= LARGE);
        });
      case 2:
        return  suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate < LARGE) && (suggestion.totalSizeEstimate >= MEDIUM);
        });
      case 1:
        return suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate < MEDIUM) && (suggestion.totalSizeEstimate >= SMALL);
        });
      case 0:
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
