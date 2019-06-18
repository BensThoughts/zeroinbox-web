import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ByCountActions, SendersViewActionTypes } from './senders-view.actions';
import { AppState } from '@app/core';
import { ISender } from '../../../core/state/senders/model/senders.model';

export interface State extends AppState {
  'senders-view': SendersViewState;
}

export interface SendersViewState {
  suggestionsLoaded: boolean;
  countCutoff: number;
  sizeGroup: string;
  currentSender: ISender;
}


const initialSuggestionsState = {
  suggestionsLoaded: false,
  countCutoff: 1,
  sizeGroup: 'ALL',
  currentSender: undefined
}

export function suggestionsReducer(
  state = initialSuggestionsState,
  action: ByCountActions): SendersViewState {

    switch (action.type) {

      case SendersViewActionTypes.SetSizeCutoff:
        return { ...state, sizeGroup: action.payload.sizeCutoff };

      case SendersViewActionTypes.SetCurrentSender:
        return { ...state, currentSender: action.payload.sender };

      case SendersViewActionTypes.ResetSuggestions:
        return initialSuggestionsState;

      case SendersViewActionTypes.UpdateSuggestionsState:
        return action.payload;

      default:
        return state;
    }

}
