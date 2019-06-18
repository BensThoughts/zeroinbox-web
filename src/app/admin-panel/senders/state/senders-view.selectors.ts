import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SendersViewState, State } from './senders-view.reducer';
import * as fromSenders from '@app/core/state/senders/senders.selectors';

export const selectSendersViewState = createFeatureSelector<State, SendersViewState>(
  'senders-view'
);

export const selectCurrentSender = createSelector(
  selectSendersViewState,
  (state: SendersViewState) => state.currentSender
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
  selectSendersViewState,
  (state: SendersViewState) => state.sizeGroup
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

