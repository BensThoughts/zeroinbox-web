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

export const selectSuggestionsLoaded = createSelector(
  selectBootstrap,
  (state: BootstrapState) => state.suggestionsLoaded
);

export const selectLoadingSuggestions = createSelector(
  selectBootstrap,
  (stat: BootstrapState) => stat.loadingSuggestions
)
