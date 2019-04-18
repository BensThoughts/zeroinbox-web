import { Action } from '@ngrx/store';
import { ISuggestion } from '../model/suggestions.model';
import { Update } from '@ngrx/entity';
import { ISender } from '../../../core/state/senders/model/senders.model';

export enum SuggestionsActionTypes {
  SuggestionsRequest = '[Bootstrap Effects] Suggestions Request',
  SuggestionsRequestFailure = '[Boostrap Effects] Suggestions Request Failure',

  LoadSuggestions = '[Senders Effects] Add All Suggestions',
  DeleteSuggestions = '[Suggestions Table Component] Delete Suggestions',
  UpdateSuggestions = '[Suggestions Effects] Update Suggestions',

  SetSizeCutoff = '[Suggestions Component] Set Size Cutoff',

  EditLabel = '[Suggestions Component] Edit Label',

  UpdateSuggestionsState = '[Suggestions Effects] Update Suggestions State From Another Tab/Window',
  ResetSuggestions = '[Auth Effects] Reset Suggestions'
}

export class SuggestionsRequestAction implements Action {
  readonly type = SuggestionsActionTypes.SuggestionsRequest;
}

export class SuggestionsRequestFailureAction implements Action {
  readonly type = SuggestionsActionTypes.SuggestionsRequestFailure;
}

export class LoadSuggestionsAction implements Action {
  readonly type = SuggestionsActionTypes.LoadSuggestions;

  constructor(public payload: { suggestions: ISuggestion[] }) {}
}

export class DeleteSuggestionsAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteSuggestions;

  constructor(public payload: { ids: string[] }) {}
}

export class UpdateSuggestionsAction implements Action {
  readonly type = SuggestionsActionTypes.UpdateSuggestions;

  constructor(public payload: { suggestions: Update<ISuggestion>[] }) {}
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

export class EditLabelAction implements Action {
  readonly type = SuggestionsActionTypes.EditLabel;
  constructor(public payload: { sender: ISender }) {}
}

export type ByCountActions =
  | SuggestionsRequestAction
  | SuggestionsRequestFailureAction

  | LoadSuggestionsAction
  | DeleteSuggestionsAction
  | UpdateSuggestionsAction

  | SetSizeCutoffAction

  | EditLabelAction

  | UpdateSuggestionsStateAction
  | ResetSuggestionsStateAction
