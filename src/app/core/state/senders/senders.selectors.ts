import { createSelector } from '@ngrx/store';
import { selectSendersState } from '../core.state';
// import { SendersState } from './senders.reducer';
import * as fromSenders from './senders.reducer';
import { of } from 'rxjs';

export const selectSenders= createSelector(
  selectSendersState,
  (state: fromSenders.SendersState) => state
);

export const selectSendersLoaded = createSelector(
    selectSendersState,
    (state: fromSenders.SendersState) => state.sendersLoaded
);

export const selectUniqueSenders = createSelector(
    selectSendersState,
    fromSenders.selectTotal
);

export const selectEntities = createSelector(
    selectSendersState,
    fromSenders.selectEntities
)

export const selectSendersById = (senderIds: string[]) => createSelector(
    selectEntities,
    (entities) => {
        let senders = senderIds.map((senderId) => {
            return entities[senderId];
        });
        return senders;
    }
);