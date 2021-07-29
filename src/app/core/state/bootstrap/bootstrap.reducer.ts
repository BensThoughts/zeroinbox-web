import { BootstrapActions, BootstrapActionTypes } from './bootstrap.actions';

export interface BootstrapState {
  firstRun: boolean;
  downloadingStatus: boolean;
  percentLoaded: number;
  syncToStorage: boolean;
  isBootstrapped: boolean;
}

const initialBootstrapState = {
  firstRun: true,
  downloadingStatus: false,
  percentLoaded: 0,
  syncToStorage: true,
  isBootstrapped: false
};

export function bootstrapReducer(
  state = initialBootstrapState,
  action: BootstrapActions
): BootstrapState {
  switch (action.type) {
    case BootstrapActionTypes.UpdateFirstRun:
      return { ...state, ...action.payload };

    case BootstrapActionTypes.UpdateDownloadingStatus:
      return { ...state, ...action.payload };

    case BootstrapActionTypes.UpdatePercentDownloaded:
      return { ...state, ...action.payload };

    case BootstrapActionTypes.ToggleSyncToStorage:
      return { ...state, ...action.payload };

    case BootstrapActionTypes.UpdateIsBootrapped:
      return { ...state, ...action.payload };

    case BootstrapActionTypes.UpdateBootstrapState:
      return action.payload;

    case BootstrapActionTypes.ResetBootstrapState:
      return initialBootstrapState;

    default:
      return state;
  }
}
