import { createSelector } from '@ngrx/store';
import { selectBootstrapState } from '../core.state';
import { BootstrapState } from './bootstrap.reducer';

/**
 * Select the totality of the senders state
 */
export const selectBootstrap = createSelector(
  selectBootstrapState,
  (state: BootstrapState) => state
);

export const selectFirstRun = createSelector(
  selectBootstrap,
  (state: BootstrapState) => state.firstRun
);

export const selectDownloadingStatus = createSelector(
  selectBootstrap,
  (state: BootstrapState) => state.downloadingStatus
);

export const selectPercentLoaded = createSelector(
  selectBootstrap,
  (state: BootstrapState) => state.percentLoaded
);

export const selectIsBootstrapped = createSelector(
  selectBootstrap,
  (state: BootstrapState) => state.isBootstrapped
);
