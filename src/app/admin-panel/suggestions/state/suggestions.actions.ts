import { Action } from '@ngrx/store';
import { ISuggestion } from '../model/suggestions.model';
import { Update } from '@ngrx/entity';

export enum SuggestionsActionTypes {
  LoadSuggestions = '[Senders Effects] Add All Suggestions',

  SuggestionsRequest = '[Bootstrap Effects] Suggestions Request',
  SuggestionsRequestFailure = '[Boostrap Effects] Suggestions Request Failure',

  DeleteSuggestions = '[Suggestions Table Component] Delete Suggestions',
  DeleteSuggestionsMeta = '[Suggestions Table Component] Delete Suggestions Meta',
  LabelByNameSuggestions = '[Suggestions Table Component] Label By Name',
  LabelBySizeSuggestions = '[Suggestions Size Table Component] Label By Size',

  UpdateSuggestions = '[Suggestions Effects] Update Suggestions',

  SetCountCutoff = '[Suggestions Table Component] Set Cutoff',

  SetSizeCutoff = '[Suggestions Component] Set Size Cutoff',

  UpdateSuggestionsState = '[Suggestions Effects] Update Suggestions State From Other Window',
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

export class DeleteSuggestionsMetaAction implements Action {
  readonly type = SuggestionsActionTypes.DeleteSuggestionsMeta;

  constructor(public payload: { ids: string[] }) {}
}

export class LabelByNameSuggestionsAction implements Action {
  readonly type = SuggestionsActionTypes.LabelByNameSuggestions;

  constructor(public payload: { ids: string[] }) {}
}

export class LabelBySizeSuggestionsAction implements Action {
  readonly type = SuggestionsActionTypes.LabelBySizeSuggestions;

  constructor(public payload: { ids: string[], size: number }) {}
}

export class UpdateSuggestionsAction implements Action {
  readonly type = SuggestionsActionTypes.UpdateSuggestions;

  constructor(public payload: { suggestions: Update<ISuggestion>[] }) {}
}

export class SetCountCutoffAction implements Action {
  readonly type = SuggestionsActionTypes.SetCountCutoff;

  constructor(public payload: { countCutoff: number }) {}
}

export class SetSizeCutoffAction implements Action {
  readonly type = SuggestionsActionTypes.SetSizeCutoff;

  constructor(public payload: { sizeCutoff: number }) {}
}

export class UpdateSuggestionsStateAction implements Action {
  readonly type = SuggestionsActionTypes.UpdateSuggestionsState;

  constructor(public payload: any) {}
}

export class ResetSuggestionsStateAction implements Action {
  readonly type = SuggestionsActionTypes.ResetSuggestions;
}

export type ByCountActions =
  | LoadSuggestionsAction
  | SuggestionsRequestAction
  | SuggestionsRequestFailureAction

  | DeleteSuggestionsAction

  | DeleteSuggestionsMetaAction
  | LabelByNameSuggestionsAction
  | LabelBySizeSuggestionsAction

  | UpdateSuggestionsAction

  | SetCountCutoffAction

  | SetSizeCutoffAction

  | UpdateSuggestionsStateAction
  | ResetSuggestionsStateAction
