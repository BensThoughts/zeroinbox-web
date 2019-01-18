import { createSelector } from '@ngrx/store';
import { selectSuggestedState } from '../../core.state';
import { SuggestedState } from './suggested.reducer';
import * as fromSuggested from './suggested.reducer';
import { PageQuery } from './suggested.actions';
import * as fromSettings from '@app/admin-panel/settings/state/settings.selectors';


/**
 * Select the totality of the suggested state
 */
export const selectSuggested = createSelector(
  selectSuggestedState,
  (state: SuggestedState) => state
);

/**
 * Select the total number of unique senders (by email address)
 */
export const selectUniqueSenders = createSelector(
  selectSuggestedState,
  fromSuggested.selectTotal
);

/**
 * Select all threadIds (this is temp, will be moved off to server)
 */
export const selectSuggestedThreadIds = createSelector(
  selectSuggested,
  (state: SuggestedState) => state.threadIds
);

/**
 * Select boolean to determine if suggestions are loaded from server
 */
export const selectSuggestionsLoaded = createSelector(
  selectSuggested,
  (state: SuggestedState) => state.allSuggestionsLoaded
);


export const selectAllSuggested = createSelector(
  selectSuggestedState,
  fromSuggested.selectAll
);

/**
 * Select suggested senders (email addresses) in decending
 * count (number of emails from sender) order                                 [description]
 */
export const selectByCount = createSelector(
  selectAllSuggested,
  sendersMore => sendersMore.sort((a,b) => b.count - a.count)
);

/**
 * Select Senders with count (number of emails from sender) more
 * than cutoff (a number set by user in settings)
 * @return:
 */
export const selectSenders_CountMoreThan = createSelector(
  selectByCount,
  fromSettings.selectCountCutoff,
  (suggestions, cutoff) => suggestions.filter(suggestion => suggestion.count >= cutoff),
);

/**
 * Select the length of the array of senders with count more
 * than cutoff
 * @return: number
 */
export const selectLengthOfSenders_CountMoreThan = createSelector(
  selectSenders_CountMoreThan,
  senders => senders.length
)

export const selectPageOfSenders_CountMoreThan = (page: PageQuery) => createSelector(
  selectSenders_CountMoreThan,
  sendersMore => {
    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return sendersMore.slice(start, end);
  }
);

export const selectSendersLess = createSelector(
  selectAllSuggested,
  fromSettings.selectCountCutoff,
  (suggestions, cutoff) => suggestions.filter(suggestion => suggestion.count < cutoff)
)
