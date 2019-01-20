import { Action } from '@ngrx/store';
import { ISuggestion } from './suggestions.model';
import { Update } from '@ngrx/entity';

export enum SuggestionsActionTypes {
  LoadSuggestions = '[Senders Effects] Add All Suggestions',

  DeleteSuggestions = '[Suggestions Effects] Delete Suggestions',
  UpdateSuggestions = '[Suggestions Effects] Update Suggestions',

  SuggestionsToggleUpdate = '[Suggestions Table Component] Toggle delete or label true/false',
  SuggestionsToggleUpdateMany = '[Suggestions Table Component] Toggle delete or label true/false for many',

  CreateSuggestedActionsByName = '[Suggestions Effects] Create Suggested Actions',

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

export class UpdateSuggestionsAction implements Action {
  readonly type = SuggestionsActionTypes.UpdateSuggestions;

  constructor(public payload: { suggestions: Update<ISuggestion>[] }) {}
}

export class SetCutoffAction implements Action {
  readonly type = SuggestionsActionTypes.SetCutoff;

  constructor(public payload: { cutoff: number }) {}
}

/**
 * [constructor description]
 * @param payload [description]
 */
 export class SuggestionsToggleUpdateAction implements Action {
   readonly type = SuggestionsActionTypes.SuggestionsToggleUpdate;

   constructor(public payload: { suggestion: Update<ISuggestion> }) {}
 }

 export class SuggestionsToggleUpdateManyAction implements Action {
   readonly type = SuggestionsActionTypes.SuggestionsToggleUpdateMany;

   constructor(public payload: { suggestions: Update<ISuggestion>[] }) {}
 }


export class CreateSuggestedActionsByNameAction implements Action {
  readonly type = SuggestionsActionTypes.CreateSuggestedActionsByName;

  constructor(public payload: { suggestions: ISuggestion[] }) {}
}

export class ResetSuggestionsStateAction implements Action {
  readonly type = SuggestionsActionTypes.ResetSuggestions;
}

export type ByCountActions =
  | LoadSuggestionsAction

  | DeleteSuggestionsAction

  | UpdateSuggestionsAction

  | SuggestionsToggleUpdateAction
  | SuggestionsToggleUpdateManyAction

  | SetCutoffAction

  | CreateSuggestedActionsByNameAction

  | ResetSuggestionsStateAction
