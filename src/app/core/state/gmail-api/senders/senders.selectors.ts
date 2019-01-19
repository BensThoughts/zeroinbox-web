import { createSelector } from '@ngrx/store';
import { selectSendersState } from '../../core.state';
import { SendersState } from './senders.reducer';
import * as fromSenders from './senders.reducer';
import { PageQuery } from './senders.actions';
import * as fromSettings from '@app/admin-panel/settings/state/settings.selectors';
import { ISenders } from '../models/senders.model';


/**
 * Select the totality of the senders state
 */
export const selectSenders = createSelector(
  selectSendersState,
  (state: SendersState) => state
);

/**
 * Select the total number of unique senders (by email address)
 */
export const selectUniqueSenders = createSelector(
  selectSendersState,
  fromSenders.selectTotal
);

/**
 * Select all threadIds (this is temp, will be moved off to server)
 */
export const selectSendersThreadIds = createSelector(
  selectSenders,
  (state: SendersState) => state.threadIds
);

/**
 * Select boolean to determine if suggestions are loaded from server
 */
export const selectSendersLoaded = createSelector(
  selectSenders,
  (state: SendersState) => state.allSuggestionsLoaded
);


export const selectAllSenders = createSelector(
  selectSendersState,
  fromSenders.selectAll
);

/**
 * Select senders senders (email addresses) in decending
 * count (number of emails from sender) order                                 [description]
 */
export const selectByCount = createSelector(
  selectAllSenders,
  sendersMore => sendersMore.sort((a,b) => b.count - a.count)
);

/**
 * Select Senders with count (number of emails from sender) more
 * than cutoff (a number set by user in settings)
 * @return:
 */
export const selectSenders_CountMoreThan  = createSelector(
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
);


export const selectSenders_CountBetween  = createSelector(
  selectAllSenders,
  fromSettings.selectCountCutoff,
  (suggestions, cutoff) => suggestions.filter(suggestion => suggestion.count < cutoff)
);

export const selectSenders_CountBetween_Count = createSelector(
  selectSenders_CountBetween,
  (sendersLess) => {
    let count = 0;
    sendersLess.forEach((sender) => {
      count = count + sender.count
    });
    return count;
  }
);

export const selectPageOfSenders_CountMoreThan = (page: PageQuery) => createSelector(
  selectSenders_CountMoreThan,
  (sendersMore) => {
    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return sendersMore.slice(start, end);
  }
);
