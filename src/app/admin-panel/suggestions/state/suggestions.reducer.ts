import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ByCountActions, SuggestionsActionTypes } from './suggestions.actions';
import { AppState } from '@app/core';
import { ISender } from '../../../core/state/senders/model/senders.model';

export interface State extends AppState {
  suggestions: SuggestionsState;
}

export interface SuggestionsState {
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
  action: ByCountActions): SuggestionsState {

    switch (action.type) {

      case SuggestionsActionTypes.SetSizeCutoff:
        return { ...state, sizeGroup: action.payload.sizeCutoff };

      case SuggestionsActionTypes.SetCurrentSender:
        return { ...state, currentSender: action.payload.sender };

      case SuggestionsActionTypes.ResetSuggestions:
        return initialSuggestionsState;

      case SuggestionsActionTypes.UpdateSuggestionsState:
        return action.payload;

      default:
        return state;
    }

}
