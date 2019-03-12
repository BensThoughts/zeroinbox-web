import {Action} from '@ngrx/store';

export enum BootstrapActionTypes {

  BoostrapApp = '[Auth Effects] Bootstrap App',

  GetAllSenders = '[Bootstrap Effects] Get All Suggestions',

  FirstRunStatusRequest = '[Bootstrap Effects] First Run Status Request',
  FirstRunStatusRequestFailure = '[Bootstrap Effects] First Run Status Request Failure',
  UpdateFirstRun = '[Bootstrap Effects] Update First Run',

  NavigateToHomePage = '[Bootstrap Effects] Navigate To Home Page',
  NaviagteToDownloadingPage = '[Bootstrap Effects] Navigate To Downloading Page',

  DownloadSendersRequest = '[Bootstrap Effects] Load Suggestions Request',
  DownloadSendersRequestFailure = '[Boostrap Effects] Load Suggestions Request Failure',
  UpdateDownloadingStatus = '[BootstrapEffects] Update Loading Status',

  DownloadingStatusRequest = '[Bootstrap Effects] Loading Status Request',
  DownloadingStatusRequestFailure = '[Bootstrap Effects] Loading Status Request Failure',
  UpdatePercentDownloaded = '[Boostrap Effects] Update Percent Loaded',

  ToggleSyncToStorage = '[Auth Effects] Toggle Sync To Storage False',

  UpdateBootstrapState = '[Bootstrap Effects] Update Bootstrap State From Another Tab/Window',
  ResetBootstrapState = '[Auth Effects] Reset Bootstrap State'
}

export class BootstrapAppAction implements Action {
  readonly type = BootstrapActionTypes.BoostrapApp;
}

export class GetAllSendersAction implements Action {
  readonly type = BootstrapActionTypes.GetAllSenders;
}

export class FirstRunStatusRequestAction implements Action {
  readonly type = BootstrapActionTypes.FirstRunStatusRequest;
}

export class FirstRunStatusRequestFailureAction implements Action {
  readonly type = BootstrapActionTypes.FirstRunStatusRequestFailure;
}

export class UpdateFirstRunAction implements Action {
  readonly type = BootstrapActionTypes.UpdateFirstRun;
  constructor(public payload: { firstRun: boolean }) {}
}

export class NavigateToHomePageAction implements Action {
  readonly type = BootstrapActionTypes.NavigateToHomePage;
}

export class NavigateToDownloadingPageAction implements Action {
  readonly type = BootstrapActionTypes.NaviagteToDownloadingPage;
}


export class DownloadSendersRequestAction implements Action {
  readonly type = BootstrapActionTypes.DownloadSendersRequest;
}

export class DownloadSendersRequestFailureAction implements Action {
  readonly type = BootstrapActionTypes.DownloadSendersRequestFailure;
}

export class UpdateDownloadingStatusAction implements Action {
  readonly type = BootstrapActionTypes.UpdateDownloadingStatus;
  constructor(public payload: { loadingStatus: boolean }) {}
}

export class DownloadingStatusRequestAction implements Action {
  readonly type = BootstrapActionTypes.DownloadingStatusRequest;
}

export class DownloadingStatusRequestFailureAction implements Action {
  readonly type = BootstrapActionTypes.DownloadingStatusRequestFailure;
}

export class UpdatePercentDownloadedAction implements Action {
  readonly type = BootstrapActionTypes.UpdatePercentDownloaded;
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
export class UpdateBootstrapStateAction implements Action {
  readonly type = BootstrapActionTypes.UpdateBootstrapState;
  constructor(public payload: any){}
}

export class ResetBootstrapStateAction implements Action {
  readonly type = BootstrapActionTypes.ResetBootstrapState;
}


export type BootstrapActions =
  | BootstrapAppAction
  | GetAllSendersAction

  | FirstRunStatusRequestAction
  | FirstRunStatusRequestFailureAction
  | UpdateFirstRunAction

  | NavigateToHomePageAction
  | NavigateToDownloadingPageAction

  | DownloadSendersRequestAction
  | DownloadSendersRequestFailureAction
  | UpdateDownloadingStatusAction

  | DownloadingStatusRequestAction
  | DownloadingStatusRequestFailureAction
  | UpdatePercentDownloadedAction

  | ToggleSyncToStorageAction
  | ResetBootstrapStateAction
  | UpdateBootstrapStateAction;
