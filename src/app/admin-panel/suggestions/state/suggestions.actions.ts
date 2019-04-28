import { Action } from '@ngrx/store';
import { ISender } from '../../../core/state/senders/model/senders.model';

export enum SuggestionsActionTypes {
  SetSizeCutoff = '[Suggestions Component] Set Size Cutoff',

  LabelSenderDialog = '[Suggestions Component] Edit Label',
  DeleteSenderDialog = '[Suggestions Component] Delete Sender',

  DeleteSenderRequest = '[Suggestions Effects] Delete Sender Request',
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

export class DeleteSenderRequestAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteSenderRequest;
  constructor(public payload: { sender: ISender }) {}
}

export class DeleteSenderRequestFailureAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteSenderRequestFailure;
}

export type ByCountActions =
  | SetSizeCutoffAction

  | LabelSenderDialogAction
  | DeleteSenderDialogAction

  | UpdateSuggestionsStateAction
  | ResetSuggestionsStateAction
