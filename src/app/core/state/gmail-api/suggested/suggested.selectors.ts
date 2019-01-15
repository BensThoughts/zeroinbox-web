import { createSelector } from '@ngrx/store';
import { selectSuggestedState } from '../../core.state';
import { SuggestedState } from './suggested.reducer';

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
)
