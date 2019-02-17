import {Action} from '@ngrx/store';

export enum BootstrapActionTypes {

  GetAllSuggestions = '[Home Component] Suggestions Requested',

  FirstRunStatusRequested = '[Home Component] First Run Status Requested',
  FirstRunStatusRequestFailure = '[Bootstrap Effects] First Run Status Request Failure',

  AllSuggestionsRequested = '[Bootstrap Effects] Bootstrap Messages Requested',
  SuggestionsRequestFailure = '[Bootstrap Effects] Suggestions Request Failure',

  LoadingStatusRequested = '[Bootstrap Effects] Loading Status Requested',
  LoadingStatusRequestFailure = '[Bootstrap Effects] Loading Status Request Failure',

  UpdateBootstrapState = '[Bootstrap Effects] Update Bootstrap State From Another Tab/Window',
  ResetBootstrapState = '[Auth Effects] Reset Bootstrap State'
}

export class GetAllSuggestionsAction implements Action {
  readonly type = BootstrapActionTypes.GetAllSuggestions;
}

export class FirstRunStatusRequestedAction implements Action {
  readonly type = BootstrapActionTypes.FirstRunStatusRequested;
}

export class FirstRunStatusRequestFailureAction implements Action {
  readonly type = BootstrapActionTypes.FirstRunStatusRequestFailure;
}


export class LoadingStatusRequestedAction implements Action {
  readonly type = BootstrapActionTypes.LoadingStatusRequested;
}

export class LoadingStatusRequestFailureAction implements Action {
  readonly type = BootstrapActionTypes.LoadingStatusRequestFailure;
}


/**
 * [constructor description]
 * @param payload [description]
 */
 export class AllSuggestionsRequestedAction implements Action {
   readonly type = BootstrapActionTypes.AllSuggestionsRequested;
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

  | FirstRunStatusRequestedAction
  | FirstRunStatusRequestFailureAction

  | LoadingStatusRequestedAction
  | LoadingStatusRequestFailureAction

  | AllSuggestionsRequestedAction
  | SuggestionsRequestFailureAction

  | ResetBootstrapStateAction
  | UpdateBootstrapStateAction;
