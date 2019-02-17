import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { BootstrapActions, BootstrapActionTypes, SyncToStorageAction } from './bootstrap.actions';

export interface BootstrapState {
  firstRun: boolean,
  syncToStorage: boolean,
}

const initialBootstrapState = {
  firstRun: true,
  syncToStorage: true
};

export function bootstrapReducer(
  state = initialBootstrapState,
  action: BootstrapActions): BootstrapState {

    switch (action.type) {

      case BootstrapActionTypes.LoadingStatusRequested:
        return { ...state, firstRun: false }

      case BootstrapActionTypes.AllSuggestionsRequested:
        return { ...state, firstRun: false }

      case BootstrapActionTypes.SyncToStorage:
        return { ...state, ...action.payload }

      case BootstrapActionTypes.UpdateBootstrapState:
        return action.payload;

      case BootstrapActionTypes.ResetBootstrapState:
        return initialBootstrapState;

      default:
        return state;
    }
}
