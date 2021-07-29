import { createSelector } from '@ngrx/store';
import { selectSendersState } from '../core.state';
// import { SendersState } from './senders.reducer';
import * as fromSenders from './senders.reducer';
import { of } from 'rxjs';
import { ISender } from './model/senders.model';
import { ISizes } from './model/sizes.model';

export const selectSenders = createSelector(
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
);

export const selectAll = createSelector(
  selectSendersState,
  fromSenders.selectAll
);

export const selectTotalThreads = createSelector(selectAll, (senders) => {
  let total = senders
    .map((sender) => sender.threadIdCount)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  return total;
});

/*******************************************************************************
 *  CHARTS
 ******************************************************************************/

/**
 * Important, you must return a deep copy of these with .slice() or
 * else ngrx gets confused
 */
export const selectByCount = createSelector(selectAll, (senders) =>
  senders.sort((a, b) => b.threadIdCount - a.threadIdCount).slice()
);

export const selectBySize = createSelector(selectAll, (senders) =>
  senders.sort((a, b) => b.totalSizeEstimate - a.totalSizeEstimate).slice()
);

export const C_XL = 500;
export const C_LG = 100;
export const C_MD = 50;
export const C_SM = 15;

export const selectByCountGroup = createSelector(
  selectByCount,
  (suggestions) => {
    return {
      Xl: suggestions.filter((suggestion) => {
        return suggestion.threadIdCount >= C_XL;
      }),
      Lg: suggestions.filter((suggestion) => {
        return (
          suggestion.threadIdCount >= C_LG && suggestion.threadIdCount < C_XL
        );
      }),
      Md: suggestions.filter((suggestion) => {
        return (
          suggestion.threadIdCount >= C_MD && suggestion.threadIdCount < C_LG
        );
      }),
      Sm: suggestions.filter((suggestion) => {
        return (
          suggestion.threadIdCount >= C_SM && suggestion.threadIdCount < C_MD
        );
      }),
      Xs: suggestions.filter((suggestion) => {
        return suggestion.threadIdCount < C_SM;
      })
    };
  }
);

export const selectByCountGroup_TL = createSelector(
  selectByCountGroup,
  (suggestions) => {
    return <ISizes>{
      Xl: suggestions.Xl.length,
      Lg: suggestions.Lg.length,
      Md: suggestions.Md.length,
      Sm: suggestions.Sm.length,
      Xs: suggestions.Xs.length
    };
  }
);

export const selectBySizeGroup = createSelector(selectBySize, (senders) => {
  return {
    Xl: senders.filter((sender) => sender.sizeGroup === 'XL'),
    Lg: senders.filter((sender) => sender.sizeGroup === 'LG'),
    Md: senders.filter((sender) => sender.sizeGroup === 'MD'),
    Sm: senders.filter((sender) => sender.sizeGroup === 'SM'),
    Xs: senders.filter((sender) => sender.sizeGroup === 'XS')
  };
});

export const selectBySizeGroup_TL = createSelector(
  selectBySizeGroup,
  (senders) => {
    return <ISizes>{
      Xl: senders.Xl.length,
      Lg: senders.Lg.length,
      Md: senders.Md.length,
      Sm: senders.Sm.length,
      Xs: senders.Xs.length
    };
  }
);

/* export const selectByCountGroup_TS = createSelector(
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
} */
