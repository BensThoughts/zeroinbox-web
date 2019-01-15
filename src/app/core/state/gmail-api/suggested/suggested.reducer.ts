import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { SuggestedActions, SuggestedActionTypes } from './suggested.actions';
import { ISuggested } from '../models/suggested.model';

export interface SuggestedState extends EntityState<ISuggested> {
  threadIds: string[],
  allSuggestionsLoaded: boolean
}

export function selectSuggestedId(l: ISuggested) {
  return l.fromAddress;
}

export function sortByCount(l1: ISuggested, l2: ISuggested) {
  return l2.count - l1.count;
}

export const adapter: EntityAdapter<ISuggested> =
  createEntityAdapter<ISuggested>({
    selectId: selectSuggestedId,
    sortComparer: sortByCount
  });


const initialSuggestedState = adapter.getInitialState({
  threadIds: [],
  allSuggestionsLoaded: false
});

export function suggestedReducer(
  state = initialSuggestedState,
  action: SuggestedActions): SuggestedState {

    switch (action.type) {

      case SuggestedActionTypes.AddAllThreadIds:
        return {
          ...state,
          threadIds: action.payload
        };

      case SuggestedActionTypes.AddAllSuggestions:
        return adapter.addAll(action.payload, { ...state, allSuggestionsLoaded: true });

      case SuggestedActionTypes.ResetSuggestedState:
        return initialSuggestedState;

      case SuggestedActionTypes.UpdateSuggestedState:
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
