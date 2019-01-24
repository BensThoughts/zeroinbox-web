import { Action } from '@ngrx/store';
import { ISuggestion } from './suggestions.model';
import { Update } from '@ngrx/entity';

export enum SuggestionsActionTypes {
  LoadSuggestions = '[Senders Effects] Add All Suggestions',

  DeleteSuggestions = '[Suggestions Table Component] Delete Suggestions',
  DeleteSuggestionsMeta = '[Suggestions Table Component] Delete Suggestions Meta',
  LabelByNameSuggestions = '[Suggestions Table Component] Label By Name',

  UpdateSuggestions = '[Suggestions Effects] Update Suggestions',

  SetCutoff = '[Suggestions Table Component] Set Cutoff',

  ResetSuggestions = '[Auth Effects] Reset Suggestions'
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


export class UpdateSuggestionsAction implements Action {
  readonly type = SuggestionsActionTypes.UpdateSuggestions;

  constructor(public payload: { suggestions: Update<ISuggestion>[] }) {}
}

export class SetCutoffAction implements Action {
  readonly type = SuggestionsActionTypes.SetCutoff;

  constructor(public payload: { cutoff: number }) {}
}


export class ResetSuggestionsStateAction implements Action {
  readonly type = SuggestionsActionTypes.ResetSuggestions;
}

export type ByCountActions =
  | LoadSuggestionsAction

  | DeleteSuggestionsAction

  | DeleteSuggestionsMetaAction
  | LabelByNameSuggestionsAction

  | UpdateSuggestionsAction

  | SetCutoffAction

  | ResetSuggestionsStateAction
