import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ISender } from './model/senders.model';
import { SendersActionTypes } from './senders.actions';

export interface SendersState extends EntityState<ISender> {
    suggestionsLoaded: boolean;
}

export function selectSendersId(l: ISender) {
    return l.id;
  }
  
export const adapter: EntityAdapter<ISender> =
  createEntityAdapter<ISender>({
    selectId: selectSendersId,
  });
  
  
const initialSuggestionsState = adapter.getInitialState({
  suggestionsLoaded: false,
});

export function suggestionsReducer(
  state = initialSuggestionsState,
  action): SendersState {

    switch (action.type) {

      case SendersActionTypes.AddAllSenders:
        return adapter.addAll(action.payload.suggestions, { ...state, suggestionsLoaded: true });
      
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


