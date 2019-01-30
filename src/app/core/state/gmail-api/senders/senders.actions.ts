import {Action} from '@ngrx/store';
import { ISender } from '../models/senders.model';
import { Update } from '@ngrx/entity';

export enum SendersActionTypes {

  SendersRequested = '[Home Component] Suggestions Requested',

  InboxThreadIdsRequested = '[Senders Effects] Inbox Thread Ids Requested',
  InboxThreadIdsRequestFailure = '[Senders Effects] Inbox Thread Ids Request Failure',
  InboxThreadIdsLoaded = '[Senders Effects] Inbox Thread Ids Loaded',
  AddAllThreadIds = '[Senders Effects] Add All threadIds',

  AllSuggestionsRequested = '[Senders Effects] Senders Messages Requested',
  SendersRequestFailure = '[Senders Effects] Senders Request Failure',
  SuggestionsRequestFailure = '[Senders Effects] Suggestions Request Failure',
  AddAllSenders = '[Senders Effects] Add All Senders',

  RequestLoadingStatus = '[Senders Effects] Get Loading Status',

  SendersRemoveMany = '[Suggestions Component] Senders Remove Many',

  UpdateSendersState = '[Senders Effects] Update Senders State From Another Tab/Window',
  ResetSendersState = '[Auth Effects] Reset Senders State'
}


export interface PageQuery {
  pageIndex: number;
  pageSize:number;
}

/**
 * [request all gmail labels from store IGmailLabel[]]
 * @param payload: [no payload]
 */
 export class SendersRequestedAction implements Action {
   readonly type = SendersActionTypes.SendersRequested;
 }

/**
 * [constructor description]
 * @param payload [description]
 */
 export class InboxThreadIdsRequestedAction implements Action {
   readonly type = SendersActionTypes.InboxThreadIdsRequested;
 }

 export class InboxThreadIdsRequestFailureAction implements Action {
   readonly type = SendersActionTypes.InboxThreadIdsRequestFailure;
   constructor(public payload: any) {}
 }

 export class AddAllThreadIdsAction implements Action {
   readonly type = SendersActionTypes.AddAllThreadIds;
   constructor(public payload: Array<string>) {}
 }

 export class InboxThreadIdsLoadedAction implements Action {
   readonly type = SendersActionTypes.InboxThreadIdsLoaded;
   constructor(public payload: Array<string>) {}
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

 export class SendersRequestFailureAction implements Action {
   readonly type = SendersActionTypes.SendersRequestFailure;
   constructor(public payload: any) {}
 }

 export class AddAllSendersAction implements Action {
   readonly type = SendersActionTypes.AddAllSenders;
   constructor(public payload: ISender[]) {}
 }

 /**
  * [constructor description]
  * @param payload [description]
  */
 export class SendersRemoveManyAction implements Action {
   readonly type = SendersActionTypes.SendersRemoveMany;

   constructor(public payload: { ids: string[] }) {}
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

export class RequestLoadingStatusAction implements Action {
  readonly type = SendersActionTypes.RequestLoadingStatus;
}

export type SendersActions =
  | SendersRequestedAction

  | InboxThreadIdsRequestedAction
  | InboxThreadIdsRequestFailureAction
  | AddAllThreadIdsAction
  | InboxThreadIdsLoadedAction

  | AllSuggestionsRequestedAction
  | SendersRequestFailureAction
  | SuggestionsRequestFailureAction
  | AddAllSendersAction

  | RequestLoadingStatusAction

  | SendersRemoveManyAction

  | ResetSendersStateAction
  | UpdateSendersStateAction;
