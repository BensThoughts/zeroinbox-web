import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { SuggestedActions, SuggestedActionTypes } from './suggested.actions';
import { ISuggested } from '../models/suggested.model';
import { Message } from '../../../services/gmail-api/suggested/suggested.service';

export interface SuggestedState extends EntityState<ISuggested> {
  threadIds: string[]
  nextPageTokens: string[]
}

export function selectSuggestedId(l: ISuggested) {
  return l.id.toString();
}

export const adapter: EntityAdapter<ISuggested> =
  createEntityAdapter<ISuggested>({
    selectId: selectSuggestedId
  });


const initialSuggestedState = adapter.getInitialState({
  threadIds: [],
  nextPageTokens: []
});

export function suggestedReducer(
  state = initialSuggestedState,
  action: SuggestedActions): SuggestedState {

    switch (action.type) {
      case SuggestedActionTypes.CollectPageToken:
        return {
          ...state,
          nextPageTokens: [...state.nextPageTokens, action.payload]
        };
      case SuggestedActionTypes.CollectThreadIds:
        return {
          ...state,
          threadIds: [...state.threadIds, ...action.payload]
        }

      case SuggestedActionTypes.AddSuggestedMessage:
        return adapter.addOne(action.payload, {...state});

      case SuggestedActionTypes.AddAllSuggestions:
        return adapter.addAll(action.payload, state);

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
