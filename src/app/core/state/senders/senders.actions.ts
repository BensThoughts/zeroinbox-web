import { Action } from '@ngrx/store';
import { ISender } from './model/senders.model';


export enum SendersActionTypes {
  SendersRequest = '[Senders Effects] Senders Requested',
  SendersRequestFailure = '[Senders Effects] Senders Request Failure',

  AddAllSenders = '[Senders Effects] Add All Senders',

  UpdateSendersState = '[Senders Effects] Update Senders State From Another Tab/Window',
  ResetSendersState = '[Auth Effects] Reset Senders State'
}

export class SendersRequestAction implements Action {
  readonly type = SendersActionTypes.SendersRequest;
}

export class SendersRequestFailureAction implements Action {
  readonly type = SendersActionTypes.SendersRequestFailure;
}

export class AddAllSendersAction implements Action {
  readonly type = SendersActionTypes.AddAllSenders;
  constructor(public payload: { senders: ISender[] }) {}
}

export class UpdateSendersStateAction implements Action {
  readonly type = SendersActionTypes.UpdateSendersState;
  constructor(public payload: any ) {}
}

export class ResetSendersStateAction implements Action {
  readonly type = SendersActionTypes.ResetSendersState;
}


export type SendersActions = 
  | SendersRequestAction
  | SendersRequestFailureAction
  | AddAllSendersAction
  | UpdateSendersStateAction
  | ResetSendersStateAction
