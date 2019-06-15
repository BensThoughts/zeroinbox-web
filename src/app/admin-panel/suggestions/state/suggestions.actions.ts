import { Action } from '@ngrx/store';
import { ISender } from '@app/core/state/senders/model/senders.model';

export enum SuggestionsActionTypes {
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
  readonly type = SuggestionsActionTypes.SetSizeCutoff;

  constructor(public payload: { sizeCutoff: string }) {}
}

export class LabelSenderDialogAction implements Action {
  readonly type = SuggestionsActionTypes.LabelSenderDialog;
  constructor(public payload: { sender: ISender }) {}
}

export class LabelAllSendersDialogAction implements Action {
  readonly type = SuggestionsActionTypes.LabelAllSendersDialog;
  constructor(public payload: { senders: ISender[] }) {}
}

export class LabelSendersRequestAction implements Action {
  readonly type = SuggestionsActionTypes.LabelSendersRequest;
  constructor(public payload: { 
    senders: ISender[],
    labelName: string,
    category: string, 
  }) {}
}

export class LabelSendersRequestSuccessAction implements Action {
  readonly type = SuggestionsActionTypes.LabelSendersRequestSuccess;
}

export class LabelSendersRequestFailureAction implements Action {
  readonly type = SuggestionsActionTypes.LabelSendersRequestFailure;
}

export class DeleteSenderDialogAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteSenderDialog;
  constructor(public payload: { sender: ISender }) {}
}

export class DeleteAllSendersDialogAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteAllSendersDialog;
  constructor(public payload: { senders: ISender[] }) {}
}

export class DeleteSendersRequestAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteSendersRequest;
  constructor(public payload: { senders: ISender[] }) {}
}

export class DeleteSendersRequestSuccessAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteSendersRequestSuccess;
  constructor(public payload: { senderIds: string[] }) {}
}

export class DeleteSendersRequestFailureAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteSendersRequestFailure;
}

export class SetCurrentSenderAction implements Action {
  readonly type = SuggestionsActionTypes.SetCurrentSender;
  constructor(public payload: { sender: ISender }) {}
}

export class UpdateSuggestionsStateAction implements Action {
  readonly type = SuggestionsActionTypes.UpdateSuggestionsState;

  constructor(public payload: any) {}
}

export class ResetSuggestionsStateAction implements Action {
  readonly type = SuggestionsActionTypes.ResetSuggestions;
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

  | UpdateSuggestionsStateAction
  | ResetSuggestionsStateAction
