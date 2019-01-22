import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SuggestionsState, State } from './suggestions.reducer';
import * as fromSuggestions from './suggestions.reducer';
import * as fromSettings from '@app/admin-panel/settings/state/settings.selectors';
import { PageQuery } from '../components/suggestions-table/suggestions-table.component';
import { AppState } from '@app/core';
import * as fromTasks from '@app/core/state/tasks/tasks.selectors';



export const selectSuggestionsState = createFeatureSelector<State, SuggestionsState>(
  'suggestions'
);

export const selectEntities = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectEntities
);

export const selectUniqueSenders = createSelector(
  fromSuggestions.selectTotal
);

export const selectAllSuggestions = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectAll
);

export const selectCutoff = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.cutoff
)

/**
 * Select senders senders (email addresses) in decending
 * count (number of emails from sender) order                                 [description]
 */
export const selectByCount = createSelector(
  selectAllSuggestions,
  sendersMore => sendersMore.sort((a,b) => b.count - a.count)
);


export const selectNotLabeledByName = createSelector(
  selectByCount,
  suggestions => suggestions.filter((suggestion) => {
    // console.log(suggestion.labelByName);
    // return suggestion;
    return suggestion.labelByName === undefined;
  })
);
/**
 * Select Senders with count (number of emails from sender) more
 * than cutoff (a number set by user in settings)
 * @return:
 */
export const selectSuggestions_CountMoreThan  = createSelector(
  selectNotLabeledByName,
  selectCutoff,
  (suggestions, cutoff) => suggestions.filter(suggestion => suggestion.count >= cutoff),
);

/**
 * Select the length of the array of senders with count more
 * than cutoff
 * @return: number
 */
export const selectLengthOfSuggestions_CountMoreThan = createSelector(
  selectSuggestions_CountMoreThan,
  senders => senders.length
);



export const selectPageOfSuggestions_CountMoreThan = (page: PageQuery) => createSelector(
  selectSuggestions_CountMoreThan,
  (sendersMore) => {
    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return sendersMore.slice(start, end);
  }
);


export const select_Tasks_Suggestions_Entities = createSelector(
  fromTasks.selectEntities,
  selectEntities,
  (tasks, suggestions) => {
    return { tasks: tasks, suggestions: suggestions };
  }
);
