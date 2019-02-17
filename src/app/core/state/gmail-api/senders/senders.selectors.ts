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
 * Select boolean to determine if suggestions are loaded from server
 */
export const selectfirstRun = createSelector(
  selectSenders,
  (state: SendersState) => state.firstRun
);
