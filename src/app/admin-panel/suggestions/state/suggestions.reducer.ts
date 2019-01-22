import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ByCountActions, SuggestionsActionTypes } from './suggestions.actions';
import { ISuggestion } from './suggestions.model';
import { AppState } from '@app/core';

export interface State extends AppState {
  suggestions: SuggestionsState;
}

export interface SuggestionsState extends EntityState<ISuggestion> {
  cutoff: number;
}

export function selectSendersId(l: ISuggestion) {
  return l.id;
}

export const adapter: EntityAdapter<ISuggestion> =
  createEntityAdapter<ISuggestion>({
    selectId: selectSendersId,
  });


const initialSuggestionsState = adapter.getInitialState({
  cutoff: 5
});

export function suggestionsReducer(
  state = initialSuggestionsState,
  action: ByCountActions): SuggestionsState {

    switch (action.type) {

      case SuggestionsActionTypes.LoadSuggestions:
        return adapter.addAll(action.payload.suggestions, state);

      case SuggestionsActionTypes.DeleteSuggestions:
        return adapter.removeMany(action.payload.ids, state);

      case SuggestionsActionTypes.UpdateSuggestions:
        return adapter.updateMany(action.payload.suggestions, state);

      case SuggestionsActionTypes.SetCutoff:
        return { ...state, cutoff: action.payload.cutoff };

      case SuggestionsActionTypes.ResetSuggestions:
        return initialSuggestionsState

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
