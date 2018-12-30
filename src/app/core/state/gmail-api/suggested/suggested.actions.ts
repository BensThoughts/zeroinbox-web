import {Action} from '@ngrx/store';
import { Message } from '@app/core/services/gmail-api/suggested/suggested.service';
import { ISuggested } from '../models/suggested.model';

export enum SuggestedActionTypes {
  CollectInboxThreadIds = '[Labels] Collect Inbox Message Ids',
  CollectPageOfThreads = '[Suggested Effects] Collect Page Of Threads',
  CollectThreadIds = '[Suggested Effects] Collect Thread Ids',
  CollectPageToken = '[Suggested Effects] Collect Page Token',
  AllPagesCollected = '[Suggested Effects] All Pages Collected',
  CollectMessages = '[Suggested Effects] Collect Messages',
  AddSuggestedMessage = '[Suggested Effects] Add Suggested Message',
  BatchTest = '[Suggested Effects] Batch Test'
}

/**
 * [request all gmail labels from store IGmailLabel[]]
 * @param payload: [no payload]
 */

export class AddSuggestedMessage implements Action {
  readonly type = SuggestedActionTypes.AddSuggestedMessage;
  constructor(public payload: ISuggested) {}
}

export class CollectMessages implements Action {
  readonly type = SuggestedActionTypes.CollectMessages;
  constructor(public payload: string) {}
}

export class BatchTest implements Action {
  readonly type = SuggestedActionTypes.BatchTest;
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
}

export type SuggestedActions =
  | BatchTest
  | AddSuggestedMessage
  | CollectMessages
  | CollectInboxThreadIds
  | CollectPageToken
  | CollectThreadIds
  | CollectPageOfThreads
  | AllPagesCollected
