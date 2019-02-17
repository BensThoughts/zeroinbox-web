import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { BootstrapActions, BootstrapActionTypes } from './bootstrap.actions';

export interface BootstrapState {
  firstRun: boolean,
}

const initialBootstrapState = {
  firstRun: true,
};

export function bootstrapReducer(
  state = initialBootstrapState,
  action: BootstrapActions): BootstrapState {

    switch (action.type) {

      case BootstrapActionTypes.LoadingStatusRequested:
        return { ...state, firstRun: false }

      case BootstrapActionTypes.AllSuggestionsRequested:
        return { ...state, firstRun: false }

      case BootstrapActionTypes.UpdateBootstrapState:
        return action.payload;

      case BootstrapActionTypes.ResetBootstrapState:
        return initialBootstrapState;

      default:
        return state;
    }
}
