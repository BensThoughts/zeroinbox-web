import {Action} from '@ngrx/store';
import { Message, ThreadPreview } from '@app/core/services/gmail-api/suggested/suggested.service';
import { ISuggested } from '../models/suggested.model';

export enum SuggestedActionTypes {
  CollectInboxThreadIds = '[Labels] Collect Inbox Message Ids',
  CollectPageOfThreads = '[Suggested Effects] Collect Page Of Threads',
  CollectThreadIds = '[Suggested Effects] Collect Thread Ids',
  CollectPageToken = '[Suggested Effects] Collect Page Token',
  AllPagesCollected = '[Suggested Service] All Pages Collected',
  CollectMessages = '[Suggested Effects] Collect Messages',
  AddSuggestedMessage = '[Suggested Effects] Add Suggested Message',
  AddAllSuggestions = '[Suggested Service] Add All Suggestions',
  ServerTest = '[Suggested Effects] Server Test'
}

/**
 * [request all gmail labels from store IGmailLabel[]]
 * @param payload: [no payload]
 */

export class AddAllSuggestions implements Action {
  readonly type = SuggestedActionTypes.AddAllSuggestions;
  constructor(public payload: ISuggested[]) {}
}

export class AddSuggestedMessage implements Action {
  readonly type = SuggestedActionTypes.AddSuggestedMessage;
  constructor(public payload: ISuggested) {}
}

export class CollectMessages implements Action {
  readonly type = SuggestedActionTypes.CollectMessages;
  constructor(public payload: string) {}
}

export class ServerTest implements Action {
  readonly type = SuggestedActionTypes.ServerTest;
}

export class CollectInboxThreadIds implements Action {
  readonly type = SuggestedActionTypes.CollectInboxThreadIds;
}

export class CollectPageToken implements Action {
  readonly type = SuggestedActionTypes.CollectPageToken;

  constructor(public payload: string) {}
}

export class CollectThreadIds implements Action {
  readonly type = SuggestedActionTypes.CollectThreadIds;

  constructor(public payload: string[]) {}
}

export class CollectPageOfThreads implements Action {
  readonly type = SuggestedActionTypes.CollectPageOfThreads;

  constructor(public payload: string) {} // The page token to use
}

export class AllPagesCollected implements Action {
  readonly type = SuggestedActionTypes.AllPagesCollected;
  constructor() {}
}

export type SuggestedActions =
  | ServerTest
  | AddSuggestedMessage
  | CollectMessages
  | CollectInboxThreadIds
  | CollectPageToken
  | CollectThreadIds
  | CollectPageOfThreads
  | AllPagesCollected
  | AddAllSuggestions
