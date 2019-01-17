import {Action} from '@ngrx/store';
import { ISuggested } from '../models/suggested.model';
import { Update } from '@ngrx/entity';

export enum SuggestedActionTypes {

  SuggestionsRequested = '[Home Component] Suggestions Requested',

  InboxThreadIdsRequested = '[Suggested Effects] Inbox Thread Ids Requested',
  InboxThreadIdsRequestFailure = '[Suggested Effects] Inbox Thread Ids Request Failure',
  InboxThreadIdsLoaded = '[Suggested Effects] Inbox Thread Ids Loaded',
  AddAllThreadIds = '[Suggested Effects] Add All threadIds',

  SuggestedThreadsRequested = '[Suggested Effects] Suggested Messages Requested',
  SuggestedThreadsRequestFailure = '[Suggested Effects] Suggested Threads Request Failure',
  // SuggestedThreadsLoaded = '[Suggested Effects] Suggested Messages Loaded',
  AddAllSuggestions = '[Suggested Effects] Add All Suggestions',

  SuggestedToggleDelete = '[Suggestions Table Component] Suggested Toggle Delete',
  SuggestedToggleLabel = '[Suggestions Table Component] Suggested Toggle Label',

  SuggestedToggleDeleteMany = '[Suggestions Table Component] Suggested Toggle Delete Many',
  SuggestedToggleLabelMany = '[Suggestions Table Component] Suggested Toggle Label Many',

  UpdateSuggestedState = '[Suggested Effects] Update Suggested State From Another Tab/Window',
  ResetSuggestedState = '[Auth Effects] Reset Suggested State'
}


export interface PageQuery {
  pageIndex: number;
  pageSize:number;
}

/**
 * [request all gmail labels from store IGmailLabel[]]
 * @param payload: [no payload]
 */


 export class SuggestedToggleDeleteManyAction implements Action {
   readonly type = SuggestedActionTypes.SuggestedToggleDeleteMany;

   constructor(public payload: { iSuggesteds: Update<ISuggested>[] }) {}
 }

 export class SuggestedToggleLabelManyAction implements Action {
   readonly type = SuggestedActionTypes.SuggestedToggleLabelMany;

   constructor(public payload: { iSuggesteds: Update<ISuggested>[] }) {}
 }


export class SuggestedToggleDeleteAction implements Action {
  readonly type = SuggestedActionTypes.SuggestedToggleDelete;
  constructor(public payload: { iSuggested: Update<ISuggested> }) {}
}

export class SuggestedToggleLabelAction implements Action {
  readonly type =SuggestedActionTypes.SuggestedToggleLabel;
  constructor(public payload: { iSuggested: Update<ISuggested> }) {}
}



export class SuggestionsRequestedAction implements Action {
  readonly type = SuggestedActionTypes.SuggestionsRequested;
}

export class InboxThreadIdsRequestedAction implements Action {
  readonly type = SuggestedActionTypes.InboxThreadIdsRequested;
}

export class InboxThreadIdsRequestFailureAction implements Action {
  readonly type = SuggestedActionTypes.InboxThreadIdsRequestFailure;
  constructor(public payload: any) {}
}

export class AddAllThreadIdsAction implements Action {
  readonly type = SuggestedActionTypes.AddAllThreadIds;
  constructor(public payload: Array<string>) {}
}

export class InboxThreadIdsLoadedAction implements Action {
  readonly type = SuggestedActionTypes.InboxThreadIdsLoaded;
  constructor(public payload: Array<string>) {}
}


export class SuggestedThreadsRequestedAction implements Action {
  readonly type = SuggestedActionTypes.SuggestionsRequested;
}

export class SuggestedThreadsRequestFailureAction implements Action {
  readonly type = SuggestedActionTypes.SuggestedThreadsRequestFailure;
  constructor(public payload: any) {}
}

export class AddAllSuggestionsAction implements Action {
  readonly type = SuggestedActionTypes.AddAllSuggestions;
  constructor(public payload: ISuggested[]) {}
}

/**
export class SuggestedMessagesLoadedAction implements Action {
  readonly type = SuggestedActionTypes.SuggestedMessagesLoaded;
}
**/

export class UpdateSuggestedStateAction implements Action {
  readonly type = SuggestedActionTypes.UpdateSuggestedState;
  constructor(public payload: any){}
}

export class ResetSuggestedStateAction implements Action {
  readonly type = SuggestedActionTypes.ResetSuggestedState;
}


export type SuggestedActions =
  | SuggestionsRequestedAction

  | InboxThreadIdsRequestedAction
  | InboxThreadIdsRequestFailureAction
  | AddAllThreadIdsAction
  | InboxThreadIdsLoadedAction


  | SuggestedThreadsRequestedAction
  | SuggestedThreadsRequestFailureAction
  | AddAllSuggestionsAction

  // | SuggestedMessagesLoadedAction
  | SuggestedToggleDeleteAction
  | SuggestedToggleLabelAction
  | SuggestedToggleDeleteManyAction
  | SuggestedToggleLabelManyAction


  | ResetSuggestedStateAction
  | UpdateSuggestedStateAction;
