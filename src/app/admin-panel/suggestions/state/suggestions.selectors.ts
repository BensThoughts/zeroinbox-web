import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { SuggestionsState, State } from './suggestions.reducer';
import * as fromSuggestions from './suggestions.reducer';
import { PageQuery } from '../components/suggestions-count-table/suggestions-count-table.component';
import * as fromTasks from '@app/core/state/tasks/tasks.selectors';
import { ISuggestion, ISizes } from '../model/suggestions.model';



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


export const select_Tasks_Suggestions_Entities = createSelector(
  fromTasks.selectEntities,
  selectEntities,
  (tasks, suggestions) => {
    return { tasks: tasks, suggestions: suggestions };
  }
);


/**
 * Select boolean to determine if suggestions are loaded from server
 */
export const selectSuggestionsLoaded = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.suggestionsLoaded
);



/*******************************************************************************
 *  BY COUNT
 * ****************************************************************************/

export const selectCountCutoff = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.cutoff
);



export const selectByCount = createSelector(
  selectAllSuggestions,
  sendersMore => sendersMore.sort((a,b) => b.count - a.count)
);


export const selectNotLabeledByName = createSelector(
  selectByCount,
  suggestions => suggestions.filter((suggestion) => {
    return suggestion.labelByName === undefined;
  })
);


export const selectByCountCutoff  = createSelector(
  selectNotLabeledByName,
  selectCountCutoff,
  (suggestions, cutoff) => suggestions.filter(suggestion => suggestion.count >= cutoff),
);


export const selectByCountLength = createSelector(
  selectByCountCutoff,
  senders => senders.length
);


export const selectByCountPage = (page: PageQuery) => createSelector(
  selectByCountCutoff,
  (sendersMore) => {
    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return sendersMore.slice(start, end);
  }
);


/*******************************************************************************
 * SELECT BY SIZE
 ******************************************************************************/


export const selectBySize = createSelector(
  selectAllSuggestions,
  suggestions => suggestions.sort((a, b) => b.totalSizeEstimate - a.totalSizeEstimate)
);


export const selectBySizeFiltered = createSelector(
  selectBySize,
  (suggestions) => suggestions.filter((suggestion) => suggestion.labelBySize === undefined)
);


export const selectSizeCutoff = createSelector(
  selectSuggestionsState,
  (state: SuggestionsState) => state.sizeCutoff
);


export const selectBySizeGroupFiltered = createSelector(
  selectBySizeFiltered,
  selectSizeCutoff,
  (suggestions, cutoff) => {
    return filterBySize(suggestions, cutoff);
  }
);


export const selectBySizeGroupLength = createSelector(
  selectBySizeGroupFiltered,
  (suggestions) => suggestions.length
);


export const selectBySizeGroupPage = (page: PageQuery) => createSelector(
  selectBySizeGroupFiltered,
  (sendersMore) => {
    const start = page.pageIndex * page.pageSize,
          end = start + page.pageSize;

    return sendersMore.slice(start, end);
  }
);


/*******************************************************************************
 *  CHARTS
 ******************************************************************************/

export const C_XL = 500;
export const C_LG = 100;
export const C_MD = 50;
export const C_SM = 15;

export const selectByCountGroup = createSelector(
  selectByCount,
  suggestions => {
    return {
        Xl: suggestions.filter((suggestion) => {
          return suggestion.count >= C_XL
        }),
        Lg: suggestions.filter((suggestion) => {
          return suggestion.count >= C_LG && suggestion.count < C_XL
        }),
        Md: suggestions.filter((suggestion) => {
          return suggestion.count >= C_MD && suggestion.count < C_LG
        }),
        Sm: suggestions.filter((suggestion) => {
          return suggestion.count >= C_SM && suggestion.count < C_MD
        }),
        Xs: suggestions.filter((suggestion) => {
          return suggestion.count < C_SM
        }),
    }
  }
);

export const selectByCountGroup_TL = createSelector(
  selectByCountGroup,
  (suggestions) => {
    return <ISizes> {
      Xl: suggestions.Xl.length,
      Lg: suggestions.Lg.length,
      Md: suggestions.Md.length,
      Sm: suggestions.Sm.length,
      Xs: suggestions.Xs.length
    }
  }
);

export const selectByCountGroup_TS = createSelector(
  selectByCountGroup,
  (suggestions) => {
    return <ISizes> {
      Xl: accumSize(suggestions.Xl),
      Lg: accumSize(suggestions.Lg),
      Md: accumSize(suggestions.Md),
      Sm: accumSize(suggestions.Sm),
      Xs: accumSize(suggestions.Xs)
    }
  }
);

export const selectByCountGroup_TC = createSelector(
  selectByCountGroup,
  (suggestions) => {
    return <ISizes> {
      Xl: accumCount(suggestions.Xl),
      Lg: accumCount(suggestions.Lg),
      Md: accumCount(suggestions.Md),
      Sm: accumCount(suggestions.Sm),
      Xs: accumCount(suggestions.Xs),
    }
  }
);


export const selectBySizeGroup = createSelector(
  selectBySize,
  suggestions => {
    return {
        Xl: filterBySize(suggestions, 4),
        Lg: filterBySize(suggestions, 3),
        Md: filterBySize(suggestions, 2),
        Sm: filterBySize(suggestions, 1),
        Xs: filterBySize(suggestions, 0),
    }
  }
);


export const selectBySizeGroup_TL = createSelector(
  selectBySizeGroup,
  (suggestions) => {
    return <ISizes> {
      Xl: suggestions.Xl.length,
      Lg: suggestions.Lg.length,
      Md: suggestions.Md.length,
      Sm: suggestions.Sm.length,
      Xs: suggestions.Xs.length
    }
  }
);

export const selectBySizeGroup_TS = createSelector(
  selectBySizeGroup,
  (suggestions) => {

    return <ISizes> {
        Xl: accumSize(suggestions.Xl),
        Lg: accumSize(suggestions.Lg),
        Md: accumSize(suggestions.Md),
        Sm: accumSize(suggestions.Sm),
        Xs: accumSize(suggestions.Xs)
      }
  }
);

export const selectBySizeGroup_TC = createSelector(
  selectBySizeGroup,
  (suggestions) => {
    return <ISizes> {
      Xl: accumCount(suggestions.Xl),
      Lg: accumCount(suggestions.Lg),
      Md: accumCount(suggestions.Md),
      Sm: accumCount(suggestions.Sm),
      Xs: accumCount(suggestions.Xs)
    }
  }
);



export const DECIMAL = 100;

export function accumSize(suggestions: ISuggestion[]) {
  let acc = suggestions.map((suggestion) => {
    return suggestion.totalSizeEstimate;
  });
  if (acc.length >= 1) {
    let temp = acc.reduce((accum, curr) => accum + curr) * DECIMAL;
    return Math.round(temp)/DECIMAL;
  } else {
    return 0;
  }
}


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

export const EX_LARGE = 1;
export const LARGE = .5;
export const MEDIUM = .2;
export const SMALL = .08;

export function filterBySize(suggestions: ISuggestion[], cutoff: number) {

  try {
    switch (cutoff) {

      case 4:
        return suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate >= EX_LARGE);
        });
      case 3:
        return suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate < EX_LARGE) && (suggestion.totalSizeEstimate >= LARGE);
        });
      case 2:
        return  suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate < LARGE) && (suggestion.totalSizeEstimate >= MEDIUM);
        });
      case 1:
        return suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate < MEDIUM) && (suggestion.totalSizeEstimate >= SMALL);
        });
      case 0:
        return suggestions.filter((suggestion) => {
          return (suggestion.totalSizeEstimate < SMALL);
        })

      default:
        throw Error('Error: case is not one of 0-4 (Small - Extra Large)');

    }
  } catch(err) {
    console.error(err);
  }

}
