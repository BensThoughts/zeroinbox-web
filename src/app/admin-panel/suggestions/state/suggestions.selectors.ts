import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { SuggestionsState, State } from './suggestions.reducer';
import * as fromSuggestions from './suggestions.reducer';
import * as fromSettings from '@app/admin-panel/settings/state/settings.selectors';
import { PageQuery } from '../components/suggestions-table/suggestions-table.component';
import { AppState } from '@app/core';
import * as fromTasks from '@app/core/state/tasks/tasks.selectors';
import { ISuggestion } from './suggestions.model';



export const selectSuggestionsState = createFeatureSelector<State, SuggestionsState>(
  'suggestions'
);

export const selectEntities = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectEntities
);

export const selectUniqueSenders = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectTotal
);

export const selectAllSuggestions = createSelector(
  selectSuggestionsState,
  fromSuggestions.selectAll
);

/**
 * Select boolean to determine if suggestions are loaded from server
 */
export const selectSuggestionsLoaded = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.suggestionsLoaded
);

export const selectCutoff = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.cutoff
);

export const selectMode = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.selectionMode
);



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



export const selectPage = (page: PageQuery) => createSelector(
  selectMode,
  selectPageOfSuggestions_CountMoreThan(page),
  (mode, count) => {
    switch(mode) {

      case 'COUNT':
        return count;

      default:
        return count;
    }
  },
);

export const select_Tasks_Suggestions_Entities = createSelector(
  fromTasks.selectEntities,
  selectEntities,
  (tasks, suggestions) => {
    return { tasks: tasks, suggestions: suggestions };
  }
);




export const selectBySize = createSelector(
  selectAllSuggestions,
  suggestions => suggestions.sort((a, b) => b.totalSizeEstimate - a.totalSizeEstimate)
);

export const selectSizeCutoff = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.sizeCutoff
);


export const EX_LARGE = 1;
export const LARGE = .5;
export const MEDIUM = .3;
export const SMALL = .2;

export const selectBySizeGroup = createSelector(
  selectBySize,
  selectSizeCutoff,
  (suggestions, cutoff) => {
    switch (cutoff) {

      case 4:
        return suggestions.filter((suggestion) => {
          return suggestion.totalSizeEstimate >= EX_LARGE
        });
      case 3:
        return suggestions.filter((suggestion) => {
          return suggestion.totalSizeEstimate < EX_LARGE && suggestion.totalSizeEstimate >= LARGE;
        });
      case 2:
        return  suggestions.filter((suggestion) => {
          return suggestion.totalSizeEstimate < LARGE && suggestion.totalSizeEstimate >= MEDIUM;
        });
      case 1:
        return suggestions.filter((suggestion) => {
          return suggestion.totalSizeEstimate < MEDIUM && suggestion.totalSizeEstimate >= SMALL;
        });
      case 0:
        return suggestions.filter((suggestion) => {
                return suggestion.totalSizeEstimate < SMALL;
               })

      default:
        return suggestions.filter((suggestion) => {
                  return suggestion.totalSizeEstimate < EX_LARGE && suggestion.totalSizeEstimate >= LARGE;
                });
    }
  }
);



export const selectBySize_MBMoreThan = createSelector(
  selectBySize,
  suggestions => {
    return {
        Xl: suggestions.filter((suggestion) => suggestion.totalSizeEstimate > 10),
        Lg: suggestions.filter((suggestion) => suggestion.totalSizeEstimate > 5),
        Md: suggestions.filter((suggestion) => suggestion.totalSizeEstimate > 1),
        Sm: suggestions.filter((suggestion) => suggestion.totalSizeEstimate > 1/2),
        Xs: suggestions.filter((suggestion) => suggestion.totalSizeEstimate < 1/2),
    }
  }
);

export const MB = 1000000;
export const DECIMAL = 100;

export const selectBySize_Total = createSelector(
  selectBySize_MBMoreThan,
  (suggestions) => {

    let results = {
        Xl: accum(suggestions.Xl),
        Lg: accum(suggestions.Lg),
        Md: accum(suggestions.Md),
        Sm: accum(suggestions.Sm),
        Xs: accum(suggestions.Xs)
      }
    return results;
  }
);




export function accum(suggestions: ISuggestion[]) {
  let acc = suggestions.map((suggestion) => {
    return suggestion.totalSizeEstimate;
  });
  if (acc.length >= 1) {
    return acc.reduce((accum, curr) => accum + curr);
  } else {
    return 0;
  }
}


export const selectByCount_MoreThan = createSelector(
  selectBySize,
  suggestions => {
    return {
        Xl: suggestions.filter((suggestion) => suggestion.count > 500),
        Lg: suggestions.filter((suggestion) => suggestion.count > 100),
        Md: suggestions.filter((suggestion) => suggestion.count > 50),
        Sm: suggestions.filter((suggestion) => suggestion.count > 15),
        Xs: suggestions.filter((suggestion) => suggestion.count < 15),
    }
  }
);

export const selectByCount_MoreThanTotal = createSelector(
  selectByCount_MoreThan,
  (suggestions) => {
    return {
      Xl: accumCount(suggestions.Xl),
      Lg: accumCount(suggestions.Lg),
      Md: accumCount(suggestions.Md),
      Sm: accumCount(suggestions.Sm),
      Xs: accumCount(suggestions.Xs),
    }
  }
);

export function accumCount(suggestions: ISuggestion[]) {
  let acc = suggestions.map((suggestion) => {
    return suggestion.count;
  })
  if (acc.length >= 1) {
    return acc.reduce((accum, curr) => accum + curr);
  } else {
    return 0;
  }
}

export const selectBySizeLength = createSelector(
  selectBySizeGroup,
  (suggestions) => suggestions.length
);

export const selectBySizePage = (page: PageQuery) => createSelector(
  selectBySizeGroup,
  (sendersMore) => {
    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return sendersMore.slice(start, end);
  }
);
