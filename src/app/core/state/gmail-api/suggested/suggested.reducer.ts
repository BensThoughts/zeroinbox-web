import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { SuggestedActions, SuggestedActionTypes } from './suggested.actions';
import { ISuggested } from '../models/suggested.model';

export interface SuggestedState extends EntityState<ISuggested> {
  allInboxIdsLoaded: boolean;
}

// export function selectSuggestedId(l: ISuggested) {
//   return l.id;
// }

// export function sortByName(l1: IGmailLabel, l2: IGmailLabel) {
//   return l1.name.localeCompare(l2.name);
// }

export const adapter: EntityAdapter<ISuggested> =
  createEntityAdapter<ISuggested>({
      // sortComparer: sortByName,
      // selectId: selectGmailLabelName
  });

const initialSuggestedState = adapter.getInitialState({
  allInboxIdsLoaded: false
});

export function suggestedReducer(
  state = initialSuggestedState,
  action: SuggestedActions): SuggestedState {

    switch (action.type) {

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
