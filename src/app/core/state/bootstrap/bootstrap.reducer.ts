import { BootstrapActions, BootstrapActionTypes } from './bootstrap.actions';

export interface BootstrapState {
  firstRun: boolean;
  loadingSuggestions: boolean;
  suggestionsLoaded: boolean;
  syncToStorage: boolean;
}

const initialBootstrapState = {
  firstRun: true,
  loadingSuggestions: false,
  suggestionsLoaded: false,
  syncToStorage: true
};

export function bootstrapReducer(
  state = initialBootstrapState,
  action: BootstrapActions): BootstrapState {

    switch (action.type) {

      case BootstrapActionTypes.LoadingStatusRequest:
        return { ...state, firstRun: false }

      case BootstrapActionTypes.SuggestionsRequest:
        return { ...state, firstRun: false }

      case BootstrapActionTypes.ToggleSyncToStorage:
        return { ...state, ...action.payload }

      case BootstrapActionTypes.UpdateBootstrapState:
        return action.payload;

      case BootstrapActionTypes.ResetBootstrapState:
        return initialBootstrapState;

      default:
        return state;
    }
}
