import { createSelector } from '@ngrx/store';
import { selectSuggestedState } from '../../core.state';
import { SuggestedState } from './suggested.reducer';
import * as fromSuggested from './suggested.reducer';
import { PageQuery } from './suggested.actions';

export const selectSuggested = createSelector(
  selectSuggestedState,
  (state: SuggestedState) => state
);

export const selectSuggestedThreadIds = createSelector(
  selectSuggested,
  (state: SuggestedState) => state.threadIds
);

export const selectSuggestionsLoaded = createSelector(
  selectSuggested,
  (state: SuggestedState) => state.allSuggestionsLoaded
);

/**
export const selectUniqueSenders = createSelector(
  selectSuggested,
  (state: SuggestedState) => state.ids.length
);
**/

export const selectUniqueSenders = createSelector(
  selectSuggestedState,
  fromSuggested.selectTotal
);

export const selectAllSuggested = createSelector(
  selectSuggestedState,
  fromSuggested.selectAll
);



export const selectByCount = createSelector(
  selectAllSuggested,
  sendersMore => sendersMore.sort((a,b) => b.count - a.count)
);

export const selectSendersMore = (cutoff: number) => createSelector(
  selectByCount,
  suggestions => suggestions.filter(suggestion => suggestion.count >= cutoff),
);

export const selectSendersMoreCount = (cutoff: number) => createSelector(
  selectSendersMore(cutoff),
  sendersMore => sendersMore.length
)

export const selectPageOfSendersMore = (cutoff: number, page: PageQuery) => createSelector(
  selectSendersMore(cutoff),
  sendersMore => {
    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return sendersMore.slice(start, end);

  }
);

export const selectSendersLess = createSelector(
  selectAllSuggested,
  suggestions => suggestions.filter(suggestion => suggestion.count < 5)
)
