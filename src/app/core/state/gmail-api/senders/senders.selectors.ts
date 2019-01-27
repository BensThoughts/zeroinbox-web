import { createSelector } from '@ngrx/store';
import { selectSendersState } from '../../core.state';
import { SendersState } from './senders.reducer';
import * as fromSenders from './senders.reducer';
import { PageQuery } from './senders.actions';
import * as fromSettings from '@app/admin-panel/settings/state/settings.selectors';
import { ISender } from '../models/senders.model';


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
  (state: SendersState) => state.allSendersLoaded
);

export const selectThreadIdsLoaded = createSelector(
  selectSenders,
  (state: SendersState) => state.allThreadIdsLoaded
);


export const selectAllSenders = createSelector(
  selectSendersState,
  fromSenders.selectAll
);

export const selectSendersAddress = (id: string) => createSelector(
  fromSenders.selectEntities,
  (senders) => senders[id].fromAddress
);

export const selectSendersCount = (id: string) => createSelector(
  fromSenders.selectEntities,
  (senders) => senders[id].count
);
