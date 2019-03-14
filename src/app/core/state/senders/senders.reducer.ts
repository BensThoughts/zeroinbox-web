import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ISender } from './model/senders.model';
import { SendersActionTypes } from './senders.actions';

export interface SendersState extends EntityState<ISender> {
    sendersLoaded: boolean;
}

export function selectSendersId(sender: ISender) {
    return sender.senderId;
  }
  
export const adapter: EntityAdapter<ISender> =
  createEntityAdapter<ISender>({
    selectId: selectSendersId,
  });
  
  
const initialSuggestionsState = adapter.getInitialState({
  sendersLoaded: false,
});

export function sendersReducer(
  state = initialSuggestionsState,
  action): SendersState {

    switch (action.type) {

      case SendersActionTypes.AddAllSenders:  
        return adapter.addAll(action.payload.senders, { ...state, sendersLoaded: true });

      case SendersActionTypes.UpdateSendersState:
        return action.payload;
      
      case SendersActionTypes.ResetSendersState:
        return initialSuggestionsState;
      
      default:
        return state;
    }
  }


export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();


