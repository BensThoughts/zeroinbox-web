import {Action} from '@ngrx/store';
import { ISender } from '../models/senders.model';
import { Update } from '@ngrx/entity';

export enum SendersActionTypes {

  GetAllSuggestions = '[Home Component] Suggestions Requested',

  FirstRunStatusRequested = '[Home Component] First Run Status Requested',
  FirstRunStatusRequestFailure = '[Senders Effects] First Run Status Request Failure',

  AllSuggestionsRequested = '[Senders Effects] Senders Messages Requested',
  SuggestionsRequestFailure = '[Senders Effects] Suggestions Request Failure',

  LoadingStatusRequested = '[Senders Effects] Loading Status Requested',
  LoadingStatusRequestFailure = '[Senders Effects] Loading Status Request Failure',

  UpdateSendersState = '[Senders Effects] Update Senders State From Another Tab/Window',
  ResetSendersState = '[Auth Effects] Reset Senders State'
}


export interface PageQuery {
  pageIndex: number;
  pageSize:number;
}

export class GetAllSuggestionsAction implements Action {
  readonly type = SendersActionTypes.GetAllSuggestions;
}

export class FirstRunStatusRequestedAction implements Action {
  readonly type = SendersActionTypes.FirstRunStatusRequested;
}

export class FirstRunStatusRequestFailureAction implements Action {
  readonly type = SendersActionTypes.FirstRunStatusRequestFailure;
}


export class LoadingStatusRequestedAction implements Action {
  readonly type = SendersActionTypes.LoadingStatusRequested;
}

export class LoadingStatusRequestFailureAction implements Action {
  readonly type = SendersActionTypes.LoadingStatusRequestFailure;
}


/**
 * [constructor description]
 * @param payload [description]
 */
 export class AllSuggestionsRequestedAction implements Action {
   readonly type = SendersActionTypes.AllSuggestionsRequested;
 }

 export class SuggestionsRequestFailureAction implements Action {
   readonly type = SendersActionTypes.SuggestionsRequestFailure;
   constructor(public payload: any) {}
 }

/**
 * [constructor description]
 * @param payload [description]
 */
export class UpdateSendersStateAction implements Action {
  readonly type = SendersActionTypes.UpdateSendersState;
  constructor(public payload: any){}
}

export class ResetSendersStateAction implements Action {
  readonly type = SendersActionTypes.ResetSendersState;
}


export type SendersActions =
  | GetAllSuggestionsAction

  | FirstRunStatusRequestedAction
  | FirstRunStatusRequestFailureAction

  | LoadingStatusRequestedAction
  | LoadingStatusRequestFailureAction

  | AllSuggestionsRequestedAction
  | SuggestionsRequestFailureAction

  | ResetSendersStateAction
  | UpdateSendersStateAction;
