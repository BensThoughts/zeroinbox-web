import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ByCountActions, SuggestionsActionTypes } from './suggestions.actions';
import { ISuggestion } from '../model/suggestions.model';
import { AppState } from '@app/core';

export interface State extends AppState {
  suggestions: SuggestionsState;
}

export interface SuggestionsState extends EntityState<ISuggestion> {
  suggestionsLoaded: boolean;
  countCutoff: number;
  sizeGroup: string;
}

export function selectSendersId(suggestion: ISuggestion) {
  return suggestion.senderId;
}

export const adapter: EntityAdapter<ISuggestion> =
  createEntityAdapter<ISuggestion>({
    selectId: selectSendersId,
  });


const initialSuggestionsState = adapter.getInitialState({
  suggestionsLoaded: false,
  countCutoff: 1,
  sizeGroup: 'MD'
});

export function suggestionsReducer(
  state = initialSuggestionsState,
  action: ByCountActions): SuggestionsState {

    switch (action.type) {

      case SuggestionsActionTypes.LoadSuggestions:
        return adapter.addAll(action.payload.suggestions, { ...state, suggestionsLoaded: true });

      case SuggestionsActionTypes.DeleteSuggestions:
        return adapter.removeMany(action.payload.ids, state);

      case SuggestionsActionTypes.UpdateSuggestions:
        return adapter.updateMany(action.payload.suggestions, state);

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

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
