import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ByCountActions, SuggestionsActionTypes } from './suggestions.actions';
import { AppState } from '@app/core';

export interface State extends AppState {
  suggestions: SuggestionsState;
}

export interface SuggestionsState {
  suggestionsLoaded: boolean;
  countCutoff: number;
  sizeGroup: string;
}


const initialSuggestionsState = {
  suggestionsLoaded: false,
  countCutoff: 1,
  sizeGroup: 'ALL'
}

export function suggestionsReducer(
  state = initialSuggestionsState,
  action: ByCountActions): SuggestionsState {

    switch (action.type) {

      case SuggestionsActionTypes.SetSizeCutoff:
        return { ...state, sizeGroup: action.payload.sizeCutoff };

      case SuggestionsActionTypes.ResetSuggestions:
        return initialSuggestionsState;

      case SuggestionsActionTypes.UpdateSuggestionsState:
        return action.payload;

      default:
        return state;
    }

}
