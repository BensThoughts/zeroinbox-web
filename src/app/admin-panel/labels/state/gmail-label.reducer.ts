import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { IGmailLabel } from './models/gmail-label.model';
import { GmailLabelActions, GmailLabelActionTypes } from './gmail-label.actions';

export interface GmailLabelState extends EntityState<IGmailLabel> {
  allLabelsLoaded: boolean;
}

export function selectGmailLabelName(l: IGmailLabel) {
  return l.name;
}

export function sortByName(l1: IGmailLabel, l2:IGmailLabel) {
  return l1.name.localeCompare(l2.name);
}

export const adapter : EntityAdapter<IGmailLabel> =
  createEntityAdapter<IGmailLabel>({
      sortComparer: sortByName,
      selectId: selectGmailLabelName
  });

const initialGmailLabelState = adapter.getInitialState({
  allLabelsLoaded: false
});

export function gmailLabelReducer(
  state = initialGmailLabelState,
  action: GmailLabelActions) : GmailLabelState {

    switch(action.type) {

      case GmailLabelActionTypes.GmailLabelsLoaded:
        return adapter.addAll(action.payload.gmailLabels, { ...state, allLabelsLoaded: true });

      //case GmailLabelActionTypes.GmailLabelsLoaded:
      //  return { ...state, loading: false };

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
