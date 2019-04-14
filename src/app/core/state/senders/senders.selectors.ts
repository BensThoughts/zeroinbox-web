import { createSelector } from '@ngrx/store';
import { selectSendersState } from '../core.state';
// import { SendersState } from './senders.reducer';
import * as fromSenders from './senders.reducer';
import { of } from 'rxjs';
import { ISender } from './model/senders.model';
import { ISizes } from './model/sizes.model';


export const selectSenders= createSelector(
  selectSendersState,
  (state: fromSenders.SendersState) => state
);

export const selectSendersLoaded = createSelector(
    selectSendersState,
    (state: fromSenders.SendersState) => state.sendersLoaded
);

export const selectUniqueSenders = createSelector(
    selectSendersState,
    fromSenders.selectTotal
);

export const selectSenderEntities = createSelector(
    selectSendersState,
    fromSenders.selectEntities
)

export const selectAll = createSelector(
    selectSendersState,
    fromSenders.selectAll
)

export const selectSendersById = (senderIds: string[]) => createSelector(
    selectSenderEntities,
    (entities) => {
        let senders = senderIds.map((senderId) => {
            return entities[senderId];
        });
        return senders;
    }
);

export const selectTotalThreads = createSelector(
  selectAll,
  (senders) => {
    let total = senders.map((sender) => sender.count).reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    return total;
  }
)


/*******************************************************************************
 *  CHARTS
 ******************************************************************************/

export const selectBySize = createSelector(
    selectAll,
    (senders) => senders.sort((a, b) => b.totalSizeEstimate - a.totalSizeEstimate)
)

export const selectByCount = createSelector(
    selectAll,
    (senders) => senders.sort((a, b) => b.count - a.count)
)

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

export function accumSize(suggestions: ISender[]) {
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


export function accumCount(suggestions: ISender[]) {
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

export function filterBySize(suggestions: ISender[], cutoff: number) {

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
