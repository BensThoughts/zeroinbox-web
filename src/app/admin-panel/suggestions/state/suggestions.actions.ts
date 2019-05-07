import { Action } from '@ngrx/store';
import { ISender } from '../../../core/state/senders/model/senders.model';

export enum SuggestionsActionTypes {
  SetSizeCutoff = '[Suggestions Component] Set Size Cutoff',

  LabelSenderDialog = '[Suggestions Component] Edit Label Dialog',
  DeleteSenderDialog = '[Suggestions Component] Delete Sender Dialog',
  DeleteAllSendersDialog = '[Suggestions Component] Delete All Senders Dialog',

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


  | DeleteSendersRequestAction
  | DeleteSendersRequestSuccessAction
  | DeleteSendersRequestFailureAction

  | UpdateSuggestionsStateAction
  | ResetSuggestionsStateAction
