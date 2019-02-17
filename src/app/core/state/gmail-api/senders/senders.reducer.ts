import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { SendersActions, SendersActionTypes } from './senders.actions';
import { ISender } from '../models/senders.model';

export interface SendersState {
  firstRun: boolean,
}

const initialSendersState = {
  firstRun: true,
};

export function sendersReducer(
  state = initialSendersState,
  action: SendersActions): SendersState {

    switch (action.type) {

      case SendersActionTypes.LoadingStatusRequested:
        return { ...state, firstRun: false }

      case SendersActionTypes.AllSuggestionsRequested:
        return { ...state, firstRun: false }

      case SendersActionTypes.UpdateSendersState:
        return action.payload;

      case SendersActionTypes.ResetSendersState:
        return initialSendersState;

      default:
        return state;
    }
}
