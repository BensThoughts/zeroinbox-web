import { Action } from '@ngrx/store';
import { ISender } from './model/senders.model';


export enum SendersActionTypes {
  SendersRequested = '[Senders Effects] Senders Requested',
  SendersRequestFailure = '[Senders Effects] Senders Request Failure',

  AddAllSenders = '[Senders Effects] Add All Senders',

  UpdateSendersState = '[Suggestions Effects] Update Suggestions State From Other Window',
  ResetSendersState = '[Auth Effects] Reset Senders State'
}

export class SendersRequestedAction implements Action {
  readonly type = SendersActionTypes.SendersRequested;
}

export class SendersRequestFailureAction implements Action {
  readonly type = SendersActionTypes.SendersRequestFailure;
}

export class AddAllSendersAction implements Action {
  readonly type = SendersActionTypes.AddAllSenders;
  constructor(public payload: { senders: ISender[] }) {}
}

export class ResetSendersStateAction implements Action {
  readonly type = SendersActionTypes.ResetSendersState;
}


export type SendersActions = 
  | SendersRequestedAction
  | SendersRequestFailureAction
  | AddAllSendersAction
  | ResetSendersStateAction
