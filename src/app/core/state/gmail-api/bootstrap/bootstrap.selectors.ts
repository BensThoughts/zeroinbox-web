import { createSelector } from '@ngrx/store';
import { selectSendersState } from '../../core.state';
import { BootstrapState } from './bootstrap.reducer';

/**
 * Select the totality of the senders state
 */
export const selectBootstrap = createSelector(
  selectSendersState,
  (state: BootstrapState) => state
);

/**
 * Select boolean to determine if suggestions are loaded from server
 */
export const selectfirstRun = createSelector(
  selectBootstrap,
  (state: BootstrapState) => state.firstRun
);
