import {createFeatureSelector, createSelector} from '@ngrx/store';

import { GmailLabelState } from './gmail-label.reducer';

import * as fromGmailLabel from './gmail-label.reducer';

export const selectGmailLabelState = createFeatureSelector<GmailLabelState>("gmail-labels");

export const selectAllGmailLabels = createSelector(
  selectGmailLabelState,
  fromGmailLabel.selectAll
);

export const selectUserGmailLabels = createSelector(
  selectAllGmailLabels,
  gmailLabels => gmailLabels.filter(label => label.type == 'user')
);

export const allGmailLabelsLoaded = createSelector(
  selectGmailLabelState,
  gmailLabelsState => gmailLabelsState.allLabelsLoaded
);
