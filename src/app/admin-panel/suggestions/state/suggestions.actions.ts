import { Action } from '@ngrx/store';
import { ISender } from '../../../core/state/senders/model/senders.model';

export enum SuggestionsActionTypes {
  SetSizeCutoff = '[Suggestions Component] Set Size Cutoff',

  LabelSenderDialog = '[Suggestions Component] Edit Label',
  AddLabel = '[Label Edit Component] Add Label',
  DeleteSenderDialog = '[Suggestions Component] Delete Sender',

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

export class AddLabelAction implements Action {
  readonly type = SuggestionsActionTypes.AddLabel;
  constructor(public payload: { sender: ISender }) {}
}

export class DeleteSenderDialogAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteSenderDialog;
  constructor(public payload: { sender: ISender }) {}
}

export type ByCountActions =
  | SetSizeCutoffAction

  | LabelSenderDialogAction
  | AddLabelAction
  | DeleteSenderDialogAction

  | UpdateSuggestionsStateAction
  | ResetSuggestionsStateAction
