import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SuggestionsState, State } from './suggestions.reducer';
import * as fromSenders from '@app/core/state/senders/senders.selectors';

export const selectSuggestionsState = createFeatureSelector<State, SuggestionsState>(
  'suggestions'
);

/**
 * Select boolean to determine if suggestions are loaded from server
 */
export const selectSuggestionsLoaded = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.suggestionsLoaded
);

export const selectCurrentSender = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.currentSender
);

/*******************************************************************************
 *  BY Name based on count
 * ****************************************************************************/


export const selectSendersByCount = createSelector(
  fromSenders.selectAll,
  (senders) => senders.sort((a, b) => b.count - a.count).slice()
);


/*******************************************************************************
 * SELECT BY SIZE
 ******************************************************************************/


export const selectSizeGroup = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.sizeGroup
);

export const selectSendersBySize = createSelector(
  fromSenders.selectAll,
  (senders) => senders.sort((a, b) => b.totalSizeEstimate - a.totalSizeEstimate).slice()
)

export const selectSendersBySizeGroupFiltered = createSelector(
  selectSendersBySize,
  selectSizeGroup,
  (senders, sizeGroup) => {
    if (sizeGroup === 'ALL') {
      return senders;
    } else {
      return senders.filter((sender) => sender.sizeGroup === sizeGroup)
    }
  }
);

