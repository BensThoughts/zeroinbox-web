import {Action} from '@ngrx/store';

export enum BootstrapActionTypes {

  GetAllSuggestions = '[Bootstrap Effects] Get All Suggestions',

  FirstRunStatusRequest = '[Bootstrap Effects] First Run Status Request',
  FirstRunStatusRequestFailure = '[Bootstrap Effects] First Run Status Request Failure',

  LoadSuggestionsRequest = '[Bootstrap Effects] Load Suggestions Request',
  LoadSuggestionsRequestFailure = '[Boostrap Effects] Load Suggestions Request Failure',
  UpdateLoadingStatus = '[BootstrapEffects] Update Loading Status',

  LoadingStatusRequest = '[Bootstrap Effects] Loading Status Request',
  LoadingStatusRequestFailure = '[Bootstrap Effects] Loading Status Request Failure',
  UpdatePercentLoaded = '[Boostrap Effects] Update Percent Loaded',

  SuggestionsRequest = '[Bootstrap Effects] Suggestions Request',
  SuggestionsRequestFailure = '[Bootstrap Effects] Suggestions Request Failure',

  ToggleSyncToStorage = '[Bootstrap Effects] Sync To Storage',

  UpdateBootstrapState = '[Bootstrap Effects] Update Bootstrap State From Another Tab/Window',
  ResetBootstrapState = '[Auth Effects] Reset Bootstrap State'
}

export class GetAllSuggestionsAction implements Action {
  readonly type = BootstrapActionTypes.GetAllSuggestions;
}

export class FirstRunStatusRequestAction implements Action {
  readonly type = BootstrapActionTypes.FirstRunStatusRequest;
}

export class FirstRunStatusRequestFailureAction implements Action {
  readonly type = BootstrapActionTypes.FirstRunStatusRequestFailure;
}

export class LoadSuggestionsRequestAction implements Action {
  readonly type = BootstrapActionTypes.LoadSuggestionsRequest;
}

export class LoadSuggestionsRequestFailureAction implements Action {
  readonly type = BootstrapActionTypes.LoadSuggestionsRequestFailure;
}

export class UpdateLoadingStatusAction implements Action {
  readonly type = BootstrapActionTypes.UpdateLoadingStatus;
  constructor(public payload: { loadingStatus: boolean }) {}
}

export class LoadingStatusRequestAction implements Action {
  readonly type = BootstrapActionTypes.LoadingStatusRequest;
}

export class LoadingStatusRequestFailureAction implements Action {
  readonly type = BootstrapActionTypes.LoadingStatusRequestFailure;
}

export class UpdatePercentLoadedAction implements Action {
  readonly type = BootstrapActionTypes.UpdatePercentLoaded;
  constructor(public payload: { percentLoaded: number }) {}
}


/**
 * Used to temporarily turn sync to storage off, so that when the state
 * is updated from another tab/window durring the logout process, this 
 * tab/window does not also sync state to the local storage (which would cause
 * a looping effect).
 */
export class ToggleSyncToStorageAction implements Action {
  readonly type = BootstrapActionTypes.ToggleSyncToStorage;

  constructor(public payload: { syncToStorage: boolean }) {}
}


/**
 * [constructor description]
 * @param payload [description]
 */
 export class SuggestionsRequestAction implements Action {
   readonly type = BootstrapActionTypes.SuggestionsRequest;
 }

 export class SuggestionsRequestFailureAction implements Action {
   readonly type = BootstrapActionTypes.SuggestionsRequestFailure;
   constructor(public payload: any) {}
 }

/**
 * [constructor description]
 * @param payload [description]
 */
export class UpdateBootstrapStateAction implements Action {
  readonly type = BootstrapActionTypes.UpdateBootstrapState;
  constructor(public payload: any){}
}

export class ResetBootstrapStateAction implements Action {
  readonly type = BootstrapActionTypes.ResetBootstrapState;
}


export type BootstrapActions =
  | GetAllSuggestionsAction

  | FirstRunStatusRequestAction
  | FirstRunStatusRequestFailureAction

  | LoadSuggestionsRequestAction
  | LoadSuggestionsRequestFailureAction
  | UpdateLoadingStatusAction

  | LoadingStatusRequestAction
  | LoadingStatusRequestFailureAction
  | UpdatePercentLoadedAction

  | SuggestionsRequestAction
  | SuggestionsRequestFailureAction

  | ToggleSyncToStorageAction
  | ResetBootstrapStateAction
  | UpdateBootstrapStateAction;
