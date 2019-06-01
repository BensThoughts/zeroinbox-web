import { Action } from '@ngrx/store';
import { ISender } from '@app/core/state/senders/model/senders.model';

export enum SuggestionsActionTypes {
  SetSizeCutoff = '[Suggestions Component] Set Size Cutoff',

  LabelSenderDialog = '[Suggestions Component] Edit Label Dialog',
  DeleteSenderDialog = '[Suggestions Component] Delete Sender Dialog',
  DeleteAllSendersDialog = '[Suggestions Component] Delete All Senders Dialog',

  LabelSenderRequest = '[Suggestions Effects] Label Sender Request',
  LabelSenderRequestSuccess = '[Suggestions Effects] Label Sender Request Success',
  LabelSenderRequestFailure = '[Suggestions Effects] Label Sender Request Failure',

  DeleteSenderRequest = '[Suggestions Effects] Delete Sender Request',
  DeleteSenderRequestSuccess = '[Suggestions Effects] Delete Sender Request Success',
  DeleteSenderRequestFailure = '[Suggestions Effects] Delete Sender Request Failure',

  UpdateSuggestionsState = '[Suggestions Effects] Update Suggestions State From Another Tab/Window',
  ResetSuggestions = '[Auth Effects] Reset Suggestions'
}

export class SetSizeCutoffAction implements Action {
  readonly type = SuggestionsActionTypes.SetSizeCutoff;

  constructor(public payload: { sizeCutoff: string }) {}
}

export class UpdateSuggestionsStateAction implements Action {
  readonly type = SuggestionsActionTypes.UpdateSuggestionsState;

  constructor(public payload: any) {}
}

export class ResetSuggestionsStateAction implements Action {
  readonly type = SuggestionsActionTypes.ResetSuggestions;
}

export class LabelSenderDialogAction implements Action {
  readonly type = SuggestionsActionTypes.LabelSenderDialog;
  constructor(public payload: { sender: ISender }) {}
}

export class LabelSenderRequestAction implements Action {
  readonly type = SuggestionsActionTypes.LabelSenderRequest;
  constructor(public payload: { 
    sender: ISender,
    labelName: string,
    category: string, 
  }) {}
}

export class LabelSenderRequestSuccessAction implements Action {
  readonly type = SuggestionsActionTypes.LabelSenderRequestSuccess;
}

export class LabelSenderRequestFailureAction implements Action {
  readonly type = SuggestionsActionTypes.LabelSenderRequestFailure;
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
  readonly type = SuggestionsActionTypes.DeleteSenderRequest;
  constructor(public payload: { senders: ISender[] }) {}
}

export class DeleteSendersRequestSuccessAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteSenderRequestSuccess;
  constructor(public payload: { senderIds: string[] }) {}
}

export class DeleteSendersRequestFailureAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteSenderRequestFailure;
}

export type ByCountActions =
  | SetSizeCutoffAction

  | LabelSenderDialogAction
  | DeleteSenderDialogAction
  | DeleteAllSendersDialogAction

  | LabelSenderRequestAction
  | LabelSenderRequestSuccessAction
  | LabelSenderRequestFailureAction

  | DeleteSendersRequestAction
  | DeleteSendersRequestSuccessAction
  | DeleteSendersRequestFailureAction

  | UpdateSuggestionsStateAction
  | ResetSuggestionsStateAction
