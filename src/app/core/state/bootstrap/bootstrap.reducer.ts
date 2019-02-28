import { BootstrapActions, BootstrapActionTypes } from './bootstrap.actions';

export interface BootstrapState {
  loadingSuggestions: boolean;
  suggestionsLoaded: boolean;
  percentLoaded: number;
  syncToStorage: boolean;
}

const initialBootstrapState = {
  loadingSuggestions: false,
  suggestionsLoaded: false,
  percentLoaded: 0,
  syncToStorage: true
};

export function bootstrapReducer(
  state = initialBootstrapState,
  action: BootstrapActions): BootstrapState {

    switch (action.type) {

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
