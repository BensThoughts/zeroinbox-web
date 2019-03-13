import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ByCountActions, SuggestionsActionTypes } from './suggestions.actions';
import { ISuggestion } from '../model/suggestions.model';
import { AppState } from '@app/core';

export interface State extends AppState {
  suggestions: SuggestionsState;
}

export interface SuggestionsState extends EntityState<ISuggestion> {
  suggestionsLoaded: boolean;
  cutoff: number;
  sizeCutoff: string;
}

export function selectSendersId(l: ISuggestion) {
  return l.id;
}

export const adapter: EntityAdapter<ISuggestion> =
  createEntityAdapter<ISuggestion>({
    selectId: selectSendersId,
  });


const initialSuggestionsState = adapter.getInitialState({
  suggestionsLoaded: false,
  cutoff: 1,
  sizeCutoff: 'MD'
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

      case SuggestionsActionTypes.SetCountCutoff:
        return { ...state, cutoff: action.payload.countCutoff };

      case SuggestionsActionTypes.SetSizeCutoff:
        return { ...state, sizeCutoff: action.payload.sizeCutoff };

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
