import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { SendersActions, SendersActionTypes } from './senders.actions';
import { ISenders } from '../models/senders.model';

export interface SendersState extends EntityState<ISenders> {
  threadIds: string[],
  allSuggestionsLoaded: boolean,
}

export function selectSendersId(l: ISenders) {
  return l.id;
}

export function sortByCount(l1: ISenders, l2: ISenders) {
  return l2.count - l1.count;
}

export const adapter: EntityAdapter<ISenders> =
  createEntityAdapter<ISenders>({
    selectId: selectSendersId,
    // sortComparer: sortByCount
  });


const initialSendersState = adapter.getInitialState({
  threadIds: [],
  allSuggestionsLoaded: false
});

export function sendersReducer(
  state = initialSendersState,
  action: SendersActions): SendersState {

    switch (action.type) {

      case SendersActionTypes.AddAllThreadIds:
        return {
          ...state,
          threadIds: action.payload
        };

      case SendersActionTypes.AddAllSenders:
        return adapter.addAll(action.payload, { ...state, allSuggestionsLoaded: true });

      case SendersActionTypes.ResetSendersState:
        return initialSendersState;

      case SendersActionTypes.UpdateSendersState:
        return action.payload;

      case SendersActionTypes.SendersToggleUpdate:
        return adapter.updateOne(action.payload.iSenders, state);

      case SendersActionTypes.SendersToggleUpdateMany:
        return adapter.updateMany(action.payload.iSenderss, state);

      case SendersActionTypes.SendersRemoveMany:
        return adapter.removeMany(action.payload.ids, state);

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
