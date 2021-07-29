import { Action } from '@ngrx/store';
import { ISender } from '@app/core/state/senders/model/senders.model';

export enum SendersViewActionTypes {
  SetSizeCutoff = '[Suggestions Component] Set Size Cutoff',

  LabelSenderDialog = '[Suggestions Component] Edit Label Dialog',
  LabelAllSendersDialog = '[Suggestions Component] Label All Senders Dialog',
  DeleteSenderDialog = '[Suggestions Component] Delete Sender Dialog',
  DeleteAllSendersDialog = '[Suggestions Component] Delete All Senders Dialog',

  LabelSendersRequest = '[Suggestions Effects] Label Sender Request',
  LabelSendersRequestSuccess = '[Suggestions Effects] Label Sender Request Success',
  LabelSendersRequestFailure = '[Suggestions Effects] Label Sender Request Failure',

  DeleteSendersRequest = '[Suggestions Effects] Delete Sender Request',
  DeleteSendersRequestSuccess = '[Suggestions Effects] Delete Sender Request Success',
  DeleteSendersRequestFailure = '[Suggestions Effects] Delete Sender Request Failure',

  SetCurrentSender = '[Suggestions Table] Set Current Sender',

  UpdateSuggestionsState = '[Suggestions Effects] Update Suggestions State From Another Tab/Window',
  ResetSuggestions = '[Auth Effects] Reset Suggestions'
}

export class SetSizeCutoffAction implements Action {
  readonly type = SendersViewActionTypes.SetSizeCutoff;

  constructor(public payload: { sizeCutoff: string }) {}
}

export class LabelSenderDialogAction implements Action {
  readonly type = SendersViewActionTypes.LabelSenderDialog;
  constructor(public payload: { sender: ISender }) {}
}

export class LabelAllSendersDialogAction implements Action {
  readonly type = SendersViewActionTypes.LabelAllSendersDialog;
  constructor(public payload: { senders: ISender[] }) {}
}

export class LabelSendersRequestAction implements Action {
  readonly type = SendersViewActionTypes.LabelSendersRequest;
  constructor(
    public payload: {
      senders: ISender[];
      labelName: string;
      category: string;
      filter: boolean;
    }
  ) {}
}

export class LabelSendersRequestSuccessAction implements Action {
  readonly type = SendersViewActionTypes.LabelSendersRequestSuccess;
}

export class LabelSendersRequestFailureAction implements Action {
  readonly type = SendersViewActionTypes.LabelSendersRequestFailure;
}

export class DeleteSenderDialogAction implements Action {
  readonly type = SendersViewActionTypes.DeleteSenderDialog;
  constructor(public payload: { sender: ISender }) {}
}

export class DeleteAllSendersDialogAction implements Action {
  readonly type = SendersViewActionTypes.DeleteAllSendersDialog;
  constructor(public payload: { senders: ISender[] }) {}
}

export class DeleteSendersRequestAction implements Action {
  readonly type = SendersViewActionTypes.DeleteSendersRequest;
  constructor(public payload: { senders: ISender[] }) {}
}

export class DeleteSendersRequestSuccessAction implements Action {
  readonly type = SendersViewActionTypes.DeleteSendersRequestSuccess;
  constructor(public payload: { senderIds: string[] }) {}
}

export class DeleteSendersRequestFailureAction implements Action {
  readonly type = SendersViewActionTypes.DeleteSendersRequestFailure;
}

export class SetCurrentSenderAction implements Action {
  readonly type = SendersViewActionTypes.SetCurrentSender;
  constructor(public payload: { sender: ISender }) {}
}

export class UpdateSendersViewStateAction implements Action {
  readonly type = SendersViewActionTypes.UpdateSuggestionsState;

  constructor(public payload: any) {}
}

export class ResetSendersViewStateAction implements Action {
  readonly type = SendersViewActionTypes.ResetSuggestions;
}

export type ByCountActions =
  | SetSizeCutoffAction
  | LabelSenderDialogAction
  | LabelAllSendersDialogAction
  | DeleteSenderDialogAction
  | DeleteAllSendersDialogAction
  | LabelSendersRequestAction
  | LabelSendersRequestSuccessAction
  | LabelSendersRequestFailureAction
  | DeleteSendersRequestAction
  | DeleteSendersRequestSuccessAction
  | DeleteSendersRequestFailureAction
  | SetCurrentSenderAction
  | UpdateSendersViewStateAction
  | ResetSendersViewStateAction;
