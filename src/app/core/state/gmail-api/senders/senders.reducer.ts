import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { SendersActions, SendersActionTypes } from './senders.actions';
import { ISender } from '../models/senders.model';

export interface SendersState extends EntityState<ISender> {
  threadIds: string[],
  allSendersLoaded: boolean,
  allThreadIdsLoaded: boolean,
}

export function selectSendersId(l: ISender) {
  return l.id;
}

export function sortByCount(l1: ISender, l2: ISender) {
  return l2.count - l1.count;
}

export const adapter: EntityAdapter<ISender> =
  createEntityAdapter<ISender>({
    selectId: selectSendersId,
    // sortComparer: sortByCount
  });


const initialSendersState = adapter.getInitialState({
  threadIds: [],
  allSendersLoaded: false,
  allThreadIdsLoaded: false,
});

export function sendersReducer(
  state = initialSendersState,
  action: SendersActions): SendersState {

    switch (action.type) {

      case SendersActionTypes.AddAllThreadIds:
        return {
          ...state,
          threadIds: action.payload,
          allThreadIdsLoaded: true
        };

      case SendersActionTypes.AddAllSenders:
        return adapter.addAll(action.payload, { ...state, allSendersLoaded: true });


      case SendersActionTypes.UpdateSendersState:
        return action.payload;

      case SendersActionTypes.SendersRemoveMany:
        return adapter.removeMany(action.payload.ids, state);

      case SendersActionTypes.ResetSendersState:
        return initialSendersState;

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
